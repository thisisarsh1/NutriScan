"use client";
import React, { useState, useRef } from 'react';
// import { SquareDashedMousePointer, Upload, CircleX, Image as LucideImage } from 'lucide-react';
// import Image from 'next/image'; // Assuming you're using Next.js for Image component


import { FileUpload } from "@/app/components/ui/file-upload";
export default function FileUploadComponent() {
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const inputRef = useRef();

//     const handleFilesSelect = (files) => {
//         setSelectedFiles(files);
//     };

//     const handleFileDrop = (e) => {
//         e.preventDefault();
//         handleFilesSelect(Array.from(e.dataTransfer.files));
//     };

//     const handleFilesChange = (e) => {
//         handleFilesSelect(Array.from(e.target.files));
//     };

//     const handleUpload = async (e) => {
//         e.preventDefault();

//         if (selectedFiles.length === 0) {
//             console.error('No files selected');
//             return;
//         }

//         const formData = new FormData();
//         selectedFiles.forEach(file => formData.append('scan_image', file));

//         // Log the formData to verify it's populated correctly
//         for (let [key, value] of formData.entries()) {
//             console.log(key, value);
//         }

//         try {
//             const response = await fetch('http://127.0.0.1:8000/api/foodscan/images/', {
//                 method: 'POST',
//                 body: formData,
//                 // Optional: Track progress if needed
//                 // headers: { 'Content-Type': 'multipart/form-data' }, // Not required for FormData
//             });

//             if (response.ok) {
//                 console.log('Image sent');
//                 setUploadProgress(0);
//                 setSelectedFiles([]);
//             } else {
//                 console.error('Image not sent', response.statusText);
//                 const errorData = await response.json();
//                 console.error('Error details:', errorData);
//             }
//         } catch (error) {
//             console.error('Network error:', error);
//         }
//     };

//     const handleCancel = () => {
//         setSelectedFiles([]);
//         setUploadProgress(0);
//     };

//     return (
//         <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-transparent w-full sm:w-[50vw] mx-1 sm:mx-auto ">
//     <div className="flex flex-row justify-between mb-4 gap-4">
//         <button 
//             className="px-4 py-2 text-white rounded flex flex-col items-center text-center hover:text-slate-400"
//             onClick={() => inputRef.current.click()}
//         >
//             <SquareDashedMousePointer />
//             <div className="text-sm sm:text-base">Browse</div>
//         </button>
//         <button 
//             className="px-4 py-2 text-white rounded flex flex-col items-center text-center hover:text-slate-400"
//             onClick={handleUpload}
//         >
//             <Upload />
//             <div className="text-sm sm:text-base">Upload</div>
//         </button>
//         <button 
//             className="px-4 py-2 text-white rounded flex flex-col items-center text-center hover:text-slate-400"
//             onClick={handleCancel}
//         >
//             <CircleX />
//             <div className="text-sm sm:text-base">Cancel</div>
//         </button>
//         <input 
//             type="file" 
//             multiple 
//             ref={inputRef} 
//             className="hidden" 
//             onChange={handleFilesChange} 
//         />
//     </div>

//     <div 
//         className="p-4 border border-gray-300 rounded-lg flex flex-col items-center justify-center h-56 sm:min-h-62"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleFileDrop}
//     >
//         {selectedFiles.length === 0 ? (
//             <div className="flex items-center justify-center h-full">
//                 <div className="flex flex-col items-center text-center">
//                     <LucideImage 
//                         width={80} 
//                         height={80} 
//                         className="mb-4" 
//                     />
//                     <p className="text-gray-500 text-sm sm:text-base">Drag and drop files here or click browse</p>
//                     <p className="text-gray-500 text-sm sm:text-base">Or just enter the barcode number</p>
//                 </div>
//             </div>
//         ) : (
//             <ul className="list-disc text-sm sm:text-base">
//                 {selectedFiles.map((file, index) => (
//                     <li key={index}>{file.name}</li>
//                 ))}
//             </ul>
//         )}
//     </div>
//     <div className="mt-4">
//         <Barcode_input />
//     </div>
//     {uploadProgress > 0 && (
//         <div className="mt-4">
//             <div className="h-2 bg-gray-200 rounded-full">
//                 <div 
//                     className="h-full bg-blue-500 rounded-full" 
//                     style={{ width: `${uploadProgress}%` }}
//                 ></div>
//             </div>
//             <p className="text-sm text-gray-500 mt-1">{uploadProgress}%</p>
//         </div>
//     )}
// </div>


    // );



    const [files, setFiles] = useState([]);
    const handleFileUpload = (files) => {
      setFiles(files);
      console.log(files);
    };
  
    return (
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload onChange={handleFileUpload} />
      </div>
    );
}


