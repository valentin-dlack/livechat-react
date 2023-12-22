import React, { useContext, useEffect, useState } from 'react'
import Message, { MessageProps } from './Message'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const Messages = () => {

  const { currentUser } = useContext(AuthContext);
  const { state } = useContext(ChatContext);

  const [messages, setMessages] = useState<DocumentData[]>([])

  useEffect(() => {
    if (!currentUser) return
    if (!state.chatId) return
    const unSub = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    });

    return () => {
      unSub()
    }
  }, [state.chatId])

  console.log(messages);

  // const messages = [
  //   {
  //     id: 3,
  //     message: 'You were my brother, Anakin!',
  //     sender_id: 1,
  //     time: new Date('2021-01-01T12:47'),
  //     file: {
  //       name: 'revenge-of-the-sith.pdf',
  //       image: false,
  //       url: 'https://www.google.com',
  //     },
  //   },
  //   {
  //     id: 4,
  //     message: 'I loved you!',
  //     sender_id: 1,
  //     time: new Date('2021-01-01T12:48'),
  //     file: {
  //       name: 'image.jpg',
  //       image: true,
  //       url: 'https://loremflickr.com/500/500',
  //     },
  //   }
  // ]

  return (
    <div className="flex-1 p-4 overflow-y-scroll">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}
