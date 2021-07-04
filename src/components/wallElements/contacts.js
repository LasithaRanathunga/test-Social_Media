import React from 'react';
import {Link} from 'react-router-dom';

const Contact = (props) => {
  
  const contactsArr = [];
  for (const chatId in props.list) {
    contactsArr.push(<li className="flex items-center mb-6">
              <Link to={`/singles/message/chatRoom/${chatId}`}  className="hover:bg-gray-100 flex items-center pl-10 pr-4 py-3 w-full">
                <img src={props.list[chatId].dp} className="w-16 h-16 rounded-full object-center object-cover" />
                <div className="ml-6">
                  <div className="text-gray-600 text-2xl font-bold" >{props.list[chatId].name}</div>
                </div>
              </Link>
              </li>)
  }
  return (
    <section className="w-1/5 bg-white h-screen overflow-auto py-8 sticky top sm:block hidden">
          <h3 className="text-center text-brand text-3xl font-bold">Contacts</h3>
          <ul className="mt-9">
              {contactsArr}
            </ul>
        </section>
  )
}

export default Contact;