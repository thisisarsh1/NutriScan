"use client"
import { useEffect, useState } from 'react';

function BotResp() {
const[info,setinfo]=useState('')

    const Getuserinfo = async () => {
      const token = localStorage.getItem('authToken');
        try {
            const response = await fetch('https://nutriscan-1ahz.onrender.com/api/user', 
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
            console.log(result)
         
         
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

                <div key={index} className='text-neutral-300 p-5'>

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
