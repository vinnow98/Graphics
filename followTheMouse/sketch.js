//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var balls = [];
///////////////////////////////////////////////
function setup() {
  createCanvas(900,600);
  background(0);
  for(let i = 0 ; i<100;i++){
    balls.push(new Ball())
  }
}
////////////////////////////////////////////////
function draw() {
 for(ball of balls){
  ball.run()
 }
}
///////////////////////////////////////////////
class Ball {

  constructor(){
     var randomX = width / 2 + random(-100, 100);
     var randomY = height / 2 + random(-100, 100);
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
   
    this.prevLocation = new createVector(randomX,randomY)
    this.location = new createVector(randomX, randomY);
  }

  run(){
    this.draw();
    this.move();
  }

  draw(){
    stroke(255, 10);

    line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    this.prevLocation = this.location.copy()
  }

  move(){
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.3);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
  }
}
