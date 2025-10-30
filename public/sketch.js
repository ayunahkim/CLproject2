let socket = io();
let users = {};

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(255);

    socket.on('connect', function(){
        console.log("connected");
    });

    socket.on('userData', function(userId){
        users[data.id] = data;
    });

    socket.on('userDisconnected', function(userId){
        delete users[userId];
    });
}

function draw(){
    background(255);
    textAlign(CENTER);
    text("Placeholder :P",width/2,height/2);
}