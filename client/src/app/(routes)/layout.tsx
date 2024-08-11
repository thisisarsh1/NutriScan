import { UserProvider } from '@/app/context/Userinfo';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<UserProvider>
      <main>
      <div className="bg-dot-white/[0.18]">
          {children}
        </div>
      </main>
    </UserProvider>
  );
}
