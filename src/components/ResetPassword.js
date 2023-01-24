import React from 'react'
import {useFormik} from "formik";
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import {Form, Button, Container} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formValidationSchema = yup.object({
    password: yup.string().required().min(5),
})

function ResetPassword() {

    const {email,token} = useParams()
    let navigate = useNavigate()

    const {handleSubmit, values, handleChange, handleBlur, touched, errors} = useFormik({
        initialValues:{
          password:'',
        },
        validationSchema : formValidationSchema,
        onSubmit:(pwd) => {
            resetpasswordUser(pwd)
        }
    })

    let resetpasswordUser = (pwd) => {
        fetch(`${process.env.RENDER_URL}/users/${email}/${token}`,{
          method:"POST",
          body: JSON.stringify(pwd),
          headers: {
            "Content-Type" : "application/json",
        },
        })
            .then((data) => data.json())
            .then((data) => {
              if(data.msg === "Success"){
                toast.success("New Password Added Successfully")
                navigate('/users/login')
              }else{
                toast.error("Please Enter Your New Password")
              }
            })
  }

  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
        <Form onSubmit={handleSubmit} className='w-100'>
            <Form.Group className='my-2'>
                <Form.Label>New Password</Form.Label>
                <Form.Control type="string" name="password"  onChange={handleChange} value={values.password} required/>
            </Form.Group>
                <Button type='submit'>Submit Changes</Button>
                <Button onClick={() => navigate('/users/login')} variant='secondary' className='mx-2'>Back to login</Button>
        </Form>
    </Container>
  )
}

export default ResetPassword