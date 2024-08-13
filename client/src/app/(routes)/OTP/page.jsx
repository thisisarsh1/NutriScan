"use client"
import React, { useState } from 'react'
import { useToast } from "@/components/ui/use-toast";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { useRouter } from 'next/navigation';
  import {useUserContext} from '@/app/context/Userinfo'
  
function page() {
  const router = useRouter();
  const {contextpassword,contextsetPassword,contextsetIsLoggedIn,contextsetEmail,contextsetName}= useUserContext();
const password =contextpassword;




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
      title: "Successfully registered",
      // description: result?.message,

    });
    }
    
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
 
};





  const Autologin=async()=>{
    
      
      const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        
      }),
    })
    if (!response.ok) {
      toast({
        title: "Some error happend",
      });
    }
    
    const result = await response.json();
    if (response.ok) {
      
      localStorage.setItem('authToken', result.jwt);
      Getuserinfo()
      changetoHome();
      contextsetPassword,("");
      
    }
    
    }


  const changetoHome=()=>{
    router.push("/")
  }
    const { toast } = useToast();
    const { contextemail, setContextEmail } = useUserContext();
    const email = contextemail;
    const handleOtpChange=(e)=>{
      setOtp(e.target.value);
    }
    const[otp,setOtp]=useState('')
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
        
      })
     
      if (!response.ok) {
        toast({
          title: "Wrong OTP",
        });
        
      }
      if (response.ok){
        
        Autologin();
        }
      
      
    }
  return (
  <form  onSubmit={handleSubmit}>
    <div className="flex items-center justify-center min-h-screen ">
        
      <div className="p-4 bg-black shadow-md rounded-xl border border-neutral-500 border-dashed w-[30%] h-[50vh] flex  flex-col items-center justify-center">
    <div className='text-neutral-500 font-bold text-xl m-4'>
        {`The OTP has been sent to  ${contextemail}  Please enter the OTP below`}
    </div>
    <div className='flex items-center justify-center my-auto' onChange={handleOtpChange} >
        <InputOTP maxLength={4}  >
          <InputOTPGroup >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>


      
      <button
        className="relative group/btn flex items-center justify-center px-4 w-[50%] text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        type="Submit"
      >
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          Submit
        </span>
        <BottomGradient />
      </button>
    </div>
    
    </div>
</form>
  )
}
const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
export default page
