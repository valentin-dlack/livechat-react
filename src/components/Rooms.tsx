import { DocumentData, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { Fragment, useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Rooms = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [rooms, setRooms] = useState<DocumentData>()
  const [delConfirm, setDelConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (!currentUser) return
    const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (snapshot) => {
      setRooms(snapshot.data())
    });

    return () => {
      unsub()
    }
  }, [currentUser])

  const handleDeleteConf = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const id = e.currentTarget.parentElement?.id
    if (id) {
      setDelConfirm(id)
    }
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    
    console.warn(`Deleting ${delConfirm} [NOT IMPLEMENTED] !`)
    setDelConfirm(null)
  }

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
          {delConfirm === key && (
          <div className="flex flex-col ml-2">
            <span className="ml-2">Voulez-vous vraiment supprimer cette conversation ?</span>
            <div className="flex flex-row">
              <button className="btn btn-sm btn-ghost text-sm mr-2" onClick={() => setDelConfirm(null)}>Annuler</button>
              <button className="btn btn-sm btn-primary text-sm" onClick={handleDelete}>Confirmer</button>
            </div>
          </div>
          )}
          {!delConfirm && (
          <>
            <button className="btn btn-sm btn-ghost text-sm mr-2" onClick={handleDeleteConf}><FontAwesomeIcon icon={faTrash} /></button>
            <img src={value.userInfos.avatar} alt="" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col ml-2">
              <span className="ml-2">{value.userInfos.username}</span>
              <span className="ml-2 text-sm text-gray-400 italic">{value.lastMessage ? value.lastMessage.substring(0, 20) + (value.lastMessage.length > 20 ? '...' : '') : 'Aucun message'}</span>
            </div>
          </>
          )}
        </li>
      ))}
      </ul>
  )
}
