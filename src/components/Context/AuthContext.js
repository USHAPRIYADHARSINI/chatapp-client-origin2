import React from 'react'
import { useEffect, useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export function AuthContextprovider({children}) {
        
    const[user,setUser]=useState(null);

useEffect(() => {
    let email = localStorage.getItem("email")
    if(email){
      fetch(`${process.env.REACT_APP_RENDER_URL}/users/getdetails/${email}`)
      .then((data) => data.json())
      .then((data) => {setUser(data)})
    }
  },[])

return (
    <AuthContext.Provider value={{user, setUser }}>
    {children}
    </AuthContext.Provider>
)
}

export const UserAuth = () => {
    return useContext(AuthContext)
}