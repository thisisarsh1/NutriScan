"use client"
import { useSocket } from '@/app/context/socket'
import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import peer from '@/services/peer'
function page() {
  const socket = useSocket();
  const[name,setname]=useState("")
  const [mystream,setmystream]=useState(null)
const [remotesocketId,setRemotesocketid]=useState(null)
  const handleUserJoined = useCallback(({ name, id ,room}) => {
    console.log(`User joined: ${name}, ID: ${id} room:${room}`); // Add this log
    setRemotesocketid(id)
    setname(name)
  }, []);

 

// install react Player !!!!!
const handlecallUser =useCallback(async()=>{
const stream = await navigator.mediaDevices.getUserMedia({
    audio:true,
    video:true
})
const offer= await peer.getOffer();
socket.emit("user:call",{to:remotesocketId,offer})
setmystream(stream)
},[remotesocketId,socket])



const handleincomingCall = useCallback(
    async ({ from, offer }) => {
        setRemotesocketid(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setmystream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const handleCallAccepted = useCallback((from,ans)=>{
peer.setLocalDescription(ans);
console.log(`Call Accepted`)
for (const track of mystream.getStracks()){
    peer.peer.addTrack(track,mystream)
}
  },[mystream])

useEffect(() => {
    socket.on("user:join", handleUserJoined);
    socket.on("incoming:call",handleincomingCall)
    socket.on("call:accepted",handleCallAccepted)

    return () => {
      socket.off("user:join", handleUserJoined);
      socket.off("incoming:call",handleincomingCall);
      socket.off("call:accepted",handleCallAccepted);

    };
  }, [socket, handleUserJoined,]);
  return (
    <div>
      {remotesocketId ? 
    <div>
        Connected

    </div>: 
     <div>
        No one in Room
    </div>
    }

    <div>
        {remotesocketId && <Button onClick={handlecallUser}>Call {name}</Button>}
        {mystream && <ReactPlayer playing muted height="300px" width="600px" url={mystream}></ReactPlayer>}
    </div>
    </div>
  );
}

export default page;

