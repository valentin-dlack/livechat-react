import { Messages } from './Messages'
import { ChatInput } from './ChatInput'
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

export const Chat = () => {
  const { state } = useContext(ChatContext);
  const user = state?.user ?? {};

  return (
  
   <div className="flex flex-col h-screen w-full">
      <div className="flex items-center justify-between bg-gray-800 text-white p-3">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={user?.avatar ?? ''} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-xl font-medium text-white">{user?.username ?? ''}</div>
          </div>
        </div>
      </div>

    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-scroll">
        {user.username && <Messages />}
        {!user.username && <div className="flex items-center justify-center h-full text-white text-2xl">Sélectionnez un utilisateur</div>}
      </div>
      <div className="mt-4">
        <ChatInput status={user.username ?? false} />
      </div>
    </div>
    </div>
  )
}