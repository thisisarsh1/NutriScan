"use client";
import { CalenderComp } from "@/app/components/calender";
import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from '@/app/context/socket';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


function Page() {
  const pathname = usePathname();
  const [room, setRoom] = useState("");
  const [name, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
const router =useRouter()
  const handleSend = (data) => {
    setDate(data.selectedDate);
    setTime(data.selectedTime);
  };

  useEffect(() => {
    const segments = pathname.split("/");
    const nameSegment = segments[segments.length - 1];
    setRoom(nameSegment);
    setEmail("seriousmode10@gmail.com");
  }, [pathname]);

  const socket = useSocket();

  useEffect(() => {
    if (room!=""){
socket.emit("room:join", { name, room });

    }
    
  }, [name, room, socket]);

  useEffect(() => {
    socket.on("room:join", (data) => handleJoinRoom(data));
    return () => {
      socket.off("room:join");
    };
  }, [socket]);


   const handleJoinRoom = useCallback((data) => {
    console.log(data);
  }, [name, room, socket]);
    

  const JoinMeet=()=>{
router.push(`/VideoCall/${room}`)
  }
         
   
  
    
 


  return (
    <div className=" flex flex-col items-center justify-center min-h-[100vh]">
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto sm:pt-[10vh] pt-[20vh]">
      <p className="text-4xl lg:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-2 sm:py-3">
        Book an appointment
      </p>
    </div>
    <div className="flex justify-center w-full">
      <CalenderComp onSendData={handleSend} />
    </div>
    <p className="text-4xl lg:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-2 sm:py-3">
        Already have an appointment !
      </p>
    <div className="flex justify-center w-full mt-2">
    
      <button className="p-[3px] relative mx-auto max-w-4xl" onClick={JoinMeet}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#525252] to-[#868686] rounded-lg" />
        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
          JOIN THE MEETING 
        </div>
      </button>
    </div>
<div className="m-12"></div>
  </div>
  
  );
}

export default Page;
