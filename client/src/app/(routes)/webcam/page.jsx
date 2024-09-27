"use client";
import React, { useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";

// MobileCameraPage from the provided code
const MobileCameraPage = () => {
    const webcamRef = useRef(null);
    const [img, setImg] = useState(null);

    const handleScreenshot = () => {
        if (webcamRef.current) {
            const screenshot = webcamRef.current.getScreenshot();
            setImg(screenshot);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: "user", // Use "environment" for the rear camera
                }}
                className="w-full h-auto"
            />
            <button onClick={handleScreenshot} className="mt-4">
                Take a Picture
            </button>
            {img && <img src={img} alt="Screenshot" className="mt-4" />}
        </div>
    );
};

function Page() {
    const webRef = useRef(null);
    const [img, setImg] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check screen size to determine if it's mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Example breakpoint for mobile
        };

        // Run on load
        handleResize();

        // Add event listener to detect screen resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScreenshot = () => {
        if (webRef.current) {
            const screenshot = webRef.current.getScreenshot();
            setImg(screenshot);
        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-center items-center'>
            <div className='mt-[12vh] w-[90vw] sm:w-[40vw] h-[40vh] flex flex-col justify-center align-middle items-center'>
                {isMobile ? (
                    <MobileCameraPage /> // Use mobile camera if screen size is mobile
                ) : (
                    <>
                        <Webcam ref={webRef} />
                        <button onClick={handleScreenshot} className='p-2'>Take a pic</button>
                    </>
                )}
            </div>
           
            <div className='pt-[15%] w-[90vw] sm:w-[40vw] h-[40vh] flex flex-col justify-center align-middle items-center'>
                {img && <img src={img} alt="Screenshot" />}
            </div>
        </div>
    );
}

export default Page;
