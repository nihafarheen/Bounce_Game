const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const ballRadius = 20;
let leftPressed = false;
let rightPressed = false;

const ball = new Ball(canvasWidth, canvasHeight, ballRadius, context);
const plate = new Plate(canvasWidth, canvasHeight, context);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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
    context.clearRect(0, 0, canvas.width, canvas.height);
    if((ball.x + ball.r) >= plate.x && (ball.x + ball.r) <= (plate.x + plate.w) && (ball.y + ball.r) <= plate.h){
        ball.reverseY();
    } 
    ball.drawBall();
    if(rightPressed) {plate.moveRight();}
    if(leftPressed) {plate.moveLeft();}
    plate.drawPlate();
    // renderScreen();
    console.log('working...');
    // requestAnimationFrame(renderScreen);
}

// renderScreen();

setInterval(() => {
    renderScreen();
}, 1);
// requestAnimationFrame(renderScreen);