"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";

export function Barcode_input() {
  const { toast } = useToast();
  const images = [
    "https://img.freepik.com/free-psd/barcode-illustration-isolated_23-2150584086.jpg?w=1800&t=st=1721989047~exp=1721989647~hmac=4166bb8d7d35f15cf0c66d0bbd69a12d91ef4bd425d8c9cae62fc568dc60fe20",
  
  ];

  const [barcode_number,setbarcode_number]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    

  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/api/user/barcode_response', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
          
  //         barcode_number
  //         ,
  //       }),
  //     });

  //     if (!response.ok) {
  //       toast({
  //         title: "This number is invalid !",
  //       });
  //     }

  //     const result = await response.json();
  //     if (response.ok) {
  //       toast({
  //         title: "This is response !",
  //         description: result,
  //       });
  // };
  //   }
  //   catch (error) {
  //     toast({
  //       title: "An error occurred",
  //     });
  //     console.error("Error submitting form:", error);
  //   }
  console.log(barcode_number)
  }
  return (
    <div className="  flex items-center justify-center p-2">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-neutral-700 dark:text-white  flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Enter Barcode !
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            💪
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Enter Your {" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Barcode Number
              </span>{" "}
              Here
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt="Barcode"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>
            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <div className="flex  items-center justify-center">
               
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Just enter the number under your barcode
                </span>
              </div>
              
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            
            <input className="w-full  text-sm sm:text-base z-50  dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4  "
            value={barcode_number}
            onChange={(e)=>setbarcode_number(e.target.value)}
            placeholder="Enter the Number Here">
          
            </input>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}


