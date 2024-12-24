let balls = [];
let clearbutton
let rectX,rectY,rectW,rectH
////////////////////////////////////////////////////
function setup() {
createCanvas(900, 600);
clearButton = createButton("Clear")
clearButton.position(width/2-30,height/2-10)
clearButton.mousePressed(()=>{
  balls=[]
})
rectX = width/2-100
rectY = height/2-25
rectW = 200
rectH = 50
}
////////////////////////////////////////////////////
function draw() {
  background(0);
  for(let i = 0;i<balls.length;i++){
    var gravity = createVector(0, 0.1);
    var friction = balls[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.01);
    balls[i].applyForce(friction);
    balls[i].applyForce(gravity);
    balls[i].run();
    balls[i].age -= 0.5
  }
  //balls pasing thru this rect should turn red
  fill(255)
  rect(rectX, rectY,rectW,rectH);
}

function mouseDragged(){
  balls.push(new Ball(mouseX,mouseY))
}

//////////////////////////////////////////////////////
class Ball {

  constructor(x,y){
    this.velocity = new createVector(random(-3,3), random(-3,3));
    this.location = new createVector(x, y);
    this.acceleration = new createVector(0, 0);
    this.size = random(0,40);
    this.age = 255
    this.colourchanged = false
  }

  run(){
    this.updateEdges()
    this.draw();
    this.move();
    this.bounce();
  }

  draw(){
    if (
      this.ballR > rectX && // Ball's right edge is beyond the rectangle's left edge
      this.ballL < rectX + rectW && // Ball's left edge is before the rectangle's right edge
      this.ballT < rectY + rectH && // Ball's top edge is above the rectangle's bottom edge
      this.ballB > rectY
    ) {
      this.colourchanged = true;
    }
   
    if (this.colourchanged){
       fill(255, 0, 0, this.age);
    }else{
       fill(255, this.age);
    }
    ellipse(this.location.x, this.location.y, this.size, this.size);
  }

  updateEdges(){
     this.ballL = this.location.x - this.size / 2;
     this.ballR = this.location.x + this.size / 2;
     this.ballT = this.location.y - this.size / 2;
     this.ballB = this.location.y + this.size / 2;
  }

  move(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  bounce(){
    if (this.location.x > width-this.size/2) {
          this.location.x = width-this.size/2;
          this.velocity.x *= -1;
    } else if (this.location.x < this.size/2) {
          this.velocity.x *= -1;
          this.location.x = this.size/2;
    }
    if (this.location.y > height-this.size/2) {
          this.velocity.y *= -1;
          this.location.y = height-this.size/2;
    }
  }

  applyForce(force){
    this.acceleration.add(force);
  }
}
