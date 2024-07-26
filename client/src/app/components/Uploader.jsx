"use client";
import React, { useState, useRef } from 'react';
import { SquareDashedMousePointer, Upload, CircleX, Image as LucideImage } from 'lucide-react';
import Image from 'next/image'; // Assuming you're using Next.js for Image component

export default function FileUploadComponent() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const inputRef = useRef();
    const [image, setImage] = useState(null);

    const handleFilesSelect = (files) => {
        setSelectedFiles(files);
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        handleFilesSelect(Array.from(e.dataTransfer.files));
    };

    const handleFilesChange = (e) => {
        handleFilesSelect(Array.from(e.target.files));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (selectedFiles.length === 0) {
            console.error('No files selected');
            return;
        }
    
   

        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('image', file)); // Append each file
        console.log("formdata",formData)
        try {
            const response = await fetch('http://127.0.0.1:8000/api/foodscan/images/', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                console.log('Image sent');
                // Reset progress and selected files after successful upload
                setUploadProgress(0);
                setSelectedFiles([]);
            } else {
                console.error('Image not sent', response.statusText);
                const errorData = await response.json();
                console.error('Error details:', errorData);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };
    const handleCancel = () => {
        setSelectedFiles([]);
        setUploadProgress(0);
    };

    return (
        <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-transparent w-[50%] h-[40%]  mx-auto">
            <div className="flex justify-between mb-4">
                <button 
                    className="px-4 py-2 text-white  rounded flex-col text-center hover:text-slate-400"
                    onClick={() => inputRef.current.click()}
                >
                    <SquareDashedMousePointer />
                    <div>Browse</div>
                </button>
                <button 
                    className="px-4 py-2 text-white  rounded flex-col text-center hover:text-slate-400"
                    onClick={handleUpload}
                >
                    <Upload />
                    <div>Upload</div>
                </button>
                <button 
                    className="px-4 py-2 text-white  rounded flex-col text-center hover:text-slate-400"
                    onClick={handleCancel}
                >
                    <CircleX />
                    <div>Cancel</div>
                </button>
                <input 
                    type="file" 
                    multiple 
                    ref={inputRef} 
                    className="hidden" 
                    onChange={handleFilesChange} 
                />
            </div>

            <div 
                className="p-4 border border-gray-300 rounded-lg flex flex-col items-center justify-center h-[65%]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
            >
                {selectedFiles.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center text-center">
                            <LucideImage 
                                width={100} 
                                height={100} 
                                className="mb-4" 
                            />
                            <p className="text-gray-500">Drag and drop files here or click browse</p>
                        </div>
                    </div>
                ) : (
                    <ul className="list-disc">
                        {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                )}
            </div>

            {uploadProgress > 0 && (
                <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{uploadProgress}%</p>
                </div>
            )}
        </div>
    );
}
