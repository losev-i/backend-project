var KoaServer = require('../../index')

var server = new KoaServer({ base: __dirname, view: '/' })

server.get('/', function*(){
  this.body = yield this.render('index')
})

server.post('/result', function*( next ){
  var checkSize = this.file.size <= 1024 * 1024
  if(checkSize){
    this.file.name = function(name,type){
      return new Date().getTime() + type
    }
    this.file.saveTo('temp/')
    this.body = 'success'
  } else {
    this.body = 'too large size'
  }
  yield next
})

server.listen( 8080 )
