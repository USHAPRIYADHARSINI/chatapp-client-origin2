import React, {useState} from 'react'
import {useFormik} from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const formValidationSchema = yup.object({
    email: yup.string().required(),
})

function Forgotpassword() {

  const navigate = useNavigate();

    const [message,setMessage] = useState(false)

    const {handleSubmit, values, handleChange, handleBlur, touched, errors} = useFormik({
        initialValues:{
          email:'',
        },
        validationSchema : formValidationSchema,
        onSubmit:(cred) => {
            forgotpasswordUser(cred)
        }
    })
    let forgotpasswordUser = (cred) => {
        fetch(`${process.env.REACT_APP_RENDER_URL}/users/forgotpassword`,{
            method:"POST",
            body: JSON.stringify(cred),
            headers: {
              "Content-Type" : "application/json",
          },
          })
          .then((data) => data.json())
          .then((data) => {console.log(data)
            if(data.msg === "Email Sent Successfully"){
              setMessage(true)
            }else{
              toast.error("Invalid Credentials")
            }
            })
}

  return (
    <Container className='align-items-center d-flex' style={{height: '100vh'}}>
        <Form onSubmit={handleSubmit} className='w-100'>
            <Form.Group className='my-2'>
                <Form.Label>Enter your email</Form.Label>
                <Form.Control type="string" name="email"  onChange={handleChange} value={values.email} required/>
            </Form.Group>

            { message ? 
            <p style={{color:"green",fontWeight:600,textAlign:"center",margin:0}}>Reset Link Sent To Your Email Id</p> 
            : null }

                <Button type='submit'>submit</Button>
                <Button onClick={() => navigate('/users/login')} variant='secondary' className='mx-2'>Back to login</Button>
        </Form>
    </Container>
  )
}

export default Forgotpassword