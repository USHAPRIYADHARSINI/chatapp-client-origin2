import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket(){
    return useContext(SocketContext)
} 

export function SocketProvider({id, children}) {

 

    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io('SOCKET_URL',
        {auth: {
            token: id
          }}
        )
        setSocket(newSocket)
        console.log(id, 'socket connected in frontend')

        return () => {newSocket.close()
        console.log(id, 'socket connected in frontend 2')}
    },[id])

    

  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  )
}