import React from 'react'
import { Spotlight } from './ui/Spotlight'
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
      <p className="text-4xl sm:text-8xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-8">
        NutriScan
      </p>
   
    <Uploader></Uploader>
    </div> </div>
  )
}

export default Hero
