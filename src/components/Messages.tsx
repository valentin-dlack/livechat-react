import React from 'react'
import Message from './Message'

export const Messages = () => {

  const messages = [
    {
      id: 1,
      message: 'You were the Chosen One!',
      sender_id: 1,
      time: new Date('2021-01-01T12:45'),
      file: null,
    },
    {
      id: 2,
      message: 'I hate you!',
      sender_id: 2,
      time: new Date('2021-01-01T12:46'),
      file: null,
    },
    {
      id: 3,
      message: 'You were my brother, Anakin!',
      sender_id: 1,
      time: new Date('2021-01-01T12:47'),
      file: {
        name: 'revenge-of-the-sith.pdf',
        image: false,
        url: 'https://www.google.com',
      },
    },
    {
      id: 4,
      message: 'I loved you!',
      sender_id: 1,
      time: new Date('2021-01-01T12:48'),
      file: {
        name: 'image.jpg',
        image: true,
        url: 'https://loremflickr.com/500/500',
      },
    }
  ]

  return (
    <div className="flex-1 p-4 overflow-y-scroll">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}
