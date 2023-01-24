import React from 'react'
import { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import {useFormik} from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage';

// import { v4 as uuidV4 } from 'uuid'

const formValidationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required().min(5),
})



function Login() {

  // const {setId} = useLocalStorage('id')

    const { setUser } = UserAuth();
  
    let navigate = useNavigate();
 
   const {handleSubmit, values, handleChange,handleBlur,touched, errors} = useFormik({
     initialValues:{
       email:'',
       password:'',
     },
     validationSchema : formValidationSchema,
     onSubmit:(loginUser) => {
         addList(loginUser)
     }
 })
 
 let addList = (loginUser) => {
     fetch(`${process.env.REACT_APP_RENDER_URL}/users/login`,{
         method:"POST",
         body: JSON.stringify(loginUser),
         headers: {
           "Content-Type" : "application/json",
       },
       })
           .then((data) => data.json())
           .then(data => {setUser(data.userDetail)
           if(data){
            console.log(data)
             localStorage.setItem("Authorization", data.token)
             localStorage.setItem("email", data.userDetail.email)
             localStorage.setItem("name", data.userDetail.name)
             localStorage.setItem("id", data.userDetail._id)
             localStorage.setItem("mobile", data.userDetail.mobile)
             if (data.msg === "Login Successfully") {
                 // navigate('/dailydress/main')
                 toast.success('Login Successfully', {
                   position: "top-center",
                   autoClose: 5000,
                   hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: true,
                   draggable: true,
                   progress: undefined,
                   theme: "light",
                   },navigate("/users/homepage"))
             }
             }
           })
       .catch(err => console.log('error in login',err)
        //     toast.error("Invalid Credentials", {
        //  position: "top-right",
        //  autoClose: 5000,
        //  hideProgressBar: false,
        //  closeOnClick: true,
        //  pauseOnHover: true,
        //  draggable: true,
        //  progress: undefined,
        //  theme: "light",
        //  })
         )
 }

    

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     onIdSubmit(idRef.current.value)
    // }

    // function createNewId(){
    //     const id = setId(uuidV4())
    //     localStorage.setItem("id", id) //start from here
    // }

  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
        <Form onSubmit={handleSubmit} className='w-100'>
            <Form.Group className='my-2'>
                <Form.Label>Enter your email</Form.Label>
                <Form.Control type="string" name="email" onChange={handleChange} value={values.email} required/>
            </Form.Group>
            <Form.Group className='my-2'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="string" name="password" onChange={handleChange} value={values.password} required/>
            </Form.Group>
                <Button type='submit'>Login</Button>
                <Button onClick={() => navigate('/users/forgotpassword')} variant='secondary' className='mx-2'>Forgot password</Button>
                <Button onClick={() => navigate('/users/signup')} variant='secondary' className='mx-2'>New User Signup</Button>
        </Form>
    </Container>
  )
}

export default Login