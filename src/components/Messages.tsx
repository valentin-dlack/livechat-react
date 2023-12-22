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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!currentUser) return
    if (!state.chatId) return
    setLoading(true)

    const unSub = onSnapshot(doc(db, "chats", state.chatId), async (doc) => {
      doc.exists() && setMessages(await doc.data().messages)
      setLoading(false)
      setTimeout(() => {
        const bottom = document.getElementById('bottom')
        bottom?.scrollIntoView({ behavior: 'smooth' })
      }, 0);
    });

    return () => {
      unSub()
    }
  }, [state.chatId])

  return (
    <div className="flex-1 p-4 overflow-y-scroll">
      {loading && <div className="flex items-center justify-center h-full text-white text-2xl">Chargement...</div>}
      {!loading && messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div id="bottom"></div>
    </div>
  )
}
