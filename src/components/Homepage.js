import React, {useEffect, useState} from 'react'
import { ContactsProvider } from '../context/ContactsProvider';
// import Dashboard from './components/Dashboard';
import { ConversationsProvider } from '../context/ConversationProvider';
import { SocketProvider } from '../context/SocketProvider';
import Dashboard from './Dashboard';
import useLocalStorage from '../hooks/useLocalStorage';


function Homepage() {

  // const [id, setId] = useState('')
  
   const [id, setId] = useLocalStorage("id",[])
  // const id = localStorage.getItem("id")

  const mobile = localStorage.getItem("mobile")

  useEffect(() =>{
    setId(mobile)
  },[id,setId, mobile])

  console.log(id)
   
    

    // useEffect(() =>{
    //   setId(localStorage.getItem("id"))
    // },[id,setId])

  return (
    <SocketProvider id = {id} setId={setId}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
          <Dashboard id ={id}/>
          </ConversationsProvider>
        </ContactsProvider>
    </SocketProvider>

    
  )
}

export default Homepage