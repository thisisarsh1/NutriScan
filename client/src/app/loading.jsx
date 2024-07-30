"use client";

import React from "react";

// CoolSpinner component
function loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner"></div>
      <style jsx>{`
        .spinner {
          width: 10vw;
          height: 10vw;
          border: 9px solid rgba(0, 0, 0, 0.1);
          border-left-color: #6b7280;
          border-radius: 50%;
          animation: spin 1.2s linear infinite;
        
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
export default loading