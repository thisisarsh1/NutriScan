"use client";
import { useToast } from "@/components/ui/use-toast";

import { useUserContext } from '@/app/context/Userinfo';
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
export function Input() {
  const { toast } = useToast();
  const [question,setquestion]=useState("")
  const {contextemail,contextisLoggedIn} = useUserContext(); // Updated hook
  const [results,setresult]=useState("")
const user_email =contextemail;
  const placeholders = [
    "Is it Good for my Health?",
    "Does it contain any type of harmful Preservatives?",
    "Does it provide essential nutrients?",
    "Are there any potential allergens?",
    "Is it safe with other medications?",
  ];

  const handleChange = (e) => {
    setquestion(e.target.value);
  };
  const onSubmit = async(e) => {
    e.preventDefault();





    // const Getuserinfo = async () => {
    //   const token = localStorage.getItem('authToken');
    //   try {
    //       const response = await fetch('https://nutriscan-1ahz.onrender.com/api/user', 
    //       {
    //           method: 'GET',
    //           headers: {
    //             "Authorization":token,
    //             'Content-Type': "application/json",
    //           },
    //           credentials: 'include',
    //         }
            
    //         );
    //     if (!response.ok) {
          
    //       throw new Error('Failed to fetch user info'); // Handle error properly
          
    //     }
    //     if (response.ok){
    //       const result = await response.json();
  
    //         console.log(result.botresponse)
    //     }
        
    //   } catch (error) {
    //     console.error("Error fetching user info:", error);
    //   }
     
    // };



    if(contextisLoggedIn==true){

      try {
      
        const response = await fetch('https://nutriscan-1ahz.onrender.com/bot/bot_response/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            
            question,
            user_email
            
          }),
        });
  
        if (!response.ok) {
          toast({
            title: "This Question is invalid !",
          });
        }
  
        const result = await response.json();
        if (response.ok) {
          toast({
            title: "Response procesing",
            
          });
          setresult(result.bot_response)
          
         
    };
      }
      catch (error) {
        toast({
          title: "An error occurred",
        });
        console.error("Error submitting form:", error);
      }
    }

    else{
      toast({
        title: "Please Login first"
      });
    }
    







    
  

  };


 
  return (<>
    <div className="sm:h-screen flex flex-col justify-center  items-center p-4 mt-5">
      <h2 className="mb-10 sm:mb-10  text-center sm:text-2xl z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600">
        Ask NutriScan Anything about the scanned Product
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      <div className="pt-16 w-[40vw] text-neutral-400">
      {results}
    </div>
    </div>
    
    
    </>
  );
}
