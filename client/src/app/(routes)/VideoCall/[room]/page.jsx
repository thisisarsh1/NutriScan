"use client"
import { useSocket } from '@/app/context/socket'
import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import peer from '@/services/peer'


// function page() {
//   const socket = useSocket();
//   const[name,setname]=useState("")
//   const [mystream,setmystream]=useState(null)
//   const [RemoteStream,setRemoteStream]=useState(null)
// const [remotesocketId,setRemotesocketid]=useState(null)
//   const handleUserJoined = useCallback(({ name, id ,room}) => {
//     console.log(`User joined: ${name}, ID: ${id} room:${room}`); // Add this log
//     setRemotesocketid(id)
//     setname(name)
//   }, []);

 

// // install react Player !!!!!
// const handlecallUser =useCallback(async()=>{
// const stream = await navigator.mediaDevices.getUserMedia({
//     audio:true,
//     video:true
// })
// const offer= await peer.getOffer();
// socket.emit("user:call",{to:remotesocketId,offer})
// setmystream(stream)
// },[remotesocketId,socket])



// const handleincomingCall = useCallback(
//     async ({ from, offer }) => {
//         setRemotesocketid(from);
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setmystream(stream);
//       console.log(`Incoming Call`, from, offer);
//       const ans = await peer.getAnswer(offer);
//       socket.emit("call:accepted", { to: from, ans });
//     },
//     [socket]
//   );



// const sendStream = useCallback(() => {
//     for (const track of mystream.getTracks()) {
//       peer.peer.addTrack(track, mystream);
//     }
//   }, [mystream]);


//   const handleCallAccepted = useCallback((from,ans)=>{
// peer.setLocalDescription(ans);
// console.log(`Call Accepted`)
// sendStream()
//   },[sendStream])

//   useEffect(()=>{
// peer.peer.addEventListener("track",async ev =>{
//     const remoteStream =ev.streams
//     console.log("Got Tracks")
//     setRemoteStream(remoteStream[0])
// })
//   },[])
// const HandlenegoNeeded =useCallback(async()=>{
//     const offer =await peer.getOffer()
//     socket.emit('peer:nego:neeed',{offer,to:remotesocketId})
// },[])


// const HandlenegoFinal = useCallback(async({ans})=>{
// await peer.setLocalDescription(ans)
// },[])

// const HandlenegoIncoming =useCallback(async({from,offer})=>{
//     const ans = await peer.getAnswer(offer);
//     socket.emit('peer:nego:done',{to:from,ans})
// },[socket])

//   useEffect(()=>{
// peer.peer.addEventListener('negotiationneeded',HandlenegoNeeded)
// return()=>{
//     peer.peer.removeEventListener('negotiationneeded',HandlenegoNeeded)

// }
//   },[HandlenegoNeeded])




// useEffect(() => {
//     socket.on("user:join", handleUserJoined);
//     socket.on("incoming:call",handleincomingCall)
//     socket.on("call:accepted",handleCallAccepted)
//     socket.on("peer:nego:neeed",HandlenegoIncoming)
//     socket.on("peer:nego:final",HandlenegoFinal)

//     return () => {
//       socket.off("user:join", handleUserJoined);
//       socket.off("incoming:call",handleincomingCall);
//       socket.off("call:accepted",handleCallAccepted);
//     socket.off("peer:nego:neeed",HandlenegoIncoming)
//     socket.off("peer:nego:final",HandlenegoFinal)



//     };
//   }, [socket, handleUserJoined,handleincomingCall,handleCallAccepted,HandlenegoIncoming,HandlenegoFinal]);
//   return (
//     <div>
//       {remotesocketId ? 
//     <div>
//         Connected

//     </div>: 
//      <div>
//         No one in Room
//     </div>
//     }

//     <div>
//         {remotesocketId && <Button onClick={handlecallUser}>Call {name}</Button>}
//         {mystream && <ReactPlayer playing muted height="300px" width="600px" url={mystream}></ReactPlayer>}
//         {mystream &&<Button onClick={sendStream}>Send Stream </Button> }
//         {RemoteStream && <ReactPlayer playing muted height="300px" width="600px" url={RemoteStream}></ReactPlayer>}
//     </div>
//     </div>
//   );
// }

// export default page;




function page ()  {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const[name,setname]=useState("")
  const [done,setdone]=useState(false)
  const[noCall,setNocall]=useState(false)
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
    setname(email)
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
      setNocall(true);
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
      setdone(true)
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    // <div>
      
    //   <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
    //  {remoteSocketId  &&<button onClick={handleCallUser}>CALL</button>}
    //   {myStream && (
    //     <>
    //      <p className="text-4xl lg:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-2 sm:py-3">
    //     YOU
    //   </p>
    //       <ReactPlayer
    //         playing
            
    //         height="300px"
    //         width="500px"
    //         url={myStream}
    //       />
    //     </>
    //   )}
    //   {remoteStream && (
    //     <>  {myStream && <button onClick={sendStreams}>Send Stream</button>}
      
    //   <p className="text-4xl lg:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-2 sm:py-3">
    //     {name}
    //   </p>
    //       <ReactPlayer
    //         playing
           
    //         height="300px"
    //         width="500px"
    //         url={remoteStream}
    //       />
    //     </>
        
    //   )
    
    //   }
    // </div>



    <div className="relative w-full h-screen flex flex-col items-center justify-center">
    {/* Centered Text */}
    <p className="text-center text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-auto z-10">
      {!done && !noCall && (remoteSocketId ? "You Both are connected !" : "Waiting for other person to Join")}
    </p>
  
    {/* Centered Call Button */}
    {remoteSocketId && !done && !noCall && (
      <button className="p-[3px] relative mx-auto max-w-4xl mt-4" onClick={handleCallUser}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#525252] to-[#868686] rounded-lg" />
        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
          Call
        </div>
      </button>
    )}
  
    {/* Centered Join Meeting Button and Remote Stream */}
    {remoteStream && (
      <div className='relative w-full h-screen flex flex-col  '>
        {myStream && !done && (
          <button className="p-[3px] relative max-w-md " onClick={sendStreams}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#525252] to-[#868686] rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Join Meeting !
            </div>
          </button>
        )}
  
        <ReactPlayer
          playing
          height="100%"
          width="100%"
          url={remoteStream}
          className="border-2 border-white rounded m"
        />
      </div>
    )}
  
    {/* Positioned My Stream */}
    {myStream && (
      <ReactPlayer
        playing
        height="300px"
        width="400px"
        url={myStream}
        className="absolute bottom-4 right-4 border-2 border-white rounded"
      />
    )}
  </div>
  

  );
};

export default page;

