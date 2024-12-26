// Code from a modified Daniel Shiffman example
// https://thecodingtrain.com/

var angle = 0;
var seed;
var r, g, b;

function setup() {
  createCanvas(400, 400);
  seed = random(1000);
}

function draw() {
  background(225);
  angleMode(DEGREES);
  randomSeed(seed);
  angle = 45;

  // Reset base color at the start of every frame
  r = 101;
  g = 67;
  b = 33;

  translate(200, height); // Start from the bottom center
  branch(100, 3,r,g,b); // Initial call with base thickness
}

function branch(len, thickness,r,g,b) {
  strokeWeight(thickness);

  // Set the stroke color for the current branch
  stroke(r, g, b);
  line(0, 0, 0, -len); // Draw the branch line

  translate(0, -len); // Move to the end of the branch

  if (len > 4) {
      r += 20;
      g += 20;
      b += 20;
    push();
    // Update the color for the right branch
    // Draw the right branch
    stroke(r, g, b); // Explicitly set the color here
    rotate(random(angle));
    branch(len * random(0.5, 0.8), thickness * 0.8,r,g,b);
    pop();

    push();
    // Update the color again for the left branc

    // Draw the left branch
    stroke(r, g, b); // Explicitly set the color here
    rotate(random(-angle)+20*noise(frameCount/100));
    branch(len * random(0.5, 0.8), thickness * 0.8,r,g,b);
    pop();
  }else{
    fill(random(150,255),0,0)
    ellipse(0,0,10)
    //randomise colour?
  }
}
//add falling leaves