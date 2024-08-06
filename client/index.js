import {Server} from "socket.io"


     const io = new Server(8000)
   

    io.on("connection",(socket)=>{
        socket.emit("Server is connected")
        socket.on("howdy",(arg)=>{
            console.log (arg)
        })
    }) 
    
    
    

