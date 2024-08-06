import { Children, createContext, useContext, useEffect, useState } from 'react'
import{io} from 'socket.io-client'

export const Usecontext=()=>{
    const socket =useContext(SocketContext)
    return socket;
}
export const SocketProvider=({Children})=>{
    
    const SocketContext =createContext(null)
    const[socket,setSocket] =useState(null)
    useEffect(()=>{
        const connection =io()
        setSocket(connection)
    },[])
    return(
        <SocketContext.Provider value={socket}>
            {Children}
        </SocketContext.Provider>
    )
}