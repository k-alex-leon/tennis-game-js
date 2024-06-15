import "./style.css";

// CANVAS INSTANCE -> STAGE
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// GAME STATUS
let IS_GAME_OVER = true;
let score = 0;
let lives = 3;
// circle coords
let x = canvas.width / 2;
let y = canvas.height - 30;
const ballRadius = 10;
// circle -> movement
let dx = 2;
let dy = -2;

// ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// bricks
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
// 2d arr with bricks position
const bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// draw bricks on map
function drawBricks() {
  bricks.map((columns, c) => {
    // console.log("c: ", c);
    columns.map((brick, r) => {
      console.log("rows: ", brick);
      if (brick.status) {
        // console.log("r: ", r);
        // calculate brick position
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        brick.x = brickX;
        brick.y = brickY;

        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

        console.log("brick: ", brick);
      }
    });
  });

  // console.log('all bricks: ', bricks)
}

// collision
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload()
          }
        }
      }
    }
  }
  // console.log('all bricks:', bricks)
}

// user score
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
}

// user lives
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 60, 20);
}

// user controls
let leftPressed = false;
let rightPressed = false;

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
  else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width)
    paddleX = relativeX - paddleWidth / 2;
}

// frames
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // -> clean the canvas
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawLives();
  // hits top || bottom
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // the ball hit the paddle
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  // hits sides
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;

  x += dx;
  y += dy;

  // paddle movement
  if (rightPressed) paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  else if (leftPressed) paddleX = Math.max(paddleX - 7, 0);


  requestAnimationFrame(draw)
}

// key pressed
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// mouse listener
document.addEventListener("mousemove", mouseMoveHandler, false);

document.getElementById("runButton").addEventListener("click", function () {
  draw()
  this.disabled = true;
});
