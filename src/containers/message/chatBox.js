import React, {useEffect, useState, useRef} from 'react';
import {withRouter, Link, NavLink, Route} from 'react-router-dom';

import { IoMdSend } from 'react-icons/io';

import firebase from "firebase/app";
import {firestore} from '../../firebase';

const ChatBox = (props) => {

  const scroll = useRef();

  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState('');
  const [chatArr, setChatArr] = useState(null);
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    firestore.collection("chats").doc(props.match.params.chatId).collection('chat').orderBy('timestamp')
    .onSnapshot((querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
          chats.push(doc.data());
      });
      if (chats.length > 0) {
        setChat(chats);
      }
  });

  
    
  }, [])

  useEffect(() => {
    if (props.userData) {
      setChatData(props.userData.chats[props.match.params.chatId]);
    }
  }, [props.userData])

  useEffect(async () => {
    if (chat.length > 0) {
    let msgArr = [];
    if (chatArr) {
      msgArr = [...chatArr];
      let element;
      if (chat[chat.length - 1].uid === props.uid) {
        element = <div key={`${chat[chat.length - 1].timestamp}${chat.length}`} className="max-w-80 p-3 text-2xl mb-5 bg-brand-light rounded-2xl float-right clear-both">
        {chat[chat.length - 1].msg}
      </div>
      } else {
        element = <div key={`${chat[chat.length - 1].timestamp}${chat.length}`} className="max-w-80 p-3 text-2xl mb-5 bg-gray-200 rounded-2xl float-left clear-both">
        {chat[chat.length - 1].msg}
      </div>
      }
      msgArr.push(element);
    } else {
      chat.forEach((el, ind) => {
        if (el.uid === props.uid) {
          msgArr.push(
            <div key={`${el.timestamp}${el.msg}${ind}`} className="max-w-80 p-3 text-2xl mb-5 bg-brand-light rounded-2xl float-right clear-both">
              {el.msg}
            </div>
          );
        } else {
          msgArr.push(
            <div key={el.timestamp} className="max-w-80 p-3 text-2xl mb-5 bg-gray-200 rounded-2xl float-left clear-both">
              {el.msg}
            </div>
          )
        }
      })
    }
    await setChatArr(msgArr);
    scroll.current.scrollIntoView({behavior: "instant"});
  }

  }, [chat.length])

  const send = () => {
    if (msg) {
      const chatRef = firestore.collection("chats").doc(props.match.params.chatId).collection("chat");
      chatRef.add({
        uid: props.uid,
        msg: msg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setMsg('');
        console.log("Document successfully written!");
        scroll.current.scrollIntoView({behavior: "smooth"});
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
    }
  }

  const msgSet = (e) => {
    setMsg(e.target.value);
  }

  return (
    <div className="bg-white sm:w-2/3 hv-85 hv-100 flex flex-col justify-between" >
    <div className="h-18 shadow-md sm:block">
      {chatData && <Link to={`/singles/profile/${chatData.uid}/posts`}  className=" flex items-center pl-10 pr-4 py-3 sm:ml-0 ml-16">
          <img src={chatData.dp} className="w-16 h-16 rounded-full object-center object-cover" />
          <div className="ml-6">
            <div className="text-gray-600 text-2xl font-bold" >{chatData.name}</div>
          </div>
      </Link>}
    </div>
    <div className="h-4/5 bg-white overflow-y-auto p-5 shadow-sm relative">
      <Route exact path="/singles/message/chatRoom" render={() => <h1>Select a chat</h1>}/>
      {chatArr}
      <div ref={scroll} className=" float-right clear-both"></div>
    </div>
    <div className="flex justify-center items-center text-center mb-4">
      <textarea id="message" name="message" onChange={msgSet} value={msg} placeholder="Type here..." className="border-2 resize h-16 overflow-hidden focus:border-brand outline-none sm:w-11/12 w-4/5 rounded-full py-2 px-6 text-2xl text-gray-600"/>
      <IoMdSend onClick={send} className="cursor-pointer outline-none sm:ml-2 ml-3 text-6xl text-gray-500 shadow-xl rounded-full border p-2 hover:bg-brand hover:text-white transition-all duration-500 transform hover:-rotate-45" />
    </div>
  </div>
  )
}

export default withRouter(ChatBox);