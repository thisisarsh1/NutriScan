import Image from 'next/image'
import React from 'react'

function Profile() {
  return (
    <div >
      <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' width='200' height='200' className='mx-auto'></Image>
    </div>
  )
}

export default Profile
