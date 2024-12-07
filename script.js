const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Snowflake {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.wind = Math.random() * 2 - 1;
  }

  update() {
    this.y += this.speed;
    this.x += this.wind;

    if (this.y > canvas.height) {
      this.y = -this.radius;
      this.x = Math.random() * canvas.width;
      this.speed = Math.random() * 3 + 1;
      this.wind = Math.random() * 2 - 1;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.moveTo(0, 0);
      ctx.lineTo(0, this.radius);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -this.radius);
      ctx.rotate((Math.PI * 2) / 6);
    }
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}

let snowflakes = [];
function createSnowflakes() {
  let count = 50;
  snowflakes = [];
  for (let i = 0; i < count; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speed = Math.random() * 3 + 1;
    snowflakes.push(new Snowflake(x, y, radius, speed));
  }
  console.log(snowflakes.length + " snowflakes created");
}
createSnowflakes();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach((snowflake) => {
    snowflake.update();
    snowflake.draw();
  });
  requestAnimationFrame(animate);
}
animate();
