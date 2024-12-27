var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var engine;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  table = new Table();
  ball = new Ball();
  engine = Engine.create();
}

function draw() {
  background(225);
  noStroke();
  translate(width / 2, height / 2);
  table.draw();
  ball.draw();
  fill(0);
  stroke(255);
  text(
    `${mouseX - width / 2},${mouseY - height / 2}`,
    mouseX - width / 2,
    mouseY - height / 2
  );
}

function drawShadow(x, y) {
  drawingContext.shadowOffsetX = x;
  drawingContext.shadowOffsetY = y;
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";
}
