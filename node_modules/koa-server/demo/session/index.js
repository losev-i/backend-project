var KoaServer = require('../../index')
var server = new KoaServer({
  key: 'hello kid ~ !'
})

server.get('/', function*(){
  if( this.session.name === 'kid' ){
    this.body = 'already has session'
  } else {
    this.session.name = 'kid'
    this.session.maxAge = 10 * 60 * 1000  // MilliSeconds, this is 10 minutes
    this.body = 'set success'
  }
})

server.get('/clear', function*(){
  this.session = null
  this.body = 'clear success'
})

server.listen( 8080 )
