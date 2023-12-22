import { DocumentData, collection, doc, onSnapshot } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

export const Rooms = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [rooms, setRooms] = useState<DocumentData>()

  useEffect(() => {
    if (!currentUser) return
    const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (snapshot) => {
      setRooms(snapshot.data())
    });

    return () => {
      unsub()
    }
  }, [currentUser])

  const handleSelection = (infos: any) => {
    dispatch({
      type: "CHANGE_USER",
      payload: infos
    })
  }

  return (
    <ul>
      {rooms && Object.entries(rooms).sort((a, b) => b[1].date?.seconds - a[1].date?.seconds).map(([key, value]) => (
        <li key={key} className="bg-gray-800 p-4 hover:bg-gray-700 cursor-pointer flex items-center" onClick={() => handleSelection(value.userInfos)} id={key}>
          <img src={value.userInfos.avatar} alt="" className="w-8 h-8 rounded-full" />
          <div className="flex flex-col ml-2">
            <span className="ml-2">{value.userInfos.username}</span>
            <span className="ml-2 text-sm text-gray-400 italic">{value.lastMessage ? value.lastMessage.substring(0, 20) + (value.lastMessage.length > 20 ? '...' : '') : 'Aucun message'}</span>
          </div>
        </li>
      ))}
      </ul>
  )
}
