"use client";
import { useSocket } from '@/app/context/socket';
import { Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import peer from '@/services/peer';
import { useRouter } from 'next/navigation';
import { PhoneMissed } from 'lucide-react';

 function Page() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const [noCall, setNoCall] = useState(false);
  const router = useRouter();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
    setName(email);
  }, []);

  const handleEndCall = () => {
    window.location.reload();
  };

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
      setNoCall(true);
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
      setDone(true);
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
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <p className="text-center text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-auto z-10">
        {!done && !noCall && (remoteSocketId ? "You Both are connected!" : "Waiting for other person to Join")}
      </p>

      {remoteSocketId && !done && !noCall && (
        <button className="p-[3px] relative mx-auto max-w-4xl mt-4" onClick={handleCallUser}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#525252] to-[#868686] rounded-lg" />
          <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
            Call
          </div>
        </button>
      )}

      {remoteStream && (
        <div className="relative w-full h-screen flex flex-col">
          {myStream && !done && (
            <button className="p-[3px] relative max-w-md" onClick={sendStreams}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#525252] to-[#868686] rounded-lg" />
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Join Meeting!
              </div>
            </button>
          )}

          <ReactPlayer
            playing
            height="98%"
            width="98%"
            url={remoteStream}
            className="border-2 border-white rounded m"
          />
        </div>
      )}

      {myStream && (
        <ReactPlayer
          playing
          height="300px"
          width="400px"
          url={myStream}
          className="absolute bottom-4 right-4 border-2 border-white rounded"
        />
      )}

      {remoteStream && done && (
        <button className="relative bottom-4 right-4" onClick={handleEndCall}>
          <div className="px-8 text-red-500 bg-white rounded-xl relative group transition duration-200 hover:text-red-800 bg-transparent">
            <PhoneMissed />
          </div>
        </button>
      )}
    </div>
  );
}

export default Page;
