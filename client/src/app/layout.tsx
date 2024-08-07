import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import {SocketProvider}from"@/app/context/socket"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navbar className="top-9" />
        <main><SocketProvider>
          
          {children}
         </SocketProvider>
        </main>
        <Toaster  /> 
      </body>
    </html>
  );
}
