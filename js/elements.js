class bow {
  constructor(color, damageBow) {
    this.color = color;
    this.damageBow = damageBow;
    this.x = width / 2;
    this.y = height - 30;
    this.width = 60;
    this.height = 60;
    this.angle = 0;
  }

  updateAngle() {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let angle = atan2(dy, dx);

    // Limitar el ángulo entre -175º y -5º (evita disparar hacia abajo)
    const minAngle = radians(-175);
    const maxAngle = radians(-5);
    this.angle = constrain(angle, minAngle, maxAngle);
  }

  drawAimingLine() {
    let lineLength = 300;
    let targetX = this.x + cos(this.angle) * lineLength;
    let targetY = this.y + sin(this.angle) * lineLength;

    for (let i = 0; i <= lineLength; i += 20) {
      let px = this.x + cos(this.angle) * i;
      let py = this.y + sin(this.angle) * i;
      fill(255);
      noStroke();
      ellipse(px, py, 5, 5);
    }

    noFill();
    stroke(255);
    strokeWeight(2);
    ellipse(targetX, targetY, 20, 20);
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.width, 10);
    pop();
    this.drawAimingLine();
  }
}

