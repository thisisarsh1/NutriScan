import {Server} from "socket.io"


     const io = new Server(8000,{
        cors:true,
     })
   const nameToSocket =new Map();
   const socketToEmail =new Map();


   io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);
    
      socket.on("room:join", (data) => {
        console.log("Received data:", data); // This should log the data sent from the client
        const { name, room } = data;
    
        nameToSocket.set(name, socket.id);
        socketToEmail.set(socket.id, name); // Corrected from `socketToEmail.set(socket.id.name)`
    
        io.to(socket.id).emit("room:join", data);
      });
    });
    

    
    
    

