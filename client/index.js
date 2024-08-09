import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});
const nameToSocket = new Map();
const socketToEmail = new Map();

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("room:join", (data) => {
    console.log("Received data:", data); // Check if this logs correctly
    const { name, room } = data;
    console.log(`roomnumber :${room}`);
    nameToSocket.set(name, socket.id);
    socketToEmail.set(socket.id, name);

   
    io.to(room).emit("user:join", { name, id: socket.id, room });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });
});
