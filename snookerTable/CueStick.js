class CueStick {
  constructor() {
    this.forceVector = { x: 0, y: 0 }; // Force to apply
    this.magnitude = 0; // Magnitude of the force
  }

  applyForce(x, y) {
    // Calculate the vector from the white ball to the click position
    const dx = x - whiteBall.position.x;
    const dy = y - whiteBall.position.y;

    // Calculate the magnitude (distance) of the vector
    this.magnitude = Math.sqrt(dx ** 2 + dy ** 2);

    // Normalize the vector and scale it based on magnitude
    const forceScale = 0.00001; // Adjust this value for the strength of the force
    const force = {
      x: constrain(-dx, -200, 200) * forceScale,
      y: constrain(-dy, -200, 200) * forceScale,
    };

    // Apply the calculated force to the white ball
    Body.applyForce(whiteBall, whiteBall.position, force);
  }

  draw() {
    push();
    stroke(255, 0, 0); // Set line color for visibility

    // Calculate direction vector from mouse to white ball
    const dx = whiteBall.position.x - adjmouseX;
    const dy = whiteBall.position.y - adjmouseY;

    // Calculate magnitude and normalize the vector
    const magnitude = Math.sqrt(dx ** 2 + dy ** 2);
    const normalizedX = dx / magnitude;
    const normalizedY = dy / magnitude;

    // Calculate the extended endpoint
    const extendedX = whiteBall.position.x + normalizedX * 200;
    const extendedY = whiteBall.position.y + normalizedY * 200;

    // Draw the line from the mouse position, through the white ball, and beyond
    line(adjmouseX, adjmouseY, extendedX, extendedY);

    pop();
  }
}
