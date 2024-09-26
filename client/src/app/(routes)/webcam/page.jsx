"use client";
import React, { useRef, useState } from 'react';
import Webcam from "react-webcam";

function Page() {
    const webRef = useRef(null);
    const [img, setImg] = useState(null);

    const handleScreenshot = () => {
        if (webRef.current) {
            const screenshot = webRef.current.getScreenshot();
            setImg(screenshot);
        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-center items-center'>
            <div className='mt-[12vh] w-[90vw] sm:w-[40vw] h-[40vh] flex flex-col justify-center align-middle items-center'>
                <Webcam ref={webRef}/>
                <button onClick={handleScreenshot} className='m-2'>Take a pic</button>
            </div>
           
            <div className='pt-[15%] w-[90vw] sm:w-[40vw] h-[40vh] flex flex-col justify-center align-middle items-center'>
            {img && <img src={img} />}
            </div>
           
        </div>
    );
}

export default Page;