const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.style.margin = "0";
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cucumber = new Image();
cucumber.src = "code/objects/texture/cucumber.png";

let x = canvas.width / 2;
let y = canvas.height / 2;
const speed = 5;
const keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

function update() {
    if (keys["w"] || keys["ArrowUp"]) y -= speed;
    if (keys["s"] || keys["ArrowDown"]) y += speed;
    if (keys["a"] || keys["ArrowLeft"]) x -= speed;
    if (keys["d"] || keys["ArrowRight"]) x += speed;
}

function draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cucumber, x - 25, y - 25, 50, 50);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

cucumber.onload = () => {
    gameLoop();
};
