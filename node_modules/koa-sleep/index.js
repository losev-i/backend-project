module.exports = function(timeout){

  // Default 100ms
  var timeout = timeout || 100

  // Return koa middleware
  return function *(next) {

    // Wait for timeout to be done
    yield (function() {
      return function (done) {
        setTimeout(done, timeout)
      }
    })()

    // Move onto next middleware
    yield next

  }

}
