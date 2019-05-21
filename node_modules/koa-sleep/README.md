# Koa Sleep Middleware

This koa middleware will "sleep" or delay moving forward for the defined timeout.

## Usage

Require the package and add it to your middleware pipeline. Takes an argument in the form of a integer representing milliseconds which defaults to 100 if none is provided.

```shell
npm install koa-sleep --save
```

```javascript
var koa = require('koa')
var sleep = require('koa-sleep')

var app = koa()
 
// Sleep for 500ms
app.use(sleep(500))

app.use(function *(next){
  this.body = 'Hello World'  
})

app.listen(1337)
```