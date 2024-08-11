
// import { Server } from "socket.io";

// const io = new Server(8000, {
//   cors: {
//   // Ensure this matches your front-end URL
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`Socket connected: ${socket.id}`);

//   socket.on("room:join", (data) => {
//     console.log("Received data:", data);
//     const { name, room } = data;

//     // Handle room logic here
//     socket.join(room); 
//     socket.emit("room:join", data);
//     io.to(room).emit("user:join", { name, id: socket.id,room });
   
//   });
// socket.on("user:call",({to,offer})=>{
//   io.to(to).emit("incoming:call",{from:socket.id,offer})
// })

// socket.on("call:accepted",({to,ans})=>{
// io.to(to).emit("call:accepted",{from:socket.id,ans})

// })
// socket.on('peer:nego:neeed',({to,offer})=>{
// io.to(to).emit("peer:nego:neeed",{from:socket.id,offer})

// })


// socket.on ('peer:nego:done',({to,ans})=>{
//   io.to(to).emit("peer:nego:final",{from:socket.id,ans})
  
//   })

// });


//  (  chrome://webrtc-internals/ ) for viewing stable connection or not


import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});