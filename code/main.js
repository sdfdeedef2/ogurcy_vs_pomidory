const socket = io("http://localhost:3000");

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let players = {};
let myId = null;

socket.on("connect", () => myId = socket.id);

socket.on("update", data => players = data);

document.addEventListener("keydown", e => {
  if (!myId) return;
  let p = players[myId];
  if (!p) return;

  if (e.key === "w") p.y -= 5;
  if (e.key === "s") p.y += 5;
  if (e.key === "a") p.x -= 5;
  if (e.key === "d") p.x += 5;

  socket.emit("move", p);
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let id in players) {
    let p = players[id];
    ctx.fillStyle = id === myId ? "green" : "red";
    ctx.fillRect(p.x - 25, p.y - 25, 50, 50);
  }
  requestAnimationFrame(draw);
}

draw();
