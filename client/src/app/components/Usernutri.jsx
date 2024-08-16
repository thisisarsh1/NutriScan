"use client"
import React from 'react'
import { useState } from 'react';
import { useUserContext } from "@/app/context/Userinfo";
import Macros from '@/app/components/charts/Macros'
import Callories from '@/app/components/charts/Callories'
import Others from '@/app/components/charts/others'
import FileUpload from '@/app/components/ui/file-upload'

function Usernutri() {
  const { contextnutri } = useUserContext(); // Updated hook
  
  const [files, setFiles] = useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <><div className='pt-[10%]'>
      {!contextnutri? (
        

        
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg ">
        <FileUpload onChange={handleFileUpload} />
      </div>
      ) : (<>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 '>
          <Macros />
          <Callories />
          <Others />
        

        </div>
        
        <div className='flex flex-col items-center justify-center '>
  <div className='text-3xl lg:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600 py-4 sm:py-8'>
    {contextnutri.result_data}
  </div>
  <p className='px-[10%] text-neutral-300'>{contextnutri.reason_data}</p>
</div>
        
        </>
      )}
      </div>
    </>
  );
}

export default Usernutri;
