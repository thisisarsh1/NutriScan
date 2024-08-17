"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';

function BotResp() {
const[info,setinfo]=useState('')

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
    
         
         
          setinfo(result)
          
          // router.push("/")
          }
          
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
       
      };
      useEffect(()=>{
        Getuserinfo()
      },[])
     
      return (
        <div>
          {info.botresponse ? (
            <div>
              {info.botresponse.map((response, index) => (
                <div key={index} className='text-neutral-400 p-5'>
                  <p>{`${response?.question} ?`}</p>
                  <br></br>
                  <p>{response?.bot_response}</p>
                  <br></br> <hr></hr>
                  <br></br>
                 
                </div>
              ))}
            </div>
          ) : (
            'No Questions Asked yet'
          )}
        </div>
      );
      
}

export default BotResp
