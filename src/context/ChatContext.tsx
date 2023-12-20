import { ReactNode, createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

const INITIAL_STATE = {
    chatId: null,
    user: {}
};
  
export const ChatContext = createContext<any | null>(null);

interface ContextProps {
    children: ReactNode;
}

export const ChatContextProvider: React.FC<ContextProps> = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    const chatReducer = (state: any, action: any) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? `${currentUser.uid}${action.payload.uid}` : `${action.payload.uid}${currentUser.uid}`
                };

            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};