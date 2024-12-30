var balls = [];
var whiteBall;

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rows = 5;
    this.radius = table.width / 36 / 2;
  }

  draw() {
    for (let i = 0; i < balls.length; i++) {
      fill(balls[i].colour);
      stroke(0);
      drawVertices(balls[i].vertices);
    }
  }

  setupBalls() {
    let counter = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.rows - counter; j++) {
        let redBall = Bodies.circle(
          table.length / 4 + j * 8 + i * 8,
          j * -5 + i * 5,
          this.radius,
          { restitution: 0.9, friction: 0.01 }
        );
        redBall.colour = "red";
        balls.push(redBall);
        World.add(engine.world, [redBall]);
      }
      counter += 1;
    }
    let blackBall = Bodies.circle(table.length / 2.5, 0, this.radius, {
      restitution: 0.9,
      friction: 0.01,
    });
    blackBall.colour = "black";
    balls.push(blackBall);

    let pinkBall = Bodies.circle(table.length / 4 - 10, 0, this.radius, {
      restitution: 0.9,
      friction: 0.01,
    });
    pinkBall.colour = "pink";
    balls.push(pinkBall);

    let blueBall = Bodies.circle(0, 0, this.radius, {
      restitution: 0.9,
      friction: 0.01,
    });
    blueBall.colour = "blue";
    balls.push(blueBall);
    let greenBall = Bodies.circle(-table.length / 4, -45, this.radius, {
      restitution: 0.9,
      friction: 0.01,
    });
    greenBall.colour = "green";
    balls.push(greenBall);
    let brownBall = Bodies.circle(-table.length / 4, 0, this.radius, {
      restitution: 0.9,
      friction: 0.01,
    });
    brownBall.colour = "brown";
    balls.push(brownBall);
    let yellowBall = Bodies.circle(-table.length / 4, 45, this.radius, {
      restitution: 0.9,
      friction: 0.01,
    });
    yellowBall.colour = "yellow";
    balls.push(yellowBall);
    whiteBall = Bodies.circle(-table.length / 3.5, 0, this.radius, {
      restitution: 0.9,
      friction: 0.01,
    });
    whiteBall.colour = "white";
    balls.push(whiteBall);
    World.add(engine.world, [
      blackBall,
      pinkBall,
      blueBall,
      greenBall,
      brownBall,
      yellowBall,
      whiteBall,
    ]);
  }
  drawBall(x, y, color) {
    fill(color);
    ellipse(x, y, this.diameter);
  }
}
