import { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const UserContext=createContext({});

export function UserContextProvider({children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    useEffect(()=>{
        if(!user){
            setReady(true);
            axios.get('http://localhost:3000/profile',{withCredentials:true}).then(({data})=>{
            setUser(data);
                
            })
            
        }
    },[]);

    return(
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    )
}