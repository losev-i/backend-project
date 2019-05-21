var KoaServer = require('../../index')

var server = new KoaServer({
  base: 'demo/file-io/'
})

server.get('/', function*(){
  var data = {
    user: { id: 1, name: 'kid' },
    act: ['click-a','input-text','download-img']
  }
  // If data'type is object, will use JSON.stringify
  yield this.write('log/userAct.json', data)
  // If extname of file is '.json', will use JSON.parse
  this.body = yield this.read('log/userAct.json')
})

server.listen( 8080 )