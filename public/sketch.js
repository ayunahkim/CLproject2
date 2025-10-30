let socket = io();
let users = {};

let usercount;

//variables for student health bars
let health = 100;
let hunger = 100;
let stress = 100;

let healthprogress = document.getElementById("healthprogress");
let hungerprogress = document.getElementById("hungerprogress");
let stressprogress = document.getElementById("stressprogress");

//default variables decrease by 1
let decrease = 1;

let gameover = false;


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

function dying(){
    //add conditions for number of clients active later
    if(health<=0){
        gameover = true;
    }
}

function helpStudent(stat){
    let temp = stat;
    //buttons on click run this function
    console.log("I ran! " + stat);
}