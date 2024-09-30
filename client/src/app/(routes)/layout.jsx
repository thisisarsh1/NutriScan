import { useUserContext } from '@/app/context/Userinfo';

export default function RootLayout({children}) {


  const { contextisLoggedIn,contextsetIsLoggedIn,contextsetEmail,contextsetName} = useUserContext();
  const Getuserinfo = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch('https://nutriscan-1ahz.onrender.com/api/user', 
        {
            method: 'GET',
            headers: {
              "Authorization":token,
              'Content-Type': "application/json",
            },
            credentials: 'include',
          }
          
          );
      if (!response.ok) {
        
        throw new Error('Failed to fetch user info'); // Handle error properly
        
      }
      if (response.ok){
        const result = await response.json();
  
      contextsetIsLoggedIn(true)
      contextsetEmail(result.email)
      contextsetName(result.name)
      toast({
        title: "Successfully Logged in",
        // description: result?.message,
  
      });
      }
      

    } catch (error) {
      console.error("Error fetching user info:", error);
    }
   
  };
  Getuserinfo()
  return (

      <main>
      <div className="bg-dot-white/[0.18] min-h-screen bg-black">
          {children}
        </div>
      </main>
    
  );
}
