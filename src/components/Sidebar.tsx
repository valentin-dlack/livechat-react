import React from 'react';
import { Searchbar } from './Searchbar';
import { Navbar } from './Navbar';
import { Rooms } from './Rooms';

export const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen w-96">
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Conversations</h1>
      </div>
      <div className="p-4">
        <Searchbar />
      </div>
      <Rooms />
    </div>
  );
};
