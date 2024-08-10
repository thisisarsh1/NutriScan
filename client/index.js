// import { Server } from "socket.io";

// const io = new Server(8000, {
//   cors: true
// });
// const nameToSocket = new Map();
// const socketToEmail = new Map();

// io.on("connection", (socket) => {
//   console.log(`Socket connected: ${socket.id}`);

//   socket.on("room:join", (data) => {
//     console.log("Received data:", data); // Check if this logs correctly
//     const { name, room } = data;

//     nameToSocket.set(name, socket.id);
//     socketToEmail.set(socket.id, name);
    
//     console.log(`Emitting user:join with name: ${name} and id: ${socket.id}`); // Add this log
//     // io.to(room).emit("user:join", { name, id: socket.id });
//     // socket.join(room);
//     io.to(socket.id).emit("room:join", data);
//   });
// });

import { Server } from "socket.io";

const io = new Server(8000, {
  cors: {
  // Ensure this matches your front-end URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("room:join", (data) => {
    console.log("Received data:", data);
    const { name, room } = data;

    // Handle room logic here
    socket.join(room); 
    socket.emit("room:join", data);
    io.to(room).emit("user:join", { name, id: socket.id,room });
   
  });
socket.on("user:call",({to,offer})=>{
  io.to(to).emit("incoming:call",{from:socket.id,offer})
})

socket.on("call:accepted",({to,ans})=>{
io.to(to).emit("call:accepted",{from:socket.id,ans})

})
});

//  (  chrome://webrtc-internals/ ) for viewing stable connection or not
