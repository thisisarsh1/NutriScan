import React, { useEffect } from 'react';
import { useLoginInfoContext } from '@/app/context/Userinfo';

function GetuserInfo() {
  const { loginInfo, setLoginInfo } = useLoginInfoContext();
useEffect(()=>{
    

        console.log('LoggedIncontext:', loginInfo);
    
     
},[loginInfo])
 

  return (
    <div>
      {/* Render something based on LoggedIncontext if needed */}
    </div>
  );
}

export default GetuserInfo;
