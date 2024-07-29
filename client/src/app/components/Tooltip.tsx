"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Fareed Sayed",
    designation: "Backend Developer",
    image:
      "https://media.licdn.com/dms/image/D4D03AQFWGNOleoyn6g/profile-displayphoto-shrink_800_800/0/1719567428064?e=1727913600&v=beta&t=es-EdFyue0qCEyszvf0X_X_1v8QPCJMb9sBQgC9PmvI",
    link:"https://www.linkedin.com/in/fareed-sayed-b39936280/"
    },{
    id: 2,
    name: "Rehbar Khan",
    designation: "Frontend Developer",
    image:
      "https://media.licdn.com/dms/image/D4D03AQEgfaoHFm1iHg/profile-displayphoto-shrink_800_800/0/1707045502590?e=1727913600&v=beta&t=DmxH0-c62TIEeI3uWVr94LBP5eq3lZEhkY983tgbcK0",
      link:"https://www.linkedin.com/in/rehbar-khan/"
    },
  
];

export function Tooltip() {
  return (
    <div className="flex mb-10 ">
  <AnimatedTooltip items={people} />
</div>
  );
}
