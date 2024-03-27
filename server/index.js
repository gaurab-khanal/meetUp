const express = require('express');
const {createServer}  = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:3001/',
}));


const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"]
    }
  });

io.on("connection", (socket)=>{
    console.log("Server connected")
   socket.on("join-room", ({roomId, id})=>{
       console.log("User joined room: ", roomId, id)
       socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-connected", id);
   })
})

httpServer.listen(4000);