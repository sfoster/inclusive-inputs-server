// app.js
var express = require('express');
var path = require('path');
var app = express();
var config = {
  port: process.env.PORT || 4200
};
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// app.use(cors());
app.use(express.static(path.join(__dirname, './public')));

console.log('listening on port: ' + config.port);
server.listen(config.port);
