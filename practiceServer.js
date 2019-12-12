console.log ("Hello")
var os = require("os")
console.log (os.hostname())
console.log(os.type())
console.log((os.arch()))

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');


console.log('Server running at http://127.0.0.1:1337/');

var http = require('http');
var fs = require('fs');
var url = require('url');

var ROOT_DIR = "html/";

var port = process.env.port || 1337
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(port);

console.log('Server running at http://127.0.0.1:'+port);
