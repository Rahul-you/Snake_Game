const board = document.getElementById("gameBoard");
const boardSize = 340;
const blockSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = generateFood();
let direction = { x: 0, y: 0 };
let gameLoop;
let speed = 300;

function drawSnake() {
  board.innerHTML = "";
  snake.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.left = `${segment.x}px`;
    snakeElement.style.top = `${segment.y}px`;
    snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });
}

function drawFood() {
  const foodElement = document.createElement("div");
  foodElement.style.left = `${food.x}px`;
  foodElement.style.top = `${food.y}px`;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

function moveSnake() {
  const head = {
    x: snake[0].x + direction.x * blockSize,
    y: snake[0].y + direction.y * blockSize,
  };

  // Check if the snake hits the walls
  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    gameOver();
    return; // Exit moveSnake function
  }

  snake.unshift(head); // Add new head to the snake

  // Check if snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    food = generateFood(); // Generate new food position
  } else {
    snake.pop(); // Remove the last segment of the snake
  }

  // Check for collision with itself after updating snake array
  if (checkCollision(head)) {
    gameOver();
    return; // Exit moveSnake function
  }
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * (boardSize / blockSize)) * blockSize,
    y: Math.floor(Math.random() * (boardSize / blockSize)) * blockSize,
  };
}

function checkCollision(head) {
  // Check for collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function changeDirection(event) {
  switch (event.keyCode) {
    case 37: // left arrow
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 38: // up arrow
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 39: // right arrow
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
    case 40: // down arrow
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
  }
}

document.addEventListener("keydown", changeDirection);

function gameOver() {
  clearInterval(gameLoop);

  const gameOverMessage = document.createElement("div");
  gameOverMessage.textContent = "Game Over! 😔😔";
  gameOverMessage.style.fontSize = "36px";
  gameOverMessage.style.color = "red";
  gameOverMessage.style.position = "absolute";
  gameOverMessage.style.top = "50%";
  gameOverMessage.style.left = "50%";
  gameOverMessage.style.transform = "translate(-50%, -50%)";
  gameOverMessage.classList.add("gameOverMessage"); // Add this line
  document.body.appendChild(gameOverMessage);

  const restartButton = document.getElementById("restartButton");
  restartButton.style.display = "block";
}

function restartGame() {
  snake = [{ x: 200, y: 200 }];
  food = generateFood();
  direction = { x: 0, y: 0 };
  gameLoop = setInterval(game, speed);
  const restartButton = document.getElementById("restartButton");
  restartButton.style.display = "none";

  // Remove the gameOverMessage element
  const gameOverMessage = document.querySelector(".gameOverMessage");
  if (gameOverMessage) {
    document.body.removeChild(gameOverMessage);
  }
}


document.getElementById("restartButton").addEventListener("click", restartGame);

function game() {
  moveSnake();
  drawSnake();
  drawFood();
}

gameLoop = setInterval(game, speed);
