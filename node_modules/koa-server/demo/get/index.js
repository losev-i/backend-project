var KoaServer = require('../../index')
var server = new KoaServer()

// For example:
// url = http://localhost:8080?name=kid&age=18
// this.data = { name:'kid', age:18 }
server.get('/', function*(){
  this.body = this.data
})

// For example:
// url = http://localhost:8080/books/HarryPotter/3
// this.param = { name:'HarryPotter', page:3 }
server.get('/books/:name/:page', function*(){
  this.body = this.param
})

// You can use some middlewares
// If url is http://localhost:8080/blog?topic=xxx
server.get('/blog', check, function*( next ){
  this.body = this.data
  yield next
}, log )

function* check( next ){
  if( this.data.topic ){
    yield next
  }
}
function* log(){
  console.log('...')
}

server.listen( 8080 )