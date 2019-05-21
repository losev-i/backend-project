var KoaServer = require('../../index')
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
