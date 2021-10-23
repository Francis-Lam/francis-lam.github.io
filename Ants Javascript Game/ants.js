/*
Web Design Midterm by Francis
*/

const canvas = document.getElementById("ants");
const ctx = canvas.getContext("2d");

// create the unit
const box = 32;

// load images

const bkg = new Image();
bkg.src = "img/bkg.png";

const foodImg = new Image();
foodImg.src = "img/cake_32x32.png";

const antImg = new Image();
antImg.src = "img/ant_32x32.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the ant

let ants = [];

ants[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var

let score = 0;

//control the ant

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// check collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(bkg,0,0);
    
    for( let i = 0; i < ants.length ; i++){
        ctx.drawImage(antImg, ants[i].x,ants[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(ants[i].x,ants[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let antsX = ants[0].x;
    let antsY = ants[0].y;
    
    // which direction
    if( d == "LEFT") antsX -= box;
    if( d == "UP") antsY -= box;
    if( d == "RIGHT") antsX += box;
    if( d == "DOWN") antsY += box;
    
    // if the ants eats the food
    if(antsX == food.x && antsY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        ants.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : antsX,
        y : antsY
    }
    
    // game over
    
    if(antsX < box || antsX > 17 * box || antsY < 3*box || antsY > 17*box || collision(newHead,ants)){
        clearInterval(game);
        dead.play();
    }
    
    ants.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);


















