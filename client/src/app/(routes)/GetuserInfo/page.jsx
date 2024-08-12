"use client";
import React, { useEffect } from 'react';
import { useUserContext } from '@/app/context/Userinfo'; // Correct import for context
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import axios from 'axios'
function GetuserInfo() {
  const { isLoggedIn } = useUserContext(); // Correct hook to use contextLogin
  const router = useRouter(); // Initialize router
   // Ensure isLoggedIn is a boolea

useEffect(
async () => {
    try {

      

      // const response = await fetch('http://127.0.0.1:8000/api/user', 
      // {
      //     method: 'GET',
      //     headers: {
      //       "Authorization": ` ${token}`,
      //       'Content-Type': "application/json",
      //     },
      //     credentials: 'include',
      //   }
        
      //   );
    // if (!response.ok) {
      
    //   throw new Error('Failed to fetch user info'); // Handle error properly
      
    // }
    // if (response.ok){
    //   const result = await response.json();
    // console.log(result);
    // router.push("/");
    // }
    const result = await response.json();
    console.log(result)
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}) 
  return (
    <div>
      hello
    </div>
  );
}

export default GetuserInfo;
