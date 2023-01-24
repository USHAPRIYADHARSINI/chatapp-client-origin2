import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../context/ConversationProvider'

function OpenConversation() {
    const [text, setText] = useState('')
    const { sendMessage, selectedConversation }= useConversations()
    
    const setRef = useCallback(node => {
        if (node){
            node.scrollIntoView({smooth:true})
        }
    },[])

    function handleSubmit(e) {
        e.preventDefault()
        sendMessage(
            selectedConversation.recipients.map(r => r.id), text
        )
        setText('')
    }

  return (
    <div className='d-flex flex-column flex-grow-1 openconvo'>
        <div className='flex-grow-1 overflow-auto'>
            <div className='d-flex flex-column align-items-start justify-content-end px-3'>
                {selectedConversation.messages.map((message, index) => {
                    const lastMessage = selectedConversation.messages.length-1 === index
                    return (
                        <div 
                            ref={lastMessage ? setRef : null}
                            className={`d-flex flex-column my-1 
                            ${message.fromMe ? 'align-self-end' : ''}`}
                            key={index}
                        >
                            <div className={`py-1 px-2 rounded-0
                                ${message.fromMe ? 'bg-primary text-white' : 'border align-self-start'}`}>
                                {message.text}
                            </div>
                            <div className={`text-muted small d-flex flex-row
                                ${message.fromMe ? 'align-self-end' : ''}`}>
                                    {message.fromMe ? 'you' : `${message.senderName}`}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='m-2'>
                <InputGroup>
                    <Form.Control 
                        as='textarea'
                        required
                        value={text}
                        onChange={e=> setText(e.target.value)}
                        style={{height: '75px', resize: 'none', backgroundColor:'aliceblue'}}
                    />
                    <Button className='rounded-0' type='submit'>Send</Button>
                </InputGroup>
            </Form.Group>
        </Form>
    </div>
  )
}

export default OpenConversation