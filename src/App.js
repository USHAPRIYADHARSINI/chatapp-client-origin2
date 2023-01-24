import './App.css';
import Login from './components/Login.js';
import useLocalStorage from './hooks/useLocalStorage';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import { AuthContextprovider } from './components/Context/AuthContext';
import ResetPassword from './components/ResetPassword';
import Forgotpassword from './components/Forgotpassword';
import Signup from './components/Signup';

function App() {

 
  const token = localStorage.getItem("Authorization")

  // const dashboard =(
  //   <SocketProvider id = {id}>
  //       <ContactsProvider>
  //         <ConversationsProvider id={id}>
  //         <Dashboard id ={id}/>
  //         </ConversationsProvider>
  //       </ContactsProvider>
  //   </SocketProvider>
  // )

  return (
    <>
      <AuthContextprovider>
        <Routes>
          {token ? (
            <Route path="/users/homepage" element={<Homepage />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="/users/signup" element={<Signup />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/forgotpassword" element={<Forgotpassword />} />
          <Route path="/users/PasswordReset/:email/:token" element={<ResetPassword />}/>
          <Route path="/users/homepage" element={<Homepage />}/>
        </Routes>
      </AuthContextprovider>
    </>
  );
}

export default App;
