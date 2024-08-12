
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <main>
      <div className="bg-dot-white/[0.18]">
          {children}
        </div>
      </main>
    
  );
}
