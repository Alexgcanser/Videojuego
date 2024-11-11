class Arrow {
  constructor(x, y, angle, speed = 5) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.size = 10;
    this.active = true;
  }

  move() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);

    // Verificar si la flecha ha llegado a la parte inferior del canvas
    if (this.y >= height) {
      this.active = false; // Desactivar la flecha
      arrows++; // Devolver la flecha al carcaj
      checkAllArrowsReturned(); // Verificar si todas las flechas han vuelto
    }
  }

  display() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }

  collidesWith(enemyX, enemyY, size) {
    return (
      this.x + this.size > enemyX &&
      this.x < enemyX + size &&
      this.y + this.size > enemyY &&
      this.y < enemyY + size
    );
  }
}

let arrowsArray = [];
let canShoot = true;
let arrowInterval;

function startShooting(angle) {
  if (!canShoot || arrows <= 0) return;
  canShoot = false;
  let arrowsRemaining = arrows;

  arrowInterval = setInterval(() => {
    if (arrowsRemaining > 0) {
      let arrow = new Arrow(arco.x, arco.y, angle);
      arrowsArray.push(arrow);
      arrowsRemaining--;
      arrows--; // Actualizamos el conteo de flechas en el HUD
    } else {
      clearInterval(arrowInterval);
      // Habilitar el disparo solo cuando todas las flechas regresen
      checkAllArrowsReturned();
    }
  }, 500);
}

// Verificar si todas las flechas han vuelto al carcaj
function checkAllArrowsReturned() {
  if (arrowsArray.every(arrow => !arrow.active)) {
    canShoot = true; // Habilitar el arco nuevamente cuando todas las flechas están de vuelta
  }
}





