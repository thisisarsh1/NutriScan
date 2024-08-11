"use client";
import React, { useEffect } from 'react';
import { useUserContext } from '@/app/context/Userinfo'; // Correct import for context
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

function GetuserInfo() {
  const { isLoggedIn } = useUserContext(); // Correct hook to use contextLogin
  const router = useRouter(); // Initialize router
   // Ensure isLoggedIn is a boolean

  useEffect(() => {
    if (isLoggedIn) {

      const timer = setTimeout(() => {
        Getuserinfo();
      }, 3000); // 3 seconds delay
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const Getuserinfo = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ${token}',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
      if (!response.ok) {
        
        throw new Error('Failed to fetch user info'); // Handle error properly
        
      }
      if (response.ok){
        const result = await response.json();
      console.log(result);
      router.push("/");
      }
      
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <div>
      {/* Render something based on contextLogin if needed */}
    </div>
  );
}

export default GetuserInfo;
