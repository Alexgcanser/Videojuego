let arco;
let cellSize = 50;
let cols, rows;
let score = 0;
let level = 1;
let arrows = 5; // Número inicial de flechas
let health = 100;
let enemies = [];
const totalEnemies = 50;
let gameOver = false; // Estado del juego (necesario para el gameover)
let enemiesDefeated = 0; // Contador de enemigos eliminados
let resetButton;
let resetClicked = false;



function setup() { // Crear el area de juego
  const container = document.getElementById("game-area");
  const canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent("game-area");
  arco = new bow(color(255), 10);
  cols = Math.floor(width / cellSize) - 1;
  rows = Math.floor(height / cellSize) - 3;
  spawnEnemies(totalEnemies);


  // Crear el botón de reiniciar pero ocultarlo inicialmente
  resetButton = createButton('Reiniciar');
  resetButton.position(width / 2 - 50, height / 2 + 50);
  resetButton.mousePressed(() => {
    resetClicked = true; // Marcar que se hizo clic en el botón
    resetGame();
  });
  resetButton.hide(); // Ocultarlo hasta que sea necesario
}

function draw() {
  if (gameOver) {
    showGameOverScreen(); // Mostrar pantalla de Game Over
    return;
  }

  background(30);// todas nuestras funciones en el fondo
  drawGrid();
  arco.updateAngle();
  arco.display();
  drawEnemies();
  drawHUD();
  updateAndDisplayArrows();

  if (health <= 0) {
    gameOver = true;
    resetButton.show(); // Mostrar el botón al morir
  }
}

function drawGrid() { // Dibujar la cuadricula
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

function spawnEnemies(numEnemies) { // La funcion de generar enemigos de manera aleatoria
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

function drawEnemies() { // Funcion para "dinujar" a los enemigos
  const offsetX = 20; // Margen izquierdo de la cuadrícula
  const offsetY = 20; // Margen superior de la cuadrícula

  for (let enemy of enemies) {
    const pos = enemy.getPixelPosition(offsetX, offsetY);

    // Determinar el color del enemigo según cual es
    if (enemy instanceof Zombie) fill(34, 139, 34); // Verde oscuro
    else if (enemy instanceof Creeper) fill(144, 238, 144); // Verde claro
    else if (enemy instanceof Skeleton) fill(211, 211, 211); // Gris claro
    else if (enemy instanceof Enderman) fill(138, 43, 226); // Morado

    // Dibujar el cuadrado del enemigo
    rect(pos.x, pos.y, cellSize, cellSize);

    // Dibujar el número de vida en el centro del enemigo
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(enemy.health, pos.x + cellSize / 2, pos.y + cellSize / 2); // Vida en el centro
  }
}


function drawHUD() { // Funcion que dibuja el HUD
  fill(255);
  textSize(18);
  textFont("Arial");
  textStyle(NORMAL);

  textAlign(LEFT, BOTTOM);
  text(`Puntaje: ${score}`, 10, height - 35);
  text(`Nivel: ${level}`, 10, height - 10);

  textAlign(LEFT, CENTER);
  text(`Flechas: ${arrows}`, arco.x + arco.width / 2 + 10, height - 40);

  textAlign(RIGHT, BOTTOM);
  text(`Vida: ${health}%`, width - 10, height - 10); // Actualiza la vida del jugador
}

function mousePressed() {
  if (canShoot) {
    let angle = atan2(mouseY - arco.y, mouseX - arco.x); // Calcula el ángulo de disparo
    startShooting(angle);
  }
}

function showGameOverScreen() { // Funcion de fin de juego
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("You Lose", width / 2, height / 2);

}


function resetForNextLevel() { // Funcion para pasar denivel
  level++; // Incrementar nivel
  arrowsArray = []; // Limpiar todas las flechas activas en el campo
  canShoot = true; // Permitir disparar de nuevo
  
  // Incrementar la vida de los enemigos
  for (let enemy of enemies) {
    enemy.health += 2; // Incrementar la salud de cada enemigo en 2 puntos
  }

  // Generar 50 nuevos enemigos
  spawnEnemies(50);
}

function resetGame() {
  // Reiniciar todas las variables del juego
  gameOver = false;
  score = 0;
  level = 1;
  arrows = 5;
  health = 100;
  enemies = [];
  arrowsArray = [];
  spawnEnemies(totalEnemies);

  // Ocultar el botón de reinicio nuevamente
  resetButton.hide();
}

function mousePressed() { // No disparar cuando ya has hecho click una vez
  if (resetClicked) {
    resetClicked = false;
    return; // No disparar flechas si se hizo clic en el botón
  }

  if (canShoot) {
    let angle = atan2(mouseY - arco.y, mouseX - arco.x); // Calcula el ángulo de disparo
    startShooting(angle);
  }
}

function windowResized() {
  const container = document.getElementById("game-area");
  resizeCanvas(container.offsetWidth, container.offsetHeight); // Ajusta el tamaño al "contenedor"
  cols = Math.floor(width / cellSize) - 1;
  rows = Math.floor(height / cellSize) - 3;
}
