const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const _score = document.getElementById('_score');
const _life = document.getElementById('_life');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ballRadius = 20;
let leftPressed = false;
let rightPressed = false;
let LIFE = 3;
let POINTS = 0;

const ball = new Ball(canvasWidth, canvasHeight, ballRadius, context);
const plate = new Plate(canvasWidth, canvasHeight, context);
const bricks = [];

const interval = setInterval(() => {
    renderScreen();
}, 1);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

for(let i = 0; i < 5; i++){
    for(let j = 0; j < 3; j++){
        let x = ((i+1)*50)+(i*140);
        let y = 20 + 40 * j;
        let brick = new Brick(x, y, context);
        bricks.push(brick);
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function renderScreen(){
    if(bricks.length == 0){
        alert('You won the game!');
        clearInterval(interval);
    }
    _life.innerHTML = `${LIFE}`;
    _score.innerHTML = `${POINTS}`;
    if(LIFE == 0){
        alert('Game Over!');
       // echo 'window.location.href = "endpage.html";';
       window.location.replace("endpage.html");
        clearInterval(interval);
    
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    if((ball.y + ball.r) >= plate.y && (ball.x + ball.r) >= (plate.x) && (ball.x - ball.r) <= (plate.x + plate.w)){
        ball.reverseY();
    } 
    if(ball.drawBall()){
        LIFE -= 1;
    }
    if(rightPressed) {plate.moveRight();}
    if(leftPressed) {plate.moveLeft();}
    plate.drawPlate();
    callBrickFunction();
}

function callBrickFunction(){
    bricks.forEach((b, idx) => {
        b.drawBrick();
        if((ball.y - ball.r) <= (b.y + b.h) && (ball.x + ball.r) >= (b.x) && (ball.x - ball.r) <= (b.x + b.w)){
            if(!b.allow){
                ball.reverseY();
                b.life -= 1;
                POINTS += b.score;
            }
        } 
        if(b.life == 0){
            bricks.splice(idx, 1);
        }
    });
}