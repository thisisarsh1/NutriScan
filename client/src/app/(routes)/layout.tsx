import { MainProvider } from '@/app/context/Userinfo';
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