var http = require('http');
var fs = require('fs');

const data = require("ttn").data;
const application = require("ttn").application;
 
const appID = "XXXX" // the TTN app id
const accessKey = "XXXX" // the TTN access key

// Chargement du fichier index.html affiché au client
var server = http.createServer();

// Chargement de socket.io
var io = require('socket.io').listen(server);

var _socket = null;

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
	_socket = socket;
    console.log('? Un client est connecté !');
});


 
// discover handler and open mqtt connection
data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
	  
	  if(_socket){
		  _socket.emit('message');
	  }
    })
  })
  .catch(function (err) {
    console.error(err)
  })

server.listen(8088);