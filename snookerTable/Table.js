var borderTop, borderBot, borderLeft, borderRight;
var hole1, hole2, hole3, hole4, hole5, hole6;

class Table {
  constructor() {
    this.length = 600;
    this.width = this.length / 2;
    this.borderLength = this.length / 2 - 25;
    this.borderSide = this.width;
    this.borderWidth = 10;
    this.hole1 = { x: this.length / 2 - 8, y: -this.width / 2 + 8 };
  }
  draw() {
    fill(0, 160, 0);
    rect(0, 0, this.length, this.width);
    this.drawBorders();
    this.drawDzone();
    this.drawPockets();
    this.drawHoles();
  }
  setupBorders() {
    borderTop = Bodies.rectangle(
      0,
      -this.width / 2,
      this.length + 10,
      this.borderWidth,
      {
        isStatic: true,
        restitution: 1,
      }
    );
    borderBot = Bodies.rectangle(
      0,
      this.width / 2,
      this.length + 10,
      this.borderWidth,
      {
        isStatic: true,
        restitution: 1,
      }
    );
    borderLeft = Bodies.rectangle(
      -this.length / 2,
      0,
      this.borderWidth,
      this.borderSide,
      {
        isStatic: true,
        restitution: 1,
      }
    );
    borderRight = Bodies.rectangle(
      this.length / 2,
      0,
      this.borderWidth,
      this.borderSide,
      {
        isStatic: true,
        restitution: 1,
      }
    );
    World.add(engine.world, [borderTop, borderBot, borderLeft, borderRight]);
  }
  drawBorders() {
    push();
    fill(90, 0, 0);
    drawShadow(0, 15);
    drawVertices(borderTop.vertices);
    drawShadow(0, -15);
    drawVertices(borderBot.vertices);
    drawShadow(15, 0);
    drawVertices(borderLeft.vertices);
    drawShadow(-15, 0);
    drawVertices(borderRight.vertices);
    pop();
  }
  drawDzone() {
    push();
    stroke(255);
    strokeWeight(2);
    line(
      -this.length / 4,
      -this.width / 2 + 20,
      -this.length / 4,
      this.width / 2 - 20
    );

    noFill();
    arc(
      -this.length / 4, // X position
      0, // Y position
      90, // Width of the arc
      90, // Height of the arc
      HALF_PI, // Starting angle
      PI + HALF_PI // Ending angle
    );

    pop();
  }

  drawPockets() {
    fill(255, 255, 0);
    rect(0, -this.width / 2, 25, this.borderWidth);
    rect(0, this.width / 2, 25, this.borderWidth);
    rect(this.length / 2 - 3, this.width / 2 - 4, 18, 19, 3);
    rect(this.length / 2 - 3, -this.width / 2 + 3, 18, 19, 3);
    rect(-this.length / 2 + 4, this.width / 2 - 4, 18, 19, 3);
    rect(-this.length / 2 + 4, -this.width / 2 + 4, 18, 19, 3);
  }
  drawHoles() {
    fill(0);
    ellipse(this.length / 2 - 8, this.width / 2 - 8, ball.radius * 2 * 1.5);

    ellipse(this.length / 2 - 8, -this.width / 2 + 8, ball.radius * 2 * 1.5);
    ellipse(-this.length / 2 + 8, -this.width / 2 + 8, ball.radius * 2 * 1.5);
    ellipse(-this.length / 2 + 8, this.width / 2 - 8, ball.radius * 2 * 1.5);
    ellipse(0, -this.width / 2 + 4, ball.radius * 2 * 1.5);
    ellipse(0, this.width / 2 - 4, ball.radius * 2 * 1.5);
  }
}
