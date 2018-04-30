var http = require('http');

console.log('node.js application starting...');
console.log(process.env);

var svr = http.createServer(function(req, resp) {
  console.log(req.method, req.url);
  resp.setHeader("Content-Type", "application/json");
  resp.end(JSON.stringify({ date: new Date(), msg: 'Hello, World!'}));
});

svr.listen(process.env.PORT || 9000, function() {
  console.log('Node HTTP server is listening');
});