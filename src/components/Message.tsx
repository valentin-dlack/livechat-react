import React, { Fragment } from 'react'

export interface MessageProps {
    id: number,
    message: string,
    sender_id: number,
    time: Date,
    file: {
        name: string,
        image: boolean,
        url: string,
    } | null,
}
export default function Message({ message }: { message: MessageProps }) {

    const my_id = 1;

  return (
    <Fragment>
        {message.sender_id === my_id ? (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt=""
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50 ml-4">{message.time ? message.time.toLocaleTimeString() : ''}</time>
            </div>
            <div className="chat-bubble">
                {message.message}
                {message.file && (
                    <div className="chat-file">
                        {message.file.image ? (
                            <div>
                                <img alt="" src={message.file.url} className='w-32 h-32 rounded-lg' />
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
        ) : (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt=""
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50 ml-4">{message.time ? message.time.toLocaleTimeString() : ''}</time>
            </div>
            <div className="chat-bubble">
                {message.message}
                {message.file && (
                    <div className="chat-file">
                        {message.file.image ? (
                            <div>
                                <img alt="" src={message.file.url} className='w-32 h-32 rounded-lg' />
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
