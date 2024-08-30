"use client"
import React, { useEffect, useState } from 'react'
import { Spotlight } from './ui/Spotlight'
import { SparklesCore } from "./ui/sparkles";
import Uploader from '@/app/components/Uploader'
import UserTooltip from '@/app/components/UserTooltip'
import { useUserContext } from '@/app/context/Userinfo';

function Hero() {
  const { contextisLoggedIn,contextsetIsLoggedIn,contextsetEmail,contextsetName} = useUserContext(); // Updated hook
  
  const Getuserinfo = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch('http://127.0.0.1:8000/api/user', 
        {
            method: 'GET',
            headers: {
              "Authorization":token,
              'Content-Type': "application/json",
            },
            credentials: 'include',
          }
          
          );
      if (!response.ok) {
        
        throw new Error('Failed to fetch user info'); // Handle error properly
        
      }
      if (response.ok){
        const result = await response.json();
  
      contextsetIsLoggedIn(true)
      contextsetEmail(result.email)
      contextsetName(result.name)
      toast({
        title: "Successfully Logged in",
        // description: result?.message,
  
      });
      }
      

    } catch (error) {
      console.error("Error fetching user info:", error);
    }
   
  };
  useEffect(() => {
    // Check if the page has already been reloaded in this session
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      // Set the flag in sessionStorage
      sessionStorage.setItem('hasRefreshed', 'true');
      // Reload the page
      window.location.reload();
    }
    else{
      Getuserinfo()
    }
    
  }, []);
  
  
  return (<>
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
    <Spotlight
      className="-top-10 left-10 sm:left-60 sm:-top-10"
      fill="white"
    />
  <div className="absolute sm:right-[8%] sm:top-[8%]  font-semibold text-lg">
   {contextisLoggedIn?<UserTooltip></UserTooltip>:""}
  </div>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
    
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-[9vw]">
      <p className="text-6xl lg:text-8xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-4 sm:py-8">
        NutriScan
      </p>
      <div className="relative w-full max-w-2xl h-12 sm:h-20">
        {/* Gradients */}
        <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-32 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-32 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.2}
          maxSize={0.8}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#4b5563"
        />
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
    <div className="mt-10 sm:mt-1">
      <Uploader />
    </div>
  </div>
  </>
  )
}

export default Hero
