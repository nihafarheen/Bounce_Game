class Ball {
    constructor(cw, ch, r, ctx){
        this.speed = 1.5;
        this.x = cw/2;
        this.y = ch - (r);
        this.cw = cw;
        this.ch = ch;
        this.r = r;
        this.dx = this.speed;
        this.dy = -this.speed;
        this.ctx = ctx;
    }

    nextPosition(){
        this.x += this.dx;
        this.y += this.dy;
    }

    reverseX(){
        this.dx *= -1;
    }

    reverseY(){
        this.dy *= -1;
    }

    detectCollision() {
        let value = false;
        if(this.x + this.dx > this.cw - this.r || this.x + this.dx < this.r) {
            this.reverseX();
        }
        if(this.y + this.dy < this.r) {
            this.reverseY();
        }
        if(this.y + this.dy > this.ch - this.r){
            value = true;
            this.reverseY();
        }
        this.nextPosition();
        return value;
    }

    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
        return this.detectCollision();
    }
}


class Plate {
    constructor(cw, ch, ctx){
        this.cw = cw;
        this.ch = ch;
        this.ctx = ctx;
        this.h = 20;
        this.w = 150;
        this.x = 0;
        this.y = ch - this.h;
    }

    moveRight(){
        if(this.x + this.w + 1 <= this.cw){this.x += 5}
    }

    moveLeft(){
        if(this.x - 1 >= 0){this.x -= 5}
    }

    drawPlate(){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
        // console.log(1);
    }
}

class Brick{
    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.allow = false;
        this.life = Math.ceil(Math.random() * 3);
        this.color = this.life == 3 ? '#F72585' : this.life == 2 ? '#3A0CA3' : '#4CC9F0';
        this.w = 140;
        this.h = 20;
        this.ctx = ctx;
        this.score = this.life;
    }

    drawBrick(){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}