import React from 'react';
import { useLoggedInContext } from '@/app/context/Userinfo';

function GetuserInfo() {
  const { LoggedIncontext, setLoggedIncontext } = useLoggedInContext();

  console.log('LoggedIncontext:', LoggedIncontext);

  return (
    <div>
      {/* Render something based on LoggedIncontext if needed */}
    </div>
  );
}

export default GetuserInfo;
