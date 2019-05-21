# koa-server
A HTTP Server for NodeJS and Koa

# Install
```
npm install koa-server --save
```

# Usage
Create a http server
```js
var KoaServer = require('koa-server')
var server = new KoaServer()

server.get('/', function*(){
  this.body = 'hello world'
})

server.listen(8080)
```

You can run multiple servers
```js
var server1 = new KoaServer()
var server2 = new KoaServer()

server1.get('/', function*(){
  this.body = 'first server'
})
server2.get('/', function*(){
  this.body = 'second server'
})

server1.listen( 8080 )
server2.listen( 8081 )
```

Use some middlewares
```js
server.get('/blog', check, function*(next){
  this.body = 'hello world'
  yield next
}, log )

function* check(next){
  if(this.data.topic){
    yield next
  }
}
function* log(next){
  console.log('...')
  yield next
}
```

Or, you can use some middlewares for all routers
```js
var KoaServer = require('koa-server')
var sleep = require('koa-sleep')

var server = new KoaServer({
  use: [ log, abc, sleep(3000) ]
})

function* log( next ){
  console.log('...')
  yield next
}
function* abc( next ){
  this.abc = 'abc'
  yield next
}

server.get('/', function*(){
  this.body = this.abc
})
```

Support the routers: all, get, post, put, delete

The this.param is the value of url's path

The this.data is the data from request ( GET's query, others' body )

```js
function* response(){
  // The param and data will convert some value'type automatically
  // For example:
  // '18'    -> 18
  // '4.5'   -> 4.5
  // 'true'  -> true
  // 'false' -> false
  // 'null'  -> null
  // ''      -> null
  this.body = {
    param: this.param,
    data: this.data
  }
}

server.all('/books/:name/:page', response)
server.get('/books/:name/:page', response)
server.post('/books/:name/:page', response)
server.put('/books/:name/:page', response)
server.delete('/books/:name/:page', response)
```

To render a page ( template's extname should be the .html )
```js
var server = new KoaServer({
  // The directory to store html files
  // default: 'view'
  view: '/pages',
  // The template engine, need to install package
  // default: 'hogan'
  engine: 'mustache'
})

server.get('/', function*(){
  this.body = yield this.render('index',{
    name:'kid',
    age:18
  })
})
```

User base path and static resources
```js
var server = new Server({
  base: 'child-site',
  static: ['css','js','image']
})

// Real path: child-site/view/index.html
this.body = yield this.render('index')
```
```html
<!-- Real path: child-site/css/index.css -->
<link rel="stylesheet" href="index.css">

<!-- Real path: child-site/js/index.js -->
<script src="index.js"></script>

<!-- Real path: child-site/image/logo.png -->
<img src="logo.png">
```

Support file upload
```html
<form method="post" action="result" enctype="multipart/form-data">
  <input type="file" name="file" />
  <input type="submit" />
</form>
```
```js
// Must ensure the save directory ( the 'tmp' in example ) has existed
// Must yield to next
server.post('/result', function*( next ){
  this.file.saveTo('temp/')
  this.body = 'success'
  yield next
})
```

You can check file size or rename file
```js
server.post('/result', function*( next ){
  var checkSize = this.file.size <= 1024 * 1024
  if(checkSize){
    // For example, filename is 'abc.jpg'
    // The name is 'abc' and type is '.jpg'
    this.file.name = function(name,type){
      return new Date().getTime() + type
    }
    
    // Or use: this.file.name = 'xxx.xx'

    this.file.saveTo('temp/')
    this.body = 'success'
  } else {
    this.body = 'too large size'
  }
  yield next
})
```

To handle cookie
```js
// Get
server.get('/get',function*(){
  var name = this.cookie.get('name')
  this.body = 'ok'
})
// Set
server.post('/set',function*(){
  this.cookie.set('name','kid')
  this.body = 'ok'
})
```

You can set more options
```js
server.get('/', function*(){
  var maxAge = 10 * 60 * 1000  // MilliSeconds
  this.cookie.set('name', 'kid', maxAge, {
    domain: '.google.com',
    path:   '/user'
  })
  this.body = 'ok'
})
```

To handle session
```js
// Get and set session
server.get('/', function*(){
  if( this.session.name === 'kid' ){
    this.body = 'hello kid'
  } else {
    this.session.name = 'kid'
    this.session.maxAge = 10 * 60 * 1000  // MilliSeconds
    this.body = 'login...'
  }
})

// Clear session
server.get('/clear', function*(){
  this.session = null
  this.body = 'clear success'
})
```

A syntactic sugar for file's IO
```js
server.get('/', function*(){
  var data = {
    user: { id: 1, name: 'kid' },
    act: ['click-a','input-text','download-img']
  }
  // If data'type is object, will use JSON.stringify
  yield this.write('log/userAct.json', data)
  // If extname of file is '.json', will use JSON.parse
  this.body = yield this.read('log/userAct.json')
})
```

Build-in the markdown function ( GitHub Flavored )
```js
server.get('/', function*(){
  var text = yield this.read('README.md')
  this.body = this.markdown( text )
})
```

To operate MongoDB
```js
var server = new KoaServer({
  mongo: {
    defaultDB: 'test'
  }
})

server.get('/', function*(){
  this.body = yield this.db('test').collect('users').find()
  // Or use: yield this.collect('users').find(), will use defaultDB
})
```

You can set more options
```js
var server = new KoaServer({
  // These values in the example is default
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
})
```

Here are some examples, please see more in 'demo/mongo/index.js'
```js
server.get('/findOne', function*(){
  var result = yield this.collect('users').findOne({ age: 18 })
  // If response is null, return a 204 status
  this.body = result ? result : 'null'
})


server.get('/find', function*(){
  this.body = yield this.collect('users').skip(3).limit(5).sort({ age: 1 }).find()
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


server.get('/remove', function*(){
  var users = this.collect('users')
  // remove({}) can remove all in users
  var result = yield users.remove({ age: 18 })
  this.body = result
})
```

Of course, included the functions of koa-app
```js
server.get('/login',function*(){
  this.redirect('back')
})
```