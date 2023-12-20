import React from 'react';

export const ChatInput = () => {
    return (
        <div className="flex items-center space-x-2 bg-base-100 p-2">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
            />
            <label
                htmlFor="fileInput"
                className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
            >
                Join File or Image
            </label>
            <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
                type="button"
                className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
                Send
            </button>
        </div>
    );
};