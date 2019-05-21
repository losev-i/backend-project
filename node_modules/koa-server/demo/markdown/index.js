var KoaServer = require('../../index')
var server = new KoaServer()

server.get('/', function*(){
  var text = yield this.read('README.md')
  this.body = this.markdown( text )
})

server.listen( 8080 )
