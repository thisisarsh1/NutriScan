import { MainProvider } from '@/app/context/Userinfo';
import SocketProvider from "@/app/api/socket/route"
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main>
        
        <MainProvider>
        <div className="bg-dot-white/[0.18]">
       
          {children}
          </div>
          </MainProvider>
      </main>
    );
  }