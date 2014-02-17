//process.env.NODE_ENV = 'production';

var http = require('http');
var express = require('express');
var browserify = require('browserify-middleware');

var app = express();

app.use(express.logger('dev'));
app.get('/index.js', browserify('./index.js', { transform: [ 'reactify'] }));
app.use(express.static(__dirname));

http.createServer(app).listen(3000, function () {
  console.log('3000');
});
