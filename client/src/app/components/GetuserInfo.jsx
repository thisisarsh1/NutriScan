import React, { useEffect } from 'react';
import { useUserContext } from '@/app/context/Userinfo';

function GetuserInfo() {
  const { isLoggedIn } = useUserContext(); // Updated hook

useEffect(()=>{
    

        console.log('LoggedIncontext:', isLoggedIn);
    
     
},[isLoggedIn])
const Getuserinfo = async () => {
  try {
const response = await fetch('http://127.0.0.1:8000/api/user', 
    {credentials: 'include' }
    );

    if (!response.ok) {
      toast({
        title: "Getuser Error",
      });
      return;
    }

    const result = await response.json();
    if (response.ok) {
      // toast({
      //   title: "Form submitted successfully",
      //   description: result?.message,
      // });
      console.log(result);
      router.push("/");
    }
  } catch (error) {
    toast({
      title: "An error occurred",
    });
    console.error("Error submitting form:", error);
  }
};

  return (
    <div>
      {/* Render something based on LoggedIncontext if needed */}
    </div>
  );
}

export default GetuserInfo;
