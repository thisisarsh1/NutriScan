"use client"
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { MultiStepLoader as Loader } from "./ui/multi-step-loader";
const loadingStates = [
  { text: "Gathering Your Info" },
  { text: "Summoning the OTP Wizards" },
  { text: "Unlocking the Secret Codes" },
  { text: "Assembling Your Digital Key" },
  { text: "Sending OTP Telepathically" },
];

import { useUserContext } from '@/app/context/Userinfo';

import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export function Signup() {
  const { contextsetEmail,contextsetPassword } = useUserContext();
  const { toast } = useToast();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const [loadings, setLoading] = useState(false);

  useEffect(() => {
    setName(`${firstname} ${lastname}`);
  }, [firstname, lastname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (password !== confirm_password) {
      toast({
        title: "Password Doesn't Match",
        description: "Please Enter the same password",
      });
      setLoading(false)
    }

    try {
      const response = await fetch('https://nutriscan-1ahz.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password,
        }),
      });

      if (!response.ok) {
        toast({
          title: "Please fill entire Form",
        });
        setLoading(false)
      }

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Form submitted successfully",
          description: result?.message,
        });
        console.log(result?.message);
        contextsetEmail(email);
        contextsetPassword(confirm_password);
        changetoOTP();
      }
    } catch (error) {
      toast({
        title: "An error occurred",
      });
      console.error("Error submitting form:", error);
    }
  };

  const changetoOTP = () => {
    const timer = setTimeout(() => {
      setLoading(false)
      router.push('/OTP');
    }, 1000);
  }
  return (
    <>{
    loadings == true ?<div className="w-full h-[60vh] flex items-center justify-center">
    {/* Core Loader Modal */}
    <Loader loadingStates={loadingStates} loading={loadings} duration={1000} />
  
  </div> :''
  }
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to NutriScan
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Signup to NutriScan to secure your health 
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-1">
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="Confirmpassword">Confirm password</Label>
          <Input
            id="Confirmpassword"
            placeholder="••••••••"
            type="password"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </LabelInputContainer>
      
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        <br />
        <Link href="/Login">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="button"
          >
            Already have an account? &rarr;
            <BottomGradient />
          </button>
        </Link>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          
        </div>
      </form>
    </div>
    </>
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
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {children}
    </div>
  );
};

