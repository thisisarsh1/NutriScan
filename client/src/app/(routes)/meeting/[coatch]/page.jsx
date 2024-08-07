"use client";
import { CalenderComp } from "@/app/components/calender";
import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from '@/app/context/socket';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
function Page() {
  const pathname = usePathname();
  const [room, setRoom] = useState("");
  const [name, setEmail] = useState("name");
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
    socket.emit("room:join", { name, room });
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
    useEffect(()=>{ 
      if(date!=""&&time!=""){
         router.push(`/VideoCall/${room}`)
      }
     
      
      
    
    },[date,time])
  
    
 


  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto sm:pt-[15vh] pt-[20vh] ">
        <p className="text-4xl lg:text-6xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-4 sm:py-8">
          Book an appointment
        </p>
      </div>
      <div className="flex justify-center">
        <CalenderComp onSendData={handleSend} />
      </div>
    </div>
  );
}

export default Page;
