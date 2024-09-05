"use client"
import UserImage from '@/app/components/UserImageuploader';
import { useUserContext } from '@/app/context/Userinfo';
import { cn } from "@/app/libs/utils";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

 function EditProfile() {

  const [disease, setDiseases] = useState("");
  const [Proffesion, setProfession] = useState("");
  const[date_of_birth,setBirthDay]=useState("")
  const[gender,setGender]=useState("")
  const[profile_image,setFile]=useState(null)
  const { contextemail,contextsetimg} = useUserContext(""); // Updated hook
  const [loggedin,setLoggedin]=useState()
  const { toast } = useToast();
  const router = useRouter();

  // Update email context if it's empty



  const handleFilechange =(files)=>{
    setFile(files)
  }
 

const email =contextemail

const handleSubmit = async (e) => {
  e.preventDefault();


  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('Proffesion', Proffesion);
    formData.append('disease', disease);
    formData.append('date_of_birth', date_of_birth);
    formData.append('gender', gender);

    // Append the profile image files if available
    if (profile_image && profile_image.length > 0) {
      profile_image.forEach((file) => {
        formData.append('profile_image', file);
      });
    }

    const response = await fetch('https://nutriscan-1ahz.onrender.com/api/user/user_profile/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      toast({
        title: "There Was an error",
      });
      return;
    }

    const result = await response.json();
    if (response.ok) {
      toast({
        title: `Submitted Successfully`,
      });
   
      contextsetimg(result.profile_image);
      router.push('/user-info')
    }
  } catch (error) {
    toast({
      title: "An error occurred",
    });
    console.error("Error submitting form:", error);
  }
};



  


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Update Your Profile
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Profession">Whats Your Profession</Label>
          <Input id="Profession" placeholder="Gym Traniner,CEO .etc" type="text" value={Proffesion} onChange={(e) => setProfession(e.target.value)} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="Diseases">Do you have any any types of Diseases</Label>
          <Input id="Diseases" placeholder="List Them" type="text" value={disease} onChange={(e) => setDiseases(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="BirthDay">Enter Your BirthDay</Label>
          <Input id="BirthDay" placeholder="25/10/2005" type="Date" value={date_of_birth} onChange={(e) => setBirthDay(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Gender">Enter Your Gender</Label>
          <Input id="Gender" placeholder="Male/Female" type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </LabelInputContainer>
        <UserImage onChange={handleFilechange}></UserImage>
        <div className="flex flex-col space-y-4">
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Submit &rarr;
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

export default EditProfile