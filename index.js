// add express app
let express = require('express');
let app = express();
app.use('/', express.static('public'));

// initialize http server to port 3000
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, ()=>{
    console.log("Server listening at port: "+port);
});

// initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

let users = {};

// on connection state new client
io.sockets.on('connection', function(socket){
    console.log("New Client: " + socket.id);

    socket.on('userData', function(data){
        data.id = socket.id;
        
        users[socket.id] = data;

        console.log("Received: 'userData' " + data);
        io.sockets.emit('userData',data);
    });

    socket.on('disconnect', function(){
        console.log("Client disconnected: "+socket.id);
        delete users[socket.id];

        io.sockets.emit('userDisconnected',socket.id);
    });
});

