let socket = io();
let users = {};

let usercount = document.getElementById("userCounter");
let numusers;

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
    let canvasBox = document.getElementById("canvasbox");
    let canvas = createCanvas(600,400);
    canvas.parent(canvasBox);

    background(0);

    socket.on('connect', function(data){
        console.log("connected");
    });

    socket.on('usercount', function(count){
        numusers = count;
        usercount.innerHTML = "current users: " + numusers;
    });

    socket.on('userData', function(userId){
        users[data.id] = data;
    });

    socket.on('userDisconnected', function(userId){
        delete users[userId];
        usercount.innerHTML = "current users: " + numusers;
    });

    frameRate(5);
}

function draw(){
    if(gameover){
        background(0);
    } else{
        // background(255);
        textAlign(CENTER);
        dying();
    }
    
}

function dying(){
    //add conditions for number of clients active later
    if(health<=0 || hunger<=0 || stress<=0){
        gameover = true;

    } else{
        health -= decrease;
        healthprogress.style.width = health + "%";
        
        hunger -= decrease;
        hungerprogress.style.width = hunger + "%";

        stress -= decrease;
        stressprogress.style.width = stress + "%";
    }
}

function helpStudent(stat){
    if(stat == "health"){
        health+=2;
        if(health >=100){
            health = 100;
        }
    } if(stat == "hunger"){
        hunger+=2;
        if(hunger >= 100){
            hunger = 100;
        }
    } if(stat == "stress"){
        stress+=2;
        if(stress >= 100){
            stress = 100;
        }
    }
}

function gameOver(){
    background(0);
    fill(255);
    text("GAME OVER",width/2,height/2);
}