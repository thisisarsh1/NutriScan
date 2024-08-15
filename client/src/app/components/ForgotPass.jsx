"use client"
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/app/libs/utils";
import { useToast } from "@/components/ui/use-toast";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/app/context/Userinfo';
import Link from "next/link";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"

 function ForgotPass() {

  const [new_password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { contextsetIsLoggedIn,contextsetEmail,contextsetName} = useUserContext(); // Updated hook
  const [loggedin,setLoggedin]=useState()
  const { toast } = useToast();
  const router = useRouter();
const [confirm_password,setconfirm_password]=useState('')
const [otp,setotp]=useState('')

  // Update email context if it's empty


  const handleSubmit = async () => {
    console.log("setPass")
    try {
        const response = await fetch('http://127.0.0.1:8000/api/password-reset/', 
        {
            method: 'POST',
            headers: {
             
              'Content-Type': "application/json",
            },
            body: JSON.stringify({ email,otp,new_password,confirm_password}),
          }
          
          );
      if (!response.ok) {
        
        throw new Error('Failed to Change Pasword'); // Handle error properly
        
      }
      if (response.ok){
        const result = await response.json();

    //   contextsetIsLoggedIn(true)
    //   contextsetEmail(result.email)
    //   contextsetName(result.name)
      toast({
        title: "Password Changed Successfully",
       
      });         
      router.push("/Login")
      }
      
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
   
  };



  const sendOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/password-reset-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        toast({
          title: "No such email exist",
        });
        return;
      }

      const result = await response.json();
      if (response.ok) {

        toast({
            title: "OTP successfully sent on your email ",
          });
        // localStorage.setItem('authToken', result.jwt);
       
  }
    } catch (error) {
      toast({
        title: "An error occurred",
      });
      console.error("Error submitting form:", error);
    }

    // Update loginInfo context after form submission
    
  };


  


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Forgot Password ?
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
       Make a New One
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={sendOTP}
        >
          Send OTP &rarr;
          <BottomGradient />
        </button>
        <br></br>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="OTP">OTP</Label>
          <div id="otp" placeholder="1234" type="otp" value={otp} onChange={(e) => setotp(e.target.value)} >
          <InputOTP maxLength={6}  >
          <InputOTPGroup >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        </div>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={new_password} onChange={(e) => setPassword(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">confirm_password</Label>
          <Input id="confirm_password" placeholder="••••••••" type="password" value={confirm_password} onChange={(e) => setconfirm_password(e.target.value)} />
        </LabelInputContainer>
        <div className="flex flex-col space-y-4">
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          SUBMIT &rarr;
          <BottomGradient />
        </button>
       
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
export default ForgotPass
