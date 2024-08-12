"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { useUserContext } from '@/app/context/Userinfo';




 function UserTooltip() {
  const { contextemail,contextname} = useUserContext(); // Updated hook
  const people = [
    {
      id: 1,
      name: contextname,
      designation: contextemail,
      image:
        "https://media.licdn.com/dms/image/D4D03AQFWGNOleoyn6g/profile-displayphoto-shrink_800_800/0/1719567428064?e=1727913600&v=beta&t=es-EdFyue0qCEyszvf0X_X_1v8QPCJMb9sBQgC9PmvI",
      link:""
      }
    
  ];
  return (
    <div className="flex mb-10 ">
  <AnimatedTooltip items={people} />
</div>
  );
}
export default UserTooltip