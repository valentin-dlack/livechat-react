import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const ChatInput = (data: any) => {

    const [text, setText] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const { currentUser } = useContext(AuthContext);
    const { state } = useContext(ChatContext);

    const hanfleSubmit = async () => {
        if (!state.chatId) return
        if (!currentUser) return

        if (file) {
            const storageRef = ref(storage, `chats/${state.chatId}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, (error) => {
                console.error(error);
            }, async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await updateDoc(doc(db, "chats", state.chatId), {
                    messages: arrayUnion(
                        {
                            id: uuidv4(),
                            message: text,
                            sender_id: currentUser.uid,
                            time: new Date(),
                            file: {
                                name: file.name,
                                image: file.type.includes('image'),
                                url: downloadURL
                            }
                        }
                    )
                })
            });
        } else {
            await updateDoc(doc(db, "chats", state.chatId), {
                messages: arrayUnion(
                    {
                        id: uuidv4(),
                        message: text,
                        sender_id: currentUser.uid,
                        time: new Date(),
                        file: null
                    }
                )
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [`${state.chatId}.lastMessage`]: text,
            [`${state.chatId}.date`]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userChats", state.user.uid), {
            [`${state.chatId}.lastMessage`]: text,
            [`${state.chatId}.date`]: serverTimestamp(),
        })
            
        setText('')
        setFile(null)
    }

    console.log(data.status);

    return data.status ? (
        <div className="flex items-center space-x-2 bg-base-100 p-2">
            <input type="file" accept="*" className="hidden" id="fileInput" onChange={(e) => setFile(e.target.files && e.target.files[0])} />
            <label htmlFor="fileInput" className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
                Join File or Image
            </label>
            <input type="text" placeholder="Type your message..." onChange={(e) => setText(e.target.value)}
                value={text} className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none" />
            <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={hanfleSubmit}>
                Send
            </button>
        </div>
        ) : (
        <div className="flex items-center space-x-2 bg-base-100 p-2">
            <label className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 cursor-not-allowed" aria-disabled="true">
                Join File or Image
            </label>
            <input type="text" placeholder="Type your message..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none disabled:opacity-50 cursor-not-allowed" disabled />
            <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-50 cursor-not-allowed" disabled>
                Send
            </button>
        </div>
    )
};