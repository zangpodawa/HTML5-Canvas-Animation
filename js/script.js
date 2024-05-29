const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const dotRadius = 7;
const dotColor = ["blue", "red", "yellow"];
const dots = [
  { x: 300, y: 90 },
  { x: 330, y: 145 },
  { x: 345, y: 165 },
  { x: 370, y: 170 },
  { x: 390, y: 135 },
  { x: 410, y: 100 },
  { x: 400, y: 190 },
  { x: 410, y: 220 },
  { x: 430, y: 240 },
  { x: 410, y: 260 },
  { x: 400, y: 275 },
  { x: 390, y: 300 },
  { x: 430, y: 320 },
  { x: 450, y: 360 },
  { x: 445, y: 400 },
  { x: 448, y: 445 },
  { x: 450, y: 485 },
  { x: 450, y: 560 },
  { x: 410, y: 560 },
  { x: 380, y: 580 },
  { x: 445, y: 585 },
  { x: 455, y: 610 },
  { x: 400, y: 630 },
  { x: 345, y: 670 },
  { x: 280, y: 585 },
  { x: 250, y: 605 },
  { x: 150, y: 635 },
  { x: 90, y: 630 },
  { x: 7, y: 610 },
  { x: 90, y: 600 },
  { x: 150, y: 600 },
  { x: 245, y: 580 },
  { x: 260, y: 535 },
  { x: 265, y: 460 },
  { x: 300, y: 410 },
  { x: 320, y: 350 },
  { x: 270, y: 360 },
  { x: 205, y: 370 },
  { x: 205, y: 310 },
  { x: 240, y: 296 },
  { x: 230, y: 260 },
  { x: 250, y: 245 },
  { x: 260, y: 270 },
  { x: 270, y: 310 },
  { x: 310, y: 300 },
  { x: 340, y: 290 },
  { x: 325, y: 255 },
  { x: 310, y: 230 },
  { x: 320, y: 170 },
  { x: 305, y: 140 },
  { x: 300, y: 90 },
];

let currentIndex = 0;
let interval;
let animationRunning = false;

function drawDot(x, y, color) {
  ctx.beginPath();
  ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(dot1, dot2, color) {
  ctx.beginPath();
  ctx.moveTo(dot1.x, dot1.y);
  ctx.lineTo(dot2.x, dot2.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = dotRadius;
  ctx.stroke();
}

function drawKangaroo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw dots
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    drawDot(dot.x, dot.y, dotColor[i % dotColor.length]);
  }

  // Connect dots
  for (let i = 1; i <= currentIndex; i++) {
    const dot1 = dots[i - 1];
    const dot2 = dots[i];
    drawLine(dot1, dot2, dotColor[i % dotColor.length]);
  }

  currentIndex++;
  if (currentIndex >= dots.length) {
    clearInterval(interval);
    animateKangaroo();
  }
}

function animateKangaroo() {
  const kangarooImage = new Image();
  kangarooImage.src = "images/kangaroo.jpg";
  kangarooImage.onload = function () {
    let kangarooX = 0; // Initial position of kangaroo image
    let kangarooSpeed = 2; // Speed of kangaroo image movement
    let direction = 1; // Direction of kangaroo image movement (1 for right, -1 for left)

    function moveKangaroo() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw kangaroo image
      ctx.drawImage(kangarooImage, kangarooX, 100);

      // Update position of kangaroo image
      kangarooX += kangarooSpeed * direction;

      // Bounce off when the kangaroo image reaches the canvas edges
      if (kangarooX + kangarooImage.width > canvas.width || kangarooX < 0) {
        direction *= -1;
      }
    }

    interval = setInterval(moveKangaroo, 10);
  };
}

function startAnimation() {
  if (!animationRunning) {
    currentIndex = 0;
    interval = setInterval(drawKangaroo, 1000);
    animationRunning = true;
    startButton.textContent = "Stop Animation";
  } else {
    clearInterval(interval);
    animationRunning = false;
    startButton.textContent = "Begin Animation";
  }
}

function clearScreen() {
  clearInterval(interval);
  animationRunning = false;
  startButton.textContent = "Begin Animation";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const startButton = document.getElementById("startButton");
const clearButton = document.getElementById("clearButton");
startButton.addEventListener("click", startAnimation);
clearButton.addEventListener("click", clearScreen);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
