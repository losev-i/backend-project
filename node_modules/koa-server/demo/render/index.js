var KoaServer = require('../../index')

var server = new KoaServer({
  view: __dirname + '/views', // default: 'view'
  engine: 'mustache'          // default: 'hogan'
})

server.get('/', function*(){
  this.body = yield this.render('index', {
    name:'kid'
  })
})

server.listen( 8080 )
