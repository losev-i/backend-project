var KoaServer = require('../../index')
var server = new KoaServer({
  base: 'demo/static',
  view: '/',
  static: ['icon','face']
})

server.get('/', function*(){
  this.body = yield this.render('index')
})

server.listen( 8080 )
