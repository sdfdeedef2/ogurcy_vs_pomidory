const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

let players = {};

io.on("connection", (socket) => {
  console.log("Новый игрок подключился:", socket.id);
  players[socket.id] = { x: 400, y: 300 };
  io.emit("update", players);

  socket.on("move", (pos) => {
    players[socket.id] = pos;
    io.emit("update", players);
  });

  socket.on("disconnect", () => {
    console.log("Игрок отключился:", socket.id);
    delete players[socket.id];
    io.emit("update", players);
  });
});

httpServer.listen(3000, () => console.log("Сервер запущен на порту 3000"));
