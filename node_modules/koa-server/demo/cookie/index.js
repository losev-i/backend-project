var KoaServer = require('../../index')
var server = new KoaServer()

server.get('/', function*(){
  var name = this.cookie.get('name')
  if( name ){
    this.body = 'hello ' + name + ' ~ !'
  } else {
    var maxAge = 10 * 60 * 1000  // MilliSeconds, this is 10 minutes
    this.cookie.set('name','kid',maxAge)
    this.body = 'you are first coming'
  }
})

server.listen( 8080 )
