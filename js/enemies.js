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

// Las subclases ya no necesitan definir "life", "damage" o "move" por separado, 
// ya que todos los enemigos ahora comparten la misma salud
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
