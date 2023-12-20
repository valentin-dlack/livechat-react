import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center h-16 bg-gray-800 text-white">
      <span className="font-bold text-xl ml-4">
        LivChat
      </span>
      <div className="flex items-center mr-4">
        <img src={currentUser?.photoURL ?? ''} alt="profile picture" className="w-8 h-8 rounded-full" />
        <span className="ml-2">{currentUser?.displayName}</span>
        <button name='logout' className="btn btn-sm btn-secondary text-sm ml-4" onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}
