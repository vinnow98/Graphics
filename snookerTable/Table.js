var borderTop, borderBot, borderLeft, borderRight;
var hole1, hole2, hole3, hole4, hole5, hole6;

class Table {
  constructor() {
    this.length = 600;
    this.width = this.length / 2;
    this.borderLength = this.length / 2 - 25;
    this.borderSide = this.width;
    this.borderWidth = 10;

    this.borders = [
      {
        name: "borderTop",
        position: {
          x: 0,
          y: -this.width / 2,
          length: this.length + 10,
          width: this.borderWidth,
        },
      },
      {
        name: "borderBot",
        position: {
          x: 0,
          y: this.width / 2,
          length: this.length + 10,
          width: this.borderWidth,
        },
      },
      {
        name: "borderLeft",
        position: {
          x: -this.length / 2,
          y: 0,
          length: this.borderWidth,
          width: this.borderSide,
        },
      },
      {
        name: "borderRight",
        position: {
          x: this.length / 2,
          y: 0,
          length: this.borderWidth,
          width: this.borderSide,
        },
      },
    ];

    this.hole1 = { x: this.length / 2 - 8, y: -this.width / 2 + 8 };
    this.hole2 = { x: this.length / 2 - 8, y: this.width / 2 - 8 };
    this.hole3 = { x: -this.length / 2 + 8, y: -this.width / 2 + 8 };
    this.hole4 = { x: -this.length / 2 + 8, y: this.width / 2 - 8 };
    this.hole5 = { x: 0, y: -this.width / 2 + 4 };
    this.hole6 = { x: 0, y: this.width / 2 - 4 };
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
    for (const border of this.borders) {
      let body = Bodies.rectangle(
        border.position.x,
        border.position.y,
        border.position.length,
        border.position.width,
        {
          isStatic: true,
          restitution: 1,
          friction: 0,
          label: "border",
        }
      );
      World.add(engine.world, [body]);
    }
    // borderTop = Bodies.rectangle(
    //   0,
    //   -this.width / 2,
    //   this.length + 10,
    //   this.borderWidth,
    //   {
    //     isStatic: true,
    //     restitution: 1,
    //     friction: 0,
    //   }
    // );
    // borderBot = Bodies.rectangle(
    //   0,
    //   this.width / 2,
    //   this.length + 10,
    //   this.borderWidth,
    //   {
    //     isStatic: true,
    //     restitution: 1,
    //     friction: 0,
    //   }
    // );
    // borderLeft = Bodies.rectangle(
    //   -this.length / 2,
    //   0,
    //   this.borderWidth,
    //   this.borderSide,
    //   {
    //     isStatic: true,
    //     restitution: 1,
    //     friction: 0,
    //   }
    // );
    // borderRight = Bodies.rectangle(
    //   this.length / 2,
    //   0,
    //   this.borderWidth,
    //   this.borderSide,
    //   {
    //     isStatic: true,
    //     restitution: 1,
    //     friction: 0,
    //   }
    // );
    // World.add(engine.world, [borderTop, borderBot, borderLeft, borderRight]);
  }
  drawBorders() {
    push();
    fill(90, 0, 0);
    for (const border of this.borders) {
      // Use Matter.js drawing utility to draw vertices if they exist
      const body = Matter.Composite.allBodies(engine.world).find(
        (b) =>
          b.label === "border" &&
          b.position.x === border.position.x &&
          b.position.y === border.position.y
      );

      if (body) {
        drawVertices(body.vertices);
      }
    }
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
    for (let i = 1; i <= 6; i++) {
      const { x, y } = this[`hole${i}`];
      ellipse(x, y, ball.radius * 2 * 1.5);
    }
  }
}
