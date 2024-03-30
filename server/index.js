const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "https://meet-up-tau.vercel.app/",
  })
);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "https://meet-up-tau.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Server connected");
  socket.on("join-room", ({ roomId, id }) => {
    console.log("User joined room: ", roomId, id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", id);
  });

  socket.on("toggle-audio", (userId, roomId) => {
    console.log("Toggling audio");
    socket.broadcast.to(roomId).emit("toggle-audio", userId);
  });

  socket.on("toggle-video", (userId, roomId) => {
    console.log("Toggling audio");
    socket.broadcast.to(roomId).emit("toggle-video", userId);
  });
  socket.on("leave-room", (userId, roomId) => {
    console.log("user left room");
    socket.broadcast.to(roomId).emit("leave-room", userId);
  });
});

httpServer.listen(4000);
