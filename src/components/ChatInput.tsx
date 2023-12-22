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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { currentUser } = useContext(AuthContext);
    const { state } = useContext(ChatContext);

    const handleSubmit = async () => {
        if (!state.chatId) return
        if (!currentUser) return
        if (!text && !file) {
            setError('Veuillez entrer un message ou joindre un fichier !')
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }

        if (text.length > 1000) {
            setError('Votre message ne doit pas dépasser 1000 caractères !')
            setTimeout(() => {
                setError('')
            }, 3000);
            return
        }

        setLoading(true)

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
        setLoading(false)
    }

    return data.status ? (
        <div>
            <div className="flex items-center space-x-2 bg-base-100 p-2">
                {error && <div className="text-red-500">{error}</div>}
                <span className="text-gray-400 text-sm italic">
                    {text.length}/1000
                </span>
            </div>
            <div className="flex items-center space-x-2 bg-base-100 p-2">
                <input type="file" accept="*" className="hidden" id="fileInput" onChange={(e) => setFile(e.target.files && e.target.files[0])} />
                <label htmlFor="fileInput" className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
                    Joindre un fichier/image
                </label>
                <input type="text" placeholder='Tapez votre message...' onChange={(e) => setText(e.target.value)}
                    value={text} className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleSubmit}>
                    {loading ? <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" className="w-6 h-6" /> : 'Envoyer'}
                </button>
            </div>
        </div>
        ) : (
        <div className="flex items-center space-x-2 bg-base-100 p-2">
            <label className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 cursor-not-allowed" aria-disabled="true">
                Joindre un fichier/image
            </label>
            <input type="text" placeholder='Veuillez sélectionner un utilisateur !' value={text}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none disabled:opacity-50 cursor-not-allowed" disabled />
            <button type="button" className="px-4 py-2 bg-green-500 text-white rounded-md disabled:opacity-50 cursor-not-allowed" disabled>
                {loading ? <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" className="w-6 h-6" /> : 'Envoyer'}
            </button>
        </div>
    )
};