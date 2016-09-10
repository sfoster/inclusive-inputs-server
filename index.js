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

io.on('connection', function(client){
  console.log('a user connected');

  client.on('join', function(data) {
      // console.log(data);
      client.emit('messages', 'Hello from server');
  });

  client.on('keypress', function(msg) {
      console.log('KEYPRESS_EVENT', msg);
      // TODO: sort input into channels?
      client.emit('messages', 'acknowledged keypress');
      io.emit('input', {
        clientid: msg.clientid,
        type: 'keypress',
        value: msg.value,
        timestamp: msg.timestamp
      });
  });

});

console.log('listening on port: ' + config.port);
server.listen(config.port, function() {
    console.log('listening on *:' + config.port);
});
