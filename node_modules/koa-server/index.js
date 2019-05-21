var fs = require('fs')
var path = require('path')
var Koa = require('koa')
var Router = require('koa-router')
var static = require('koa-static')
var bodyParser = require('koa-body-parser')
var override = require('koa-override')
var session = require('koa-session')
var mongo = require('koa-mongo')
var views = require('co-views')
var parse = require('co-busboy')
var thunkify = require('thunkify')

var _read  = thunkify(fs.readFile)
var _write = thunkify(fs.writeFile)

module.exports = function KoaServer(userOptions) {
  var app = Koa()
  var router = Router()
  var render = null

  var options = {
    key: 'hello koa-server ~ !',
    base: '',
    view: 'view',
    engine: 'hogan',
    static: [],
    use: [],
    mongo: {
      host: 'localhost',
      port: 27017,
      user: null,
      pass: null,
      min: 1,
      max: 100,
      timeout: 30000,
      defaultDB: 'test',
      log: false
    }
  }
  merge(options,userOptions)

  var base = options.base
  if( base !== '' ){
    base += '/'
  }

  app.keys = [ options.key ]
  app.use( session(app))
  
  options.static.forEach(function(dir){
    app.use(static( base + dir ))
  })
  
  var marked = require('marked')
  
  app.use( bodyParser())
  app.use( override())
  if( userOptions && userOptions.mongo ){
    app.use(function*( next ){
      this.hasMongo = true
      yield next
    })
    app.use( mongo({
      host: options.mongo.host,
      port: options.mongo.port,
      user: options.mongo.user,
      pass: options.mongo.pass,
      max: options.mongo.max,
      min: options.mongo.min,
      timeout: options.mongo.timeout,
      log: options.mongo.log
    }))
  }
  
  options.use.forEach(function( middleware ){
    app.use( middleware )
  })
  
  app.use( router.routes() )

  init()
  function init(){
    render = views( base + options.view, {
      map: { html: options.engine }
    })
  }
  function merge( o1, o2 ){
    for( var i in o2 ){
      if( typeof o2[i] === 'object' )
        merge( o1[i], o2[i] )
      else
        o1[i] = o2[i]
    }
  }
  function isNumberString( value ){
    var reg = /^(\d+)((\.)?(\d+))?$/
    if( typeof value === 'string' ){
      if( reg.test(value) ){
        return true
      }
    }
    return false
  }
  function isBoolString( value ){
    var reg = /^(true)|(false)$/
    if( typeof value === 'string' ){
      if( reg.test(value) ){
        return true
      }
    }
    return false
  }
  function isEmptyString( value ){
    return value === ''
  }
  function parseValue( value ){
    switch(true){
      case isNumberString(value): return +value
      case isBoolString(value):   return value === 'true'
      case isEmptyString(value):  return null
      case value === 'null':        return null
      default: return value
    }
  }
  function parseAllValues( obj ){
    for( var i in obj ){
      if( typeof obj[i] === 'object' ){
        parseAllValues( obj[i] )
      } else {
        obj[i] = parseValue( obj[i] )
      }
    }
  }
  function* add_param( next ){
    this.param = this.params
    parseAllValues(this.param)
    yield next
  }
  function* add_query_data( next ){
    this.data = this.request.query
    parseAllValues(this.data)
    yield next
  }
  function* add_body_data( next ){
    if( this.data ){
      var isEmpty = true
      for( var key in this.data ){
        isEmpty = false
        break
      }
      if( !isEmpty ){
        yield next
      }
    }
    this.data = this.request.body ? this.request.body : {}
    parseAllValues(this.data)
    yield next
  }
  function* add_render( next ){
    this.render = render
    yield next
  }
  function* add_cookie( next ){
    var _this = this
    this.cookie = {
      get: function( key, userOptions ){
        return _this.cookies.get( key, userOptions )
      },
      set: function( key, value, maxAge, userOptions ){
        var options = {
          maxAge: maxAge
        }
        merge(options,userOptions)
        _this.cookies.set( key, value, options )
        return this
      }
    }
    yield next
  }
  function* add_read( next ){
    this.read = function*( filePath, encoding ){
      filePath = path.normalize( base + '/' + filePath )
      encoding = encoding || 'utf-8'
      var data = yield _read( filePath, encoding )
      if( path.extname( filePath ) === '.json' ){
        data = JSON.parse(data)
      }
      return data
    }
    yield next
  }
  function* add_write( next ){
    this.write = function*( filePath, data, encoding ){
      filePath = path.normalize( base + '/' + filePath )
      if( typeof data === 'object' ){
        data = JSON.stringify(data)
      }
      encoding = encoding || 'utf-8'
      return yield _write( filePath, data, encoding )
    }
    yield next
  }
  function* add_markdown( next ){
    this.markdown = marked
    yield next
  }
  function* add_mongo( next ){
    if( !this.hasMongo ){
      yield next
    }
    var _this = this
    // DB Object
    this.db = function( db ){
      
      this.db = db
      this.c = null
      this._limit = 0
      this._skip = 0
      this._sort = { _id: 1 }
      
      function reset(){
        this._limit = 0
        this._skip = 0
        this._sort = { _id: 1 }
      }
      
      this.collect = function( c ){
        this.c = c
        return this
      }
      this.findOne = function*(options){
        return yield this.mongo.db(this.db).collection(this.c).findOne(options)
      }
      this.find = function*(options){
        var result = yield _this.mongo
          .db(this.db)
          .collection(this.c)
          .find(options)
          .limit(this._limit)
          .skip(this._skip)
          .sort(this._sort)
          .toArray()
        reset.call(this)
        return result
      }
      this.insert = function*(data){
        var ret = yield _this.mongo.db(this.db).collection(this.c).insert(data)
        return {
          ok: ret.result.ok === 1,
          n: ret.insertedCount,
          _id: ret.insertedIds[1]
        }
      }
      this.update = function*(options,data,isMult){
        var ret = yield _this.mongo.db(this.db).collection(this.c).update(options,data,{ multi:isMult })
        return {
          ok: ret.result.ok === 1,
          n: ret.result.nModified
        }
      }
      this.upsert = function*(options,data,isMult){
        var ret = yield _this.mongo.db(this.db).collection(this.c).update(options,data,{ upsert:true, multi:isMult })
        var result = {
          ok: ret.result.ok === 1
        }
        if( ret.result.upserted && ret.result.upserted[0] && ret.result.upserted[0]._id ){
          result.n = 1
          result._id = ret.result.upserted[0]._id
        } else {
          result.n = ret.result.nModified
        }
        return result
      }
      this.save = function*(data){
        var ret = yield _this.mongo.db(this.db).collection(this.c).save(data)
        var result = {
          ok: ret.result.ok === 1,
          n: ret.result.n
        }
        if( ret.ops && ret.ops[0] && ret.ops[0]._id ){
          result._id = ret.ops[0]._id
        }
        return result
      }
      this.remove = function*(data){
        var ret = yield _this.mongo.db(this.db).collection(this.c).remove(data)
        return {
          ok: ret.result.ok === 1,
          n: ret.result.n
        }
      }
      this.count = function*(data){
        return _this.mongo.db(this.db).collection(this.c).count()
      }
      this.limit = function(n){
        this._limit = n
        return this
      }
      this.skip = function(n){
        this._skip = n
        return this
      }
      this.sort = function(obj){
        this._sort = obj
        return this
      }
      
      return this
    }
    // Collection Object
    this.collect = function( c ){
      var db = this.db(options.mongo.defaultDB)
      db.c = c
      return db
    }
    yield next
  }
  function* add_file( next ){
    var _this = this
    this.file = {
      size: this.request.header['content-length'],
      saveTo: function( dir ){
        _this.file.saveDir = path.normalize( base + '/' + dir )
      },
      saveDir: null
    }
    yield next
  }
  function* add_upload( next )
  {
    // Check save directory
    if( !this.file.saveDir ){
      return yield next
    }
    
    var parts = parse( this )
    var part
    while( part = yield parts ){
      var saveName = null
      if( typeof this.file.name === 'string' ){
        saveName = this.file.name
      } else if( typeof this.file.name === 'function' ){
        var filename_array = part.filename.split('.')
        filename_array.pop()
        var old_name = filename_array.join('.')
        var old_type = path.extname( part.filename )
        saveName = this.file.name( old_name, old_type )
      } else {
        saveName = part.filename
      }
      var savePath = path.normalize( this.file.saveDir + '/' + saveName )
      var stream = fs.createWriteStream( savePath )
      part.pipe(stream)
    }
  }

  this.use = function( middleware ){
    app.use( middleware )
  }
  this.get = function( path ){
    var args = arguments
    args = [].slice.call( args, 1 )
    args.unshift( path, add_param, add_query_data, add_render, add_cookie, add_read, add_write, add_markdown, add_mongo )
    router.get.apply( router, args )
  }
  this.post = function( path ){
    var args = arguments
    args = [].slice.call( args, 1 )
    args.unshift( path, add_param, add_body_data, add_render, add_cookie, add_read, add_write, add_markdown, add_mongo, add_file )
    args.push( add_upload )
    router.post.apply( router, args )
  }
  this.put = function( path ){
    var args = arguments
    args = [].slice.call( args, 1 )
    args.unshift( path, add_param, add_body_data, add_render, add_cookie, add_read, add_write, add_markdown, add_mongo )
    router.put.apply( router, args )
  }
  this.delete = function( path ){
    var args = arguments
    args = [].slice.call( args, 1 )
    args.unshift( path, add_param, add_body_data, add_render, add_cookie, add_read, add_write, add_markdown, add_mongo )
    router.delete.apply( router, args )
  }
  this.all = function( path ){
    var args = arguments
    args = [].slice.call( args, 1 )
    args.unshift( path, add_param, add_query_data, add_body_data, add_render, add_cookie, add_read, add_write, add_markdown, add_mongo )
    router.all.apply( router, args )
  }

  this.listen = function( port ){
    app.listen( port )
  }

}
