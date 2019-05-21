var KoaServer = require('../../index')

var server = new KoaServer({
  base: __dirname,
  view: 'page'
})

server.get('/', function*(){
  this.body = yield this.render('index', {
    name:'kid'
  })
})

server.listen( 8080 )
