import { useEffect, useState } from 'react';

function BarcodeResp() {
const[infos,setinfo]=useState('')

    const Getuserinfos = async () => {
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
            setinfo(result)
          
          // router.push("/")
          }
          
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
       
      };
      useEffect(()=>{
        Getuserinfos()
      },[])
     
      return (
        <div>
          {infos.barcode_response ? (
            <div>
              {infos.barcode_response.map((responses, index) => (

                <div key={index} className='text-neutral-300 p-5'>
                  <p>{`calories${responses?.calories}`}</p>
                  <p>{`protien${responses?.protein}`}</p>
                  <p>{`carbohydrates${responses?.carbohydrates}`}</p>
                  <p>{`fat${responses?.fat}`}</p>
                  <br></br>
                  <p>{responses?.result_data}</p>
                  <p>{responses?.reason_data}</p>
                  <br></br> <hr></hr>
                  <br></br>
                 
                </div>
              ))}
            </div>
          ) : (
            'Nothing Scanned Yet'
          )}
        </div>
      );
      
}

export default BarcodeResp
