function handleArrowCollision(arrow) {
    const offsetX = 20; // Margen izquierdo de la cuadrícula
    const offsetY = 20; // Margen superior de la cuadrícula
    const leftBoundary = offsetX;
    const rightBoundary = offsetX + cols * cellSize;
    const topBoundary = offsetY;
    const bottomBoundary = offsetY + rows * cellSize;

    // Rebote en los bordes laterales de la cuadrícula
    if (arrow.x <= leftBoundary || arrow.x >= rightBoundary) {
        arrow.angle = PI - arrow.angle;
        arrow.x = constrain(arrow.x, leftBoundary + 1, rightBoundary - 1);
    }

    // Rebote en el borde superior de la cuadrícula
    if (arrow.y <= topBoundary) {
        arrow.angle = -arrow.angle;
        arrow.y = constrain(arrow.y, topBoundary + 1, bottomBoundary - 1);
    }

    // Colisiones con enemigos
    for (let i = enemies.length - 1; i >= 0; i--) { // Iterar al revés para eliminar enemigos de la lista
        const enemy = enemies[i];
        const pos = enemy.getPixelPosition(offsetX, offsetY);
        const enemyLeft = pos.x;
        const enemyRight = pos.x + cellSize;
        const enemyTop = pos.y;
        const enemyBottom = pos.y + cellSize;

        if (arrow.collidesWith(enemyLeft, enemyTop, cellSize)) {
            // Determinar el borde de colisión dominante
            const distLeft = Math.abs(arrow.x - enemyLeft);
            const distRight = Math.abs(arrow.x - enemyRight);
            const distTop = Math.abs(arrow.y - enemyTop);
            const distBottom = Math.abs(arrow.y - enemyBottom);

            if (distLeft < distRight && distLeft < distTop && distLeft < distBottom) {
                // Colisión con el lado izquierdo
                arrow.angle = PI - arrow.angle;
                arrow.x = enemyLeft - arrow.size;
            } else if (distRight < distLeft && distRight < distTop && distRight < distBottom) {
                // Colisión con el lado derecho
                arrow.angle = PI - arrow.angle;
                arrow.x = enemyRight + arrow.size;
            } else if (distTop < distBottom) {
                // Colisión con el lado superior
                arrow.angle = -arrow.angle;
                arrow.y = enemyTop - arrow.size;
            } else {
                // Colisión con el lado inferior
                arrow.angle = -arrow.angle;
                arrow.y = enemyBottom + arrow.size;
            }

            // Reducir la salud del enemigo
            enemy.health -= 1;
            
            // Eliminar al enemigo si su salud llega a 0
            if (enemy.health <= 0) {
                enemies.splice(i, 1); // Eliminar el enemigo de la lista
            }

            break; // Salir del bucle después de una colisión
        }
    }
}

// Actualiza y dibuja las flechas
function updateAndDisplayArrows() {
    for (let arrow of arrowsArray) {
        if (arrow.active) {
            arrow.move(); // Mueve la flecha
            arrow.display(); // Dibuja la flecha
            handleArrowCollision(arrow); // Gestiona las colisiones de la flecha
        }
    }
}

  