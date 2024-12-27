class Table {
  constructor() {
    this.length = 600;
    this.width = this.length / 2;
    this.borderLength = this.length / 2 - 25;
    this.borderSide = this.width - 25;
    this.borderWidth = 10;
  }
  draw() {
    fill(0, 160, 0);
    rect(0, 0, this.length, this.width);
    this.drawBorders();
    this.drawDzone();
    this.drawPockets();
  }
  drawBorders() {
    push();
    fill(90, 0, 0);
    drawShadow(0, 15);
    rect(
      -this.length / 4,
      -this.width / 2,
      this.borderLength,
      this.borderWidth
    );
    rect(this.length / 4, -this.width / 2, this.borderLength, this.borderWidth);
    drawShadow(0, -15);
    rect(-this.length / 4, this.width / 2, this.borderLength, this.borderWidth);
    rect(this.length / 4, this.width / 2, this.borderLength, this.borderWidth);
    drawShadow(15, 0);
    rect(-this.length / 2, 0, this.borderWidth, this.borderSide);
    drawShadow(-15, 0);
    rect(this.length / 2, 0, this.borderWidth, this.borderSide);
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
    fill(0);
    ellipse(this.length / 2 - 8, this.width / 2 - 8, ball.diameter * 1.5);
    ellipse(this.length / 2 - 8, -this.width / 2 + 8, ball.diameter * 1.5);
    ellipse(-this.length / 2 + 8, -this.width / 2 + 8, ball.diameter * 1.5);
    ellipse(-this.length / 2 + 8, this.width / 2 - 8, ball.diameter * 1.5);

    ellipse(0, -this.width / 2 + 4, ball.diameter * 1.5);
    ellipse(0, this.width / 2 - 4, ball.diameter * 1.5);
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rows = 5;
    this.diameter = table.width / 36;
  }
  draw() {
    this.rerack(this.rows);
  }
  rerack(rows) {
    push();
    drawShadow(0, 0);
    let counter = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < rows - counter; j++) {
        this.drawBall(
          table.length / 4 + j * 8 + i * 8,
          j * -5 + i * 5,
          color(200, 0, 0)
        );
      }
      counter += 1;
    }
    this.drawBall(table.length / 2.5, 0, color(0));
    this.drawBall(table.length / 4 - 10, 0, color(255, 192, 203));
    this.drawBall(0, 0, color(0, 0, 255));
    this.drawBall(-table.length / 4, -45, color(0, 255, 0));
    this.drawBall(-table.length / 4, 0, color(165, 42, 42));
    this.drawBall(-table.length / 4, 45, color(255, 255, 0));
    this.drawBall(-table.length / 3.5, 0, color(255));
    pop();
  }
  drawBall(x, y, color) {
    fill(color);
    ellipse(x, y, this.diameter);
  }
}
