let arco;
let cellSize = 50;
let cols, rows;
let score = 0;
let level = 1;
let arrows = 5; // Número máximo de flechas
let health = 100;
let enemies = [];
const totalEnemies = 50;

function setup() {
  createCanvas(1000, 650);
  arco = new bow(color(255), 10);
  cols = Math.floor(width / cellSize) - 1;
  rows = Math.floor(height / cellSize) - 3;
  spawnEnemies(totalEnemies);
}

function draw() {
  background(30);
  drawGrid();
  arco.updateAngle();  // Actualiza el ángulo del arco aquí
  arco.display();
  drawEnemies();
  drawHUD();
  updateAndDisplayArrows();
}

function drawGrid() {
  let offsetX = 20;
  let offsetY = 20;
  stroke(250);
  strokeWeight(1);
  noFill();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellSize + offsetX;
      let y = j * cellSize + offsetY;
      if (x < width - offsetX && y < height - offsetY) {
        rect(x, y, cellSize, cellSize);
      }
    }
  }
}

function spawnEnemies(numEnemies) {
  let validPositions = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 1; col < cols; col++) {
      validPositions.push({ row, col });
    }
  }

  for (let i = 0; i < numEnemies; i++) {
    if (validPositions.length === 0) break;
    let randomIndex = Math.floor(Math.random() * validPositions.length);
    let position = validPositions.splice(randomIndex, 1)[0];
    let enemy;
    let type = Math.floor(Math.random() * 4);

    switch (type) {
      case 0:
        enemy = new Zombie(position.row, position.col);
        break;
      case 1:
        enemy = new Skeleton(position.row, position.col);
        break;
      case 2:
        enemy = new Creeper(position.row, position.col);
        break;
      case 3:
        enemy = new Enderman(position.row, position.col);
        break;
    }

    enemies.push(enemy);
  }
}

function drawEnemies() {
  const offsetX = 20; // Margen izquierdo de la cuadrícula
  const offsetY = 20; // Margen superior de la cuadrícula

  for (let enemy of enemies) {
      const pos = enemy.getPixelPosition(offsetX, offsetY);

      // Determinar el color del enemigo según su tipo (puedes ajustar estos colores)
      if (enemy instanceof Zombie) fill(34, 139, 34); // Verde oscuro
      else if (enemy instanceof Creeper) fill(144, 238, 144); // Verde claro
      else if (enemy instanceof Skeleton) fill(211, 211, 211); // Gris claro
      else if (enemy instanceof Enderman) fill(138, 43, 226); // Morado

      // Dibujar el cuadrado del enemigo
      rect(pos.x, pos.y, cellSize, cellSize);

      // Dibujar el número de vida en el centro del enemigo
      fill(255); // Color blanco para el texto de vida
      textSize(16);
      textAlign(CENTER, CENTER);
      text(enemy.health, pos.x + cellSize / 2, pos.y + cellSize / 2); // Vida en el centro
  }
}


function drawHUD() {
  fill(255);
  textSize(18);
  textFont("Arial");
  textStyle(NORMAL);

  textAlign(LEFT, BOTTOM);
  text(`Puntaje: ${score}`, 10, height - 35);
  text(`Nivel: ${level}`, 10, height - 10);

  textAlign(LEFT, CENTER);
  text(`Flechas: ${arrows}`, arco.x + arco.width / 2 + 10, height - 40); // Mostramos el número de flechas restantes

  textAlign(RIGHT, BOTTOM);
  text(`Vida: ${health}%`, width - 10, height - 10);
}

function mousePressed() {
  if (canShoot) {
    let angle = atan2(mouseY - arco.y, mouseX - arco.x); // Calcula el ángulo de disparo
    startShooting(angle);
  }
}


