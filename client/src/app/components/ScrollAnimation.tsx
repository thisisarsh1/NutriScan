"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";

export function Scroll() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
             Consult with the Best  <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600">
                Health coatches
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`https://images.pexels.com/photos/7477714/pexels-photo-7477714.jpeg`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
