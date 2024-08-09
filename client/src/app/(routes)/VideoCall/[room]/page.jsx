// "use client"
// import { useSocket } from '@/app/context/socket'
// import React, { useCallback, useEffect } from 'react'

// function page() {
//   const socket = useSocket();

//   const handleUserJoined = useCallback(({ name, id ,room}) => {
//     console.log(`User joined: ${name}, ID: ${id} room:${room}`); // Add this log
//   }, []);

//   useEffect(() => {
//     socket.on("user:join", handleUserJoined);

//     return () => {
//       socket.off("user:join", handleUserJoined);
//     };
//   }, [socket, handleUserJoined]);

//   return (
//     <div>
//       hello
//     </div>
//   );
// }

// export default page;

