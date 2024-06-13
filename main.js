import "./style.css";

// CANVAS INSTANCE -> STAGE
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

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

// frames
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // -> clean the canvas
  drawBall();
  drawPaddle();
  // hits top || bottom
  if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) dy = -dy;
  // hits sides
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;

  x += dx;
  y += dy;

  // paddle movement
  if(rightPressed) paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth)
  else if(leftPressed) paddleX = Math.max(paddleX - 7, 0)
}
// drawing every 10ms
function startGame() {
  const interval = setInterval(draw, 10);
}

// key pressed
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.getElementById("runButton").addEventListener("click", function () {
  startGame();
  this.disabled = true;
});
