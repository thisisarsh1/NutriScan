import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { SparklesCore } from "./ui/sparkles";
import Uploader from './Uploader'
function Hero() {
  return (
    <div>
      <div className=" h-screen w-full  relative flex flex-col items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-10"
        fill="white"
      />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center"></div>
      
      <div className="h-[20rem] w-full  flex flex-col items-center justify-center overflow-hidden rounded-md mt-10">
      <p className="text-4xl sm:text-8xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-8">
        NutriScan
      </p>
      <div className="w-[40rem] h-20 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

      <SparklesCore
          background="transparent"
          minSize={0.2}
          maxSize={.8}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#4b5563"
        />
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
   </div>
   </div>
   
    <Uploader></Uploader>
    </div> </div>
  )
}

export default Hero
