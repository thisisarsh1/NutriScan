"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function Movingcards() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col items-center justify-center relative overflow-hidden antialiased  dark:bg-black dark:bg-grid-white/[0.05]">
  <div className="text-6xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-8">
    Testimonials
  </div>
  
  {/* Ensure spacing between title and cards */}
  <div className="mt-8 flex flex-col items-center sm:flex-row sm:items-start w-full">
    <InfiniteMovingCards
      items={testimonials}
      direction="right"
      speed="slow"
      className="w-full sm:w-[calc(100%-2rem)]" // Adjust width for responsiveness
    />
  </div>
</div>

  );
}

const testimonials = [
    {
        quote: "Nutriscan isn't just an app; it's a lifestyle change. The daily nutritional insights have been crucial in keeping me aligned with my health goals.",
        name: "Priya Patel",
        title: "Yoga Instructor"
      },
      {
        quote: "My eating habits used to be all over the place, but Nutriscan has brought structure and clarity. The personalized feedback is perfect for my fast-paced lifestyle.",
        name: "Michael Chen",
        title: "Busy Professional"
      },
      {
        quote: "Nutriscans detailed breakdown of my daily diet has been eye-opening. Its made healthy eating accessible and manageable, and I feel more empowered to make nutritious choices.",
        name: "Sophia Garcia",
        title: "Wellness Blogger"
      },
      {
        quote: "Being a busy parent, Nutriscan is a game-changer. It helps me quickly evaluate the nutritional value of meals and ensures my familys diet is balanced and healthy.",
        name: "Emily Davis",
        title: "Busy Parent"
      },
      {
        quote: "With Nutriscan, I finally have a clear picture of my daily intake. The apps easy-to-use interface and actionable insights make sticking to a healthy diet effortless.",
        name: "James Brown",
        title: "Personal Trainer"
      },
      {
        quote: "Nutriscan has become an integral part of my daily routine. Its not just about tracking my food—its about making informed decisions that support my wellness journey.",
        name: "Olivia Martinez",
        title: "Nutritionist"
      },
];
