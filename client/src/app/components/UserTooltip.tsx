"use client";
import React, { useState } from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { useUserContext } from '@/app/context/Userinfo';



 function UserTooltip() {

  const { contextemail,contextname,contextimg} = useUserContext(); // Updated hook
  const people = [
    {
      id: 1,
      name: contextname,
      designation: contextemail,
      image:contextimg,
      link:"/EditProfiles"
      }
    
  ];
  return (
    <div className="flex mb-10 ">
  <AnimatedTooltip items={people} />
</div>
  );
}
export default UserTooltip