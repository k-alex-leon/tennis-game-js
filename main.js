import './style.css'

// CANVAS INSTANCE
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// circle coords
let x = canvas.width / 2
let y = canvas.height - 30
const ballRadius = 10
// movement
let dx = 2
let dy = -2

// ball
function drawBall(){
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
  }
  
  // frames
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height) // -> clean the canvas
  drawBall()
  // hits top || bottom
  if(y + dy < ballRadius || y + dy > canvas.height - ballRadius) dy = -dy
  // hits sides
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx

  x += dx
  y += dy

}
// drawing every 10ms
function startGame(){
  const interval = setInterval(draw, 10)
}

document.getElementById('runButton').addEventListener('click', function () {
  startGame()
  this.disabled = true
})

