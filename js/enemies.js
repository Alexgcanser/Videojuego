class Enemies {
  constructor(row, col) {
    this.health = 3; // Todos los enemigos tendrán una salud inicial de 3
    this.row = row;
    this.col = col;
    this.cellSize = 50;
  }

  getPixelPosition(offsetX = 0, offsetY = 0) {
    let x = this.col * this.cellSize + offsetX;
    let y = this.row * this.cellSize + offsetY;
    return { x, y };
  }
}

class Zombie extends Enemies {
  constructor(row, col) {
    super(row, col);
  }
}

class Skeleton extends Enemies {
  constructor(row, col) {
    super(row, col);
  }
}

class Creeper extends Enemies {
  constructor(row, col) {
    super(row, col);
  }
}

class Enderman extends Enemies {
  constructor(row, col) {
    super(row, col);
  }
}

function moveEnemiesDown() { // Funcion para que los enemigos avancen hacia abajo y ademas hagan daño
  for (let enemy of enemies) {
      enemy.row++; // Mover al enemigo una fila hacia abajo
      if (enemy.row >= rows) { // Si el enemigo alcanza la última fila
          health -= 10; // Reducir la vida del jugador
          enemy.row = 0; // Reiniciar al enemigo en la fila superior
          enemy.col = Math.floor(Math.random() * cols); // Nueva columna aleatoria
      }
  }
}