var font;
var mappedValue;
// var randomNos;
var amt
function preload() {
  font = loadFont("assets/Calistoga-Regular.ttf");
}

var points;

function setup() {
  createCanvas(900, 400);
  fill(255, 104, 204, 150);
  noStroke();

  points = font.textToPoints("E V I N", 50, 300, 300, {
    sampleFactor: 0.3,
    simplifyThreshold: 0,
  });
amt=2
}

function draw() {
  background(0,10);

  mappedValue = map(mouseX, 0, width, 0, 1000);
  for (let i = 0; i < points.length; i++) {
    let point = points[i];

    // Generate unique noise inputs for each point
    let noiseX = map(
      noise(i * 0.1, frameCount * 0.001),
      0,
      1,
      -mappedValue,
      mappedValue
    );
    let noiseY = map(
      noise(i * 0.2, frameCount * 0.001),
      0,
      1,
      -mappedValue,
      mappedValue
    );

    // Draw circle with smooth noise-based offsets
    circle(point.x + noiseX, point.y + noiseY, 10);
  }

}

