import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { useContacts } from '../context/ContactsProvider'

function ContactModal({closeModal}) {
const mobileref = useRef()
const nameref= useRef()
const { createContact } = useContacts()

function handleSubmit(e){
    e.preventDefault()

    createContact(mobileref.current.value, nameref.current.value)
    

    closeModal()
}

  return (
    <>
        <Modal.Header closeButton>Create contact</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>mobile</Form.Label>
                    <Form.Control type='text' ref={mobileref} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>name</Form.Label>
                    <Form.Control type='text' ref={nameref} required/>
                </Form.Group>
                <Button type='submit' className='my-2 rounded-0'>Create</Button>
            </Form>
        </Modal.Body>
    </>
  )
}

export default ContactModal