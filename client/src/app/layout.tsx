import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { SocketProvider } from "@/app/context/socket";
import { UserProvider } from '@/app/context/Userinfo';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriScan",
  description: "App that will make You Fit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="dark bg-black">
      <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
<link rel="manifest" href="/site.webmanifest"/>
      </head>
      <body className={inter.className}>
        <UserProvider>
          <Navbar className="top-9" />
          <main>
            <SocketProvider>
              {children}
            </SocketProvider>
          </main>
          <Toaster /> 
        </UserProvider>
      </body>
    </html>
  );
}
