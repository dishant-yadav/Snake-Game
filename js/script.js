// game constants and variables
let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");

let score = 0;
let speed = 7;
let lastPaintTime = 0;

// coordinates for the snake
let snakeArr = [{ x: 13, y: 7 }];

// coordinates for the food
food = { x: 6, y: 7 };
// game logic
function main(currTime) {
  // this creates a game  loop
  window.requestAnimationFrame(main);
  //   console.log(currTime);
  if ((currTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currTime;
  gameEngine();
}

function isCollide(sarr) {
  // if the snake bumps/collides with its self
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
      return true;
  }
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  )
    return true;
}

function gameEngine() {
  // part 1 : updating the snake array and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDirection = {
      x: 0,
      y: 0,
    };
    alert("Game Over!!! Press any key to play again");
    snakeArr = [
      {
        x: 13,
        y: 7,
      },
    ];
    musicSound.play();
    score = 0;
  }

  // if you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiScore)
    {
      hiScoreVal = score;
      localStorage.setItem("hiscore", JSON.stringify(hiScoreVal));
  hiscoreBox.innerHTML = "HighScore : " + hiScoreVal;

      }
    scoreBox.innerHTML = "SCORE : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    console.log(food);
  }

  // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDirection.x;
  snakeArr[0].y += inputDirection.y;

  // part 2 : displaying the snake array and the food

  // code to display the snake
  // to clear anything already present in the board
  // to prevent the case where muntiple snake is present on the board
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // code to display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// main logic starts here
musicSound.play();

let hiScore = localStorage.getItem("hiscore");
if (hiScore === null) {
  hiScoreVal = 0;
  localStorage.setItem("hiscore", hiScoreVal);
}
else {
  hiscoreBox.innerHTML = "HighScore : " + hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // start the game as any key is pressed
  inputDirection = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;
    case "ArrowDown":
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;
    case "ArrowLeft":
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;
    case "ArrowRight":
      inputDirection.x = 1;
      inputDirection.y = 0;
      break;
    default:
      break;
  }
});
