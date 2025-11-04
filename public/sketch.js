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

//images
let tired,neutral,cry,asleep;
let sleep,food,catvid;
let student;

function preload(){
    tired = loadImage('/assets/studentTired.png');
    neutral = loadImage('/assets/studentNeutral.png');
    cry = loadImage('/assets/studentCry.png');
    asleep = loadImage('/assets/studentAsleep.png');

    sleep = loadImage('/assets/sleep.png');
    food = loadImage('/assets/food.png');
    catvid = loadImage('/assets/catvid.png');
}

function setup(){
    let canvasBox = document.getElementById("canvasbox");
    let canvas = createCanvas(600,400);
    canvas.parent(canvasBox);

    clear();

    imageMode(CENTER);

    socket.on('connect', function(data){
        console.log("connected");
    });

    socket.on('usercount', function(count){
        numusers = count;
        usercount.innerHTML = "current users: " + numusers;
    });

    socket.on('gamedata',function(obj){
        health = obj.health;
        hunger = obj.hunger;
        stress = obj.stress;
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
        gameOver();
    } else{
        // background(255);
        textAlign(CENTER);
        dying();
        studentImage();

        let gameData = {health: health, hunger: hunger, stress: stress};
        socket.emit('gamedata', gameData);
    }
    
}

//determine which image of the student to use
function studentImage(){
    if(health>70||hunger>70||stress>70){
        student = neutral;
    }
    //if any stat lower than 70
    if(health<=70||hunger<=70||stress<=70){
        student = asleep;
    }
    //else if any stat lower than 50
    if(health<=50||hunger<=50||stress<=50){
        student = tired;
    }
    //else if any stat lower than 30
    if(health<=30||hunger<=30||stress<=30){
        student = cry;
    }

    image(student,width/2,height-137);
}

function dying(){
    decrease = numusers*0.5;

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
    // Hide the canvas
    document.getElementById("canvasbox").style.display = "none";
    
    // Takes over screen instead of just canvas
    document.body.style.backgroundColor = "#ab82c5";
    document.body.innerHTML = '<div style="color:white; font-size:50px; text-align:center; padding-top:45vh; font-family: \'Press Start 2P\', cursive;">GAME OVER</div>';
}