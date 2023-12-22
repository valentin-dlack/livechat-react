import React, { Fragment, useContext } from 'react'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Timestamp } from 'firebase/firestore';

export interface MessageProps {
    id: number,
    message: string,
    sender_id: number,
    time: Timestamp,
    file: {
        name: string,
        image: boolean,
        url: string,
    } | null,
}

export default function Message({ message }: { message: MessageProps }) {

    const { currentUser } = useContext(AuthContext);
    const { state } = useContext(ChatContext);

    console.log(new Date(message.time.seconds * 1000).toLocaleString())


    return (
        <Fragment>
            {message.sender_id.toString() !== currentUser?.uid ? (
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt=""
                            src={state.user?.avatar} />
                    </div>
                </div>
                <div className="chat-header">
                    {state.user?.username}
                    <time className="text-xs opacity-50 ml-4">{message.time ? new Date(message.time.seconds * 1000).toLocaleDateString() : ''}</time>
                </div>
                <div className="chat-bubble break-words max-w-5xl">
                    {message.message}
                    {message.file && (
                        <div className="chat-file">
                            {message.file.image ? (
                                <div>
                                    <img alt="" src={message.file.url} className='max-w-64 max-h-32 rounded-lg object-cover' />
                                    <span>{message.file.name}</span>
                                    <a className="btn btn-xs btn-secondary ml-4" href={message.file.url} target="_blank" rel="noreferrer">Télécharger</a>
                                </div>
                            ) : (
                                <div>
                                    <i className="fas fa-file mr-2"></i>
                                    <span className='mr-2 border-b border-dashed border-gray-400'>{message.file.name}</span>
                                    <a className="btn btn-xs btn-secondary ml-4" href={message.file.url} target="_blank" rel="noreferrer">Télécharger</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            ) : (
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt=""
                            src={currentUser?.photoURL ?? ''} />
                    </div>
                </div>
                <div className="chat-header">
                    {currentUser?.displayName}
                    <time className="text-xs opacity-50 ml-4">{message.time ? new Date(message.time.seconds * 1000).toLocaleDateString() : ''}</time>
                </div>
                <div className="chat-bubble break-words max-w-5xl">
                    {message.message}
                    {message.file && (
                        <div className="chat-file">
                            {message.file.image ? (
                                <div>
                                    <img alt="" src={message.file.url} className='max-w-64 max-h-32 rounded-lg object-cover' />
                                    <span>{message.file.name}</span>
                                    <button className="btn btn-xs btn-secondary ml-4">Download</button>
                                </div>
                            ) : (
                                <div>
                                    <i className="fas fa-file mr-2"></i>
                                    <span className='mr-2 border-b border-dashed border-gray-400'>{message.file.name}</span>
                                    <button className="btn btn-xs btn-secondary ml-4">Download</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            )}
        </Fragment>
    )
}
