let arco;
let cellSize = 50;
let cols, rows;
let score = 0;
let level = 1;
let arrows = 5;
let health = 100;
let enemies = [];
const totalEnemies = 50;

function setup() {
  createCanvas(1000, 650);
  arco = new bow(150, 10);
  cols = Math.floor(width / cellSize);
  rows = Math.floor(height / cellSize) - 3;
  spawnEnemies(totalEnemies);
}

function draw() {
  background(30);
  stroke(250);
  strokeWeight(1);
  noFill();
  drawGrid();
  arco.display();
  drawEnemies();
  drawHUD();
}

function drawGrid() {
  for (let i = 1; i <= cols; i++) {
    for (let j = 1; j <= rows; j++) {
      let x = i * cellSize;
      let y = j * cellSize;
      if (x < width && y < height) {
        rect(x, y, cellSize, cellSize);
      }
    }
  }
}

function spawnEnemies(numEnemies) {
  let validPositions = [];

  // Generar todas las posiciones válidas en las primeras 7 filas, excluyendo la primera columna
  for (let row = 0; row < 7; row++) { 
    for (let col = 1; col < cols; col++) { // Iniciar en col = 1 para evitar la primera columna
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
  for (let enemy of enemies) {
    let pos = enemy.getPixelPosition();

    switch (true) {
      case enemy instanceof Zombie:
        fill(34, 139, 34); // Verde oscuro para Zombies
        break;
      case enemy instanceof Creeper:
        fill(144, 238, 144); // Verde claro para Creepers
        break;
      case enemy instanceof Skeleton:
        fill(211, 211, 211); // Gris claro para Esqueletos
        break;
      case enemy instanceof Enderman:
        fill(138, 43, 226); // Morado para Endermans
        break;
      default:
        fill(255, 0, 0); // Color rojo por defecto, en caso de error
    }

    // Dibujar el cuadrado del enemigo
    rect(pos.x, pos.y, cellSize, cellSize);
  }
}

function drawHUD() {
  fill(255);
  textSize(16);
  let xLeft = 10;
  let yBottom = height - 10;
  textAlign(LEFT, BOTTOM);
  text(`Nivel: ${level}`, xLeft, yBottom);
  let arrowX = arco.x + arco.width / 2 + 10;
  let arrowY = height - 40;
  textAlign(LEFT, CENTER);
  text(`Flechas: ${arrows}`, arrowX, arrowY);
  let healthX = width - 10;
  let healthY = 5;
  textAlign(RIGHT, TOP);
  text(`Vida: ${health}%`, healthX, healthY);
  let scoreX = width / 2;
  let scoreY = 5;
  textAlign(CENTER, TOP);
  text(`Puntaje: ${score}`, scoreX, scoreY);
}
