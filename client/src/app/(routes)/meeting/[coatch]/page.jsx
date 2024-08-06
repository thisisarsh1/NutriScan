import {  CalenderComp } from '@/app/components/calender'
import React from 'react'

function page() {
  return (
    <div className='min-h-screen'>
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto sm:pt-[15vh] pt-[20vh] ">
      <p className="text-4xl lg:text-6xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-4 sm:py-8">
        Book an appointment
      </p></div>
      <div className='flex  justify-center '>
      <CalenderComp/></div>
    </div>
  )
}

export default page
