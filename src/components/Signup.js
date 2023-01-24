import React from 'react'
import * as yup from "yup";
import {useFormik} from "formik";
import {Form, Button, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const formValidationSchema = yup.object({
  name:yup.string().required(),
  email:yup.string().required(),
  password:yup.string().required().min(5),
  mobile:yup.string().required(),
})
function Signup() {

  let navigate = useNavigate()
  const {handleSubmit, values, handleChange,handleBlur,touched, errors} = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      mobile:''
    },
    validationSchema : formValidationSchema,
    onSubmit:(newUser) => {
        addList(newUser)
    }

})
  let addList = (newUser) => {
    fetch(`${process.env.RENDER_URL}/users/signup`,{
        method:"POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type" : "application/json",
      },
      })
      .then((data) => data.json())
      .then((data) => {
        if(data){
          if(data.msg === "User Already Exist"){
            toast.error('User Already Exist', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
          }else{
            toast.success('User successfully registered', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              },navigate("/users/login"))
          }
        }

      })
}
          

  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
    <Form onSubmit={handleSubmit} className='w-100'>
        <Form.Group className='my-2'>
            <Form.Label>Enter your name</Form.Label>
            <Form.Control type="string" name="name" onChange={handleChange} value={values.name} required/>
        </Form.Group>
        <Form.Group className='my-2'>
            <Form.Label>Enter your email</Form.Label>
            <Form.Control type="string" name="email" onChange={handleChange} value={values.email} required/>
        </Form.Group>
        <Form.Group className='my-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="string" name="password" onChange={handleChange} value={values.password} required/>
        </Form.Group>
        <Form.Group className='my-2'>
            <Form.Label>Enter your mobile</Form.Label>
            <Form.Control type="string" name="mobile" onChange={handleChange} value={values.mobile} required/>
        </Form.Group>
            <Button type='submit'>Submit</Button>
            <Button onClick={() => navigate('/users/login')} variant='secondary' className='mx-2'>Back to Login</Button>
    </Form>
</Container>
  )
}

export default Signup