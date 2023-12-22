import { DocumentData, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext';

export const Searchbar = () => {
  const {
    currentUser
  } = useContext(AuthContext);

  const [value, setValue] = useState('')
  const [user, setUser] = useState < DocumentData > ()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSelection = async () => {
    const combinedId = currentUser.uid > user?.uid ? `${currentUser.uid}${user?.uid}` : `${user?.uid}${currentUser.uid}`
    const docSnapshot = await getDoc(doc(db, "chats", combinedId));
    
    if (!docSnapshot.exists() && currentUser && user) {
      try {
        await setDoc(doc(db, "chats", combinedId), {
          combinedId: combinedId,
          users: [currentUser.uid, user.uid],
          messages: []
        })

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [`${combinedId}.userInfos`]: {
            uid: user.uid,
            username: user.username,
            avatar: user.avatar,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [`${combinedId}.userInfos`]: {
            uid: currentUser.uid,
            username: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        })
      } catch (error) {
        console.error(error);
        setError('Une erreur est survenue !')
      }
    }

    setValue('')
    setUser(undefined)
  }

  const handleSearch = async (e: React.KeyboardEvent < HTMLInputElement > ) => {
    if (e.key === 'Enter') {
      setLoading(true)
      setError('')
      setUser(undefined)

      const q = query(collection(db, "users"), where("username", "==", value));

      const querySnapshot = await getDocs(q);
      try {
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
        });
        setLoading(false)
      } catch (error) {
        console.error(error);
        setError('Une erreur est survenue !')
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <input type="text" placeholder="Trouver un utilisateur"
      className="bg-gray-800 rounded-full w-full px-4 py-2 mb-4"
      onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => handleSearch(e)}
      value={value} />
      <ul>
        {loading && <li className="bg-gray-800 p-4 hover:bg-gray-700 cursor-pointer flex items-center">
          <span className="ml-2">Chargement...</span>
        </li>}
        {error && <li className="bg-gray-800 p-4 hover:bg-gray-700 cursor-pointer flex items-center">
          <span className="ml-2">{error}</span>
        </li>}
        {user && (<li className="bg-gray-800 p-4 hover:bg-gray-700 cursor-pointer flex items-center" key={user.uid} onClick={handleSelection}>
          <img alt="profile picture" className="w-8 h-8 rounded-full" src={user?.avatar ?? ''} />
          <span className="ml-2">{user.username}</span>
        </li>)}
        {!user && !loading && !error && value && <li className="bg-gray-800 p-4 hover:bg-gray-700 cursor-pointer flex items-center">
          <span className="ml-2">Aucun utilisateur trouvé</span>
        </li>}
      </ul>
    </div>
  )
}