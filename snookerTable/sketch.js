var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var engine;
var adjmouseX, adjmouseY;
var setupMode = null;
var setupWhiteBallMode = null;
var currentMessage = "";
var messageColour;
var timeoutID = null;

function setup() {
  createCanvas(800, 800);
  // angleMode(DEGREES);
  rectMode(CENTER);
  engine = Engine.create();
  table = new Table();
  ball = new Ball();
  // ball.setupBalls();
  cueStick = new CueStick();
  engine.world.gravity.y = 0; //removed gravity for a 2d game
  table.setupBorders();
  Matter.Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;

    for (let pair of pairs) {
      const bodyA = pair.bodyA;
      const bodyB = pair.bodyB;

      // Check if the white ball is involved in the collision
      if (bodyA === whiteBall || bodyB === whiteBall) {
        // Identify the other body
        const otherBody = bodyA === whiteBall ? bodyB : bodyA;

        // Check if it's a ball or a border
        if (otherBody.label === "ball") {
          console.log(`White ball hit a ${otherBody.colour} ball!`);
        } else if (otherBody.label === "border") {
          console.log("White ball hit the border!");
        }
      }
    }
  });
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
  if (setupMode == null) {
    text("Welcome to Snooker!", -table.width / 2, -table.length / 2);
    text(
      "Press '1' for standard mode,'2' for random reds,'3' for random anything",
      -table.width / 2,
      -table.length / 2 + 50
    );
  } else {
    fill(0);
    text(`Next to Pot: ${ball.nextToPot}`, -table.width / 2, -table.length / 2);

    push();
    fill(`${messageColour}`);
    textSize(32);
    text(`${currentMessage}`, -table.width / 2, -table.length / 2 + 50);
    pop();
  }

  ball.setupWhiteBall();
  // console.log(setupWhiteBallMode);
  if (setupWhiteBallMode == false) {
    cueStick.draw();
  }
  ball.checkBallInPocket();
  fill(0);
  stroke(255);
  text(`${adjmouseX},${adjmouseY}`, adjmouseX, adjmouseY);
}

function mousePressed() {
  if (setupWhiteBallMode) {
    setupWhiteBallMode = false;
    ball.playWhiteBall();
  }
  if (setupMode != null) {
    cueStick.applyForce(adjmouseX, adjmouseY);
  }
}

function keyPressed() {
  if (key === "1") {
    setupMode = 1;
    ball.setupBalls();
    setupWhiteBallMode = true;
  } else if (key === "2") {
    setupMode = 2;
    ball.setupBalls();
    setupWhiteBallMode = true;
  } else if (key === "3") {
    setupMode = 3;
    ball.setupBalls();
    setupWhiteBallMode = true;
  }
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

function displayMessage(message, colour) {
  // If there is already a timeout running, clear it before starting a new one
  if (timeoutID !== null) {
    clearTimeout(timeoutID);
  }

  // Set the new message and show it
  currentMessage = message;
  messageColour = colour;

  // Use setTimeout to clear the message after 'duration' milliseconds
  timeoutID = setTimeout(() => {
    currentMessage = ""; // Clear the message after the timeout duration
  }, 2000);

  // Display the message
}