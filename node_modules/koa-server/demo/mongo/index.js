var KoaServer = require('../../index')
var server = new KoaServer({
  mongo: {
    defaultDB: 'test'
  }
})

server.get('/', function*(){
  this.body = yield this.db('test').collect('users').find()
})

server.get('/findOne', function*(){
  this.body = yield this.collect('users').findOne()
})

server.get('/findOne-where', function*(){
  var result = yield this.collect('users').findOne({ age: 18 })
  // If response is null, return a 204 status
  this.body = result ? result : 'null'
})

server.get('/find', function*(){
  this.body = yield this.collect('users').find()
})

server.get('/find-where', function*(){
  this.body = yield this.collect('users').find({ age: 18 })
})

server.get('/count', function*(){
  this.body = yield this.collect('users').count()
})

server.get('/limit', function*(){
  this.body = yield this.collect('users').limit(5).find()
})

server.get('/skip', function*(){
  this.body = yield this.collect('users').skip(5).find()
})

server.get('/sort', function*(){
  this.body = yield this.collect('users').sort({ age: 1 }).find()
})

server.get('/insert', function*(){
  var users = this.collect('users')
  var result = yield users.insert({ name: 'kid', age: 18 })
  this.body = result
})

server.get('/update', function*(){
  var users = this.collect('users')
  // true means multi-update
  var result = yield users.update({
    age: 18
  }, {
    $inc: { age: 1 }
  }, true)
  this.body = result
})

server.get('/upsert', function*(){
  var users = this.collect('users')
  // true means multi-upsert
  var result = yield users.upsert({
    age: 12
  }, {
    $inc: { age: 1 }
  }, true)
  this.body = result
})

server.get('/save', function*(){
  var users = this.collect('users')
  var result = yield users.save({
    head: 'wefwrf'
  })
  this.body = result
})

server.get('/remove', function*(){
  var users = this.collect('users')
  // remove({}) can remove all in users
  var result = yield users.remove({ age: 18 })
  this.body = result
})

server.listen( 8080 )
