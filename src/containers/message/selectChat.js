import React from 'react';

import { AiFillWechat } from 'react-icons/ai';

const SelectChat = () => {
  return (
    <div className="bg-white sm:w-2/3 hv-85 w-full h-screen sm:border-4 p-20">
      <div className="border-4 border-dashed h-full w-full">
        <h3 className="text-center sm:text-6xl text-4xl text-gray-400 mt-16">Choose a Chat from chat list</h3>
        <AiFillWechat className="text-gray-400 font-20 mx-auto mt-12" />
      </div>
    </div>
  )
}

export default SelectChat;