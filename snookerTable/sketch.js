var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var engine;
var adjmouseX, adjmouseY;

function setup() {
  createCanvas(800, 800);
  // angleMode(DEGREES);
  rectMode(CENTER);
  engine = Engine.create();
  table = new Table();
  ball = new Ball();
  ball.setupBalls();
  cueStick = new CueStick();
  engine.world.gravity.y = 0; //removed gravity for a 2d game
  table.setupBorders();

  // cueStick.setupCuestick();
  // cueStick.attachToBall(whiteBall);
}

function draw() {
  background(225);
  noStroke();
  const adjustedMouse = getAdjustedMousePosition();
  adjmouseX = adjustedMouse.adjmouseX;
  adjmouseY = adjustedMouse.adjmouseY;
  translate(width / 2, height / 2);
  Engine.update(engine);
  table.draw();
  ball.draw();
  cueStick.draw();
  fill(0);
  stroke(255);
  text(`${adjmouseX},${adjmouseY}`, adjmouseX, adjmouseY);
}

function mousePressed() {
  cueStick.applyForce(adjmouseX, adjmouseY);
}
// function mouseDragged() {
//   cueStick.updateDrag(mouseX - length / 2, mouseY - width / 2);
// }

// function mouseReleased() {
//   cueStick.release();
// }

function drawShadow(x, y) {
  drawingContext.shadowOffsetX = x;
  drawingContext.shadowOffsetY = y;
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";
}

function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function getAdjustedMousePosition() {
  return {
    adjmouseX: mouseX - width / 2,
    adjmouseY: mouseY - height / 2,
  };
}