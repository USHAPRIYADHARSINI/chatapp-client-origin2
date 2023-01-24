import React from 'react'
import { useContacts } from '../context/ContactsProvider'
import { ListGroup, Button } from 'react-bootstrap'

function Contacts() {

  const { contacts } = useContacts()

  return (
    <ListGroup variant='flush'>
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>
          {contact.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
    )
}

export default Contacts