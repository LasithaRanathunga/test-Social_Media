import React, {useState, useEffect, useRef} from 'react';
import {withRouter, Link, NavLink, Route} from 'react-router-dom';

import SelectChat from './selectChat';
import Navigation from '../wall/nav';
import List from './list';
import ChatBox from './chatBox';

import { MdCameraRoll } from 'react-icons/md';

const Message = (props) => {

  
  const [chatList, setChatList] = useState(null);

  useEffect(() => {
    if(props.user) {
      setChatList(props.user.chats);
    }
    
  }, [props.user])

  return (
    <>
    <div className="sm:block hidden"><Navigation userData={props.user} /></div>
    <div className="sm:flex max-w-chatRoom justify-between mx-auto sm:mt-12">
      {/* <div className="bg-white sm:w-1/4 sm:hv-85 py-10 overflow-auto sm:block hidden">
        {chatData && <NavLink to={`/singles/message/chatRoom/${props.match.params.chatId}`} activeClassName="selectedChat">
          <div className=" flex items-center hover:bg-gray-200 pl-10 pr-4 py-3">
            <img src={chatData.dp} className="w-20 h-20 rounded-full object-center object-cover" />
            <div className="ml-6">
              <div className="text-gray-600 text-2xl font-bold" >{chatData.name}</div>
            </div>
          </div>
        </NavLink>}
      </div> */}
      {chatList && <List chats={chatList} />}
      <Route exact path="/singles/message/chatRoom/:chatId" render={() => <ChatBox userData={props.user} uid={props.uid} />} />
      <Route exact path="/singles/message/chatRoom" component={SelectChat} />
    </div>
    </>
  )
}

export default withRouter(Message);