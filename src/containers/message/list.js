import React, {useState} from 'react';
import {NavLink, Link} from 'react-router-dom';

import { AiOutlineArrowLeft } from 'react-icons/ai';

const List = (props) => {

  const [show, setShow] = useState(true);

  const chatArr = [];
  for (const chat in props.chats) {
    chatArr.push(<NavLink key={chat} to={`/singles/message/chatRoom/${chat}`} activeClassName="selectedChat">
    <div className=" flex items-center hover:bg-gray-200 pl-10 pr-4 py-3 mb-6">
      <img src={props.chats[chat].dp} className="w-20 h-20 rounded-full object-center object-cover" />
      <div className="ml-6">
        <div className="text-gray-600 text-2xl font-bold" >{props.chats[chat].name}</div>
      </div>
    </div>
  </NavLink>)
  }

  const sideDrower = () => {
    setShow(!show);
  }
  
  const closeDrower = (e) => {
    setShow(false);
  }

  return (
    <>
    <AiOutlineArrowLeft onClick={sideDrower} className={`fixed z-50 top-5 left-0 text-gray-700 sm:hidden text-5xl border p-2 rounded-full bg-gray-200 ml-6 cursor-pointer transition-all duration-500 transform ${!show && 'rotate-180'} `} />
    <div className={`bg-white sm:w-1/4 w-full hv-85 h-screen py-10 overflow-auto block sm:static fixed top-0 left-0 sm:z-0 z-30 transition-all duration-500 transform ${show ? 'translate-x-0' : '-translate-x-full'}`}>
      <h1 className="text-brand text-5xl font-logo text-center block sm:hidden">Singls</h1>
      <div className="block sm:hidden shadow-md pb-6 mb-5">
        <Link to="/singles" className="bg-brand rounded-full text-2xl text-white py-1 w-11/12 block mx-auto text-center mt-6">Home</Link>
        <Link to="/singles/requests" className="bg-brand rounded-full text-2xl text-white py-1 my-2 w-11/12 block mx-auto text-center mt-3">Requests</Link>
      </div>
      <div className="sm:block hidden">
        {chatArr}
      </div>
      <div onClick={closeDrower} className="sm:hidden block">
        {chatArr}
      </div>
      </div>
      </>
  )
}

export default List;