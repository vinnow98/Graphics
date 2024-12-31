var balls = [];
var whiteBall;

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rows = 5;
    this.radius = table.width / 36 / 2;
    this.colours = [
      { name: "black", position: { x: table.length / 2.5, y: 0 } },
      { name: "pink", position: { x: table.length / 4 - 10, y: 0 } },
      { name: "blue", position: { x: 0, y: 0 } },
      { name: "green", position: { x: -table.length / 4, y: -45 } },
      { name: "brown", position: { x: -table.length / 4, y: 0 } },
      { name: "yellow", position: { x: -table.length / 4, y: 45 } },
    ];
    this.friction = 0.1;
    this.restitution = 1;
    this.constrainedPosition = null;
    this.nextToPot = "red";
  }

  draw() {
    for (let i = 0; i < balls.length; i++) {
      fill(balls[i].colour);
      stroke(0);
      drawVertices(balls[i].vertices);
    }
  }

  setupBalls() {
    balls = [];
    World.clear(engine.world, [balls, whiteBall]);
    let counter = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.rows - counter; j++) {
        if (setupMode == 1) {
          let redBall = Bodies.circle(
            table.length / 4 + j * 8 + i * 8,
            j * -5 + i * 5,
            this.radius,
            { 
                restitution: this.restitution, friction: this.friction,
                label:"ball"}
          );
          redBall.colour = "red";
          balls.push(redBall);
          World.add(engine.world, [redBall]);
        } else if (setupMode == 2 || setupMode == 3) {
          let redBall = Bodies.circle(
            random(
              -table.length / 2 + this.radius * 2,
              table.length / 2 - this.radius * 2
            ),
            random(
              -table.width / 2 + this.radius * 2,
              table.width / 2 - this.radius * 2
            ),
            this.radius,
            {
              restitution: this.restitution,
              friction: this.friction,
              label: "ball",
            }
          );
          redBall.colour = "red";
          balls.push(redBall);
          World.add(engine.world, [redBall]);
        }
      }
      counter += 1;
    }
    for (const colour of this.colours) {
      if (setupMode == 1 || setupMode == 2) {
        let ball = Bodies.circle(
          colour.position.x,
          colour.position.y,
          this.radius,
          {
            restitution: this.restitution,
            friction: this.friction,
            label: "ball",
          }
        );
        ball.colour = colour.name;
        balls.push(ball);
        World.add(engine.world, [ball]);
      } else if (setupMode == 3) {
        let ball = Bodies.circle(
          random(
            -table.length / 2 + this.radius * 2,
            table.length / 2 - this.radius * 2
          ),
          random(
            -table.width / 2 + this.radius * 2,
            table.width / 2 - this.radius * 2
          ),
          this.radius,
          {
            restitution: this.restitution,
            friction: this.friction,
            label: "ball",
          }
        );
        ball.colour = colour.name;
        balls.push(ball);
        World.add(engine.world, [ball]);
      }
    }
  }

  setupWhiteBall() {
    if (setupWhiteBallMode) {
      let mouseXPosition = adjmouseX;
      let mouseYPosition = adjmouseY;

      // Constrain the mouse position within the Dzone
      this.constrainedPosition = this.constrainWhiteBall(
        mouseXPosition,
        mouseYPosition
      );

      // Draw the white ball at the constrained position (temporary position before clicking)
      this.drawBall(
        this.constrainedPosition.x,
        this.constrainedPosition.y,
        "white"
      );
    }
  }
  playWhiteBall() {
    if (setupWhiteBallMode == false) {
      // When setup mode is finished (after click), create the white ball at the final position
      console.log(this.constrainedPosition.x);
      whiteBall = Bodies.circle(
        this.constrainedPosition.x,
        this.constrainedPosition.y,
        this.radius,
        {
          restitution: this.restitution,
          friction: this.friction,
          label: "ball",
        }
      );
      whiteBall.colour = "white";
      balls.push(whiteBall);
      World.add(engine.world, [whiteBall]);
    }
  }

  constrainWhiteBall(x, y) {
    // Dzone boundaries (assuming your arc and line are centered around -this.length/4)
    const dZoneX = -table.length / 4; // X position of the Dzone
    const dZoneY = 0; // Y position of the Dzone (centered on the Y-axis)
    const dZoneRadius = 45; // Radius of the Dzone semicircle

    // Calculate the distance from the center of the Dzone
    const distFromCenter = dist(x, y, dZoneX, dZoneY);

    // If the mouse is inside the left semicircle of the Dzone, let the ball follow the mouse
    if (distFromCenter <= dZoneRadius && x <= dZoneX) {
      return { x, y };
    } else {
      // Otherwise, constrain the white ball to the edge of the left semicircle
      const angle = atan2(y - dZoneY, x - dZoneX);
      const constrainedX = dZoneX + cos(angle) * dZoneRadius;
      const constrainedY = dZoneY + sin(angle) * dZoneRadius;

      // Ensure the ball stays within the left half of the Dzone
      if (constrainedX > dZoneX) {
        return { x: dZoneX, y: constrainedY }; // If it goes outside the left semicircle, snap it back to the edge
      }

      return { x: constrainedX, y: constrainedY };
    }
  }

  drawBall(x, y, color) {
    fill(color);
    ellipse(x, y, this.radius + 5);
  }
  checkBallInPocket() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = 1; j <= 6; j++) {
        const { x, y } = table[`hole${j}`];
        if (dist(balls[i].position.x, balls[i].position.y, x, y) < 20) {
          if (balls[i].colour == "white") {
            setupWhiteBallMode = true;
            displayMessage("Foul! White ball in!", "Red");
          } else if (balls[i].colour == "red") {
            if (this.nextToPot == "red") {
              this.nextToPot = "Coloured";
              displayMessage("Good Job!", "Green");
            } else {
              displayMessage("You need to Pot a Coloured Ball!", "Red");
            }
          } else {
            if (this.nextToPot == "red") {
              displayMessage("You need to Pot a Red Ball!", "Red");
            } else {
              this.nextToPot = "red";
              displayMessage("Good Job!", "Green");
            }
            const originalPosition = this.colours.find(
              (colour) => colour.name === balls[i].colour
            ).position;

            // Reset the ball's position
            Body.setPosition(balls[i], {
              x: originalPosition.x,
              y: originalPosition.y,
            });

            // Optionally reset velocity (if desired)
            Matter.Body.setVelocity(balls[i], { x: 0, y: 0 });

            // Add it back to the world
            balls.push(balls[i]);
            World.add(engine.world, [balls[i]]);
          }
          World.remove(engine.world, [balls[i]]);
          balls.splice(i, 1);
          i -= 1;
          break;
        }
      }
    }
  }
}
