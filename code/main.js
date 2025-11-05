const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image();
img.src = "objects/texture/cucumber.png";

img.onload = () => {
  const x = canvas.width / 2 - img.width / 2;
  const y = canvas.height / 2 - img.height / 2;
  ctx.drawImage(img, x, y);
};

document.body.style.background = "#555";
