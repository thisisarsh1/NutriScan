import Image from 'next/image'
import React from 'react'
import { useUserContext } from '@/app/context/Userinfo';

function Profile() {
  const {contextimg} = useUserContext(); // Updated hook

  return (
    <div >
      <Image src={contextimg} width='200' height='200' className='mx-auto'></Image>
    </div>
  )
}

export default Profile
