var KoaServer = require('../../index')
var sleep = require('koa-sleep')

var server = new KoaServer({
  views: 'demo/render/view',
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

server.listen( 8080 )