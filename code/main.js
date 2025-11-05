const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.style.margin = "0";
document.body.style.overflow = "hidden";
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.focus();
window.addEventListener("click", () => window.focus());

let keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

const player = {
  x: canvas.width / 2 - 50,
  y: canvas.height / 2 - 50,
  speed: 5,
  image: new Image(),
};

player.image.src = "code/textures/cucumber.png";

function updatePlayer() {
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;

  // ограничение по краям экрана
  player.x = Math.max(0, Math.min(canvas.width - 100, player.x));
  player.y = Math.max(0, Math.min(canvas.height - 100, player.y));
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (player.image.complete) {
    ctx.drawImage(player.image, player.x, player.y, 100, 100);
  } else {
    ctx.fillStyle = "green";
    ctx.fillRect(player.x, player.y, 100, 100);
  }
}

function gameLoop() {
  updatePlayer();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
