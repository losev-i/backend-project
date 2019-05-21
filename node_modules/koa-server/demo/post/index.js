var KoaServer = require('../../index')
var server = new KoaServer({ view: __dirname })

server.get('/', function*(){
  this.body = yield this.render('index')
})

server.post('/result', function*(){
  this.body = this.data
})

// The others are same as server.get

server.listen( 8080 )
