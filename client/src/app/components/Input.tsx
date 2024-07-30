"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function Input() {
  const placeholders = [
    "Is it Good for my Health?",
    "Does it contain any type of harmful Preservatives?",
    "Does it provide essential nutrients?",
    "Are there any potential allergens?",
    "Is it safe with other medications?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="sm:h-screen flex flex-col justify-center  items-center p-4 mt-5">
      <h2 className="mb-10 sm:mb-10  text-center sm:text-2xl z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600">
        Ask NutriScan Anything about the scanned Product
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
