class Enemies {
  constructor(life, damage, move, row, col) {
    this.life = life;
    this.damage = damage;
    this.move = move;
    this.row = row;
    this.col = col;
    this.cellSize = 50;
  }

  getPixelPosition() {
    let x = this.col * this.cellSize;
    let y = this.row * this.cellSize + this.cellSize;
    return { x, y };
  }
}

class Zombie extends Enemies {
  constructor(row, col) {
    super(100, 10, "lento", row, col);
  }
}

class Skeleton extends Enemies {
  constructor(row, col) {
    super(80, 15, "medio", row, col);
  }
}

class Creeper extends Enemies {
  constructor(row, col) {
    super(60, 20, "explosivo", row, col);
  }
}

class Enderman extends Enemies {
  constructor(row, col) {
    super(120, 25, "teletransportación", row, col);
  }
}
