var express = require('express');
var app = express();

// app.use(function(req,res,next){
//   if (req.url.endsWith('.json')) {
//     setTimeout(next, 1000);
//   } else {
//     next();
//   }
// });



app.use(express.static(__dirname + '/public/', {
  setHeaders: function(res, path) {
    res.setHeader('Keep-Alive', 'timeout=10')
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');


  }
}));

var server = app.listen(3000, function () {

  var port = server.address().port;
  console.log('Your server is running at http://localhost:%s', port);

});
