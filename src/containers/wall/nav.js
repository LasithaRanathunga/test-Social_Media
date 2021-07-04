import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';

import Search from '../search/search';

import { FiMenu } from 'react-icons/fi';

const Nav = (props) => {
  
  const [reqNoti, setReqNoti] = useState(null);

  useEffect(() => {
    if (props.userData) {
      if (props.userData.requests.length > 0) {
        setReqNoti(<span className="notificationDot"></span>);
      }
    }
  }, [props.userData])

  return (
      <nav className="bg-white shadow-md sticky top-0 left-0 h-16 z-50">
        <div className="max-w-wall mx-auto h-full flex items-center justify-between">
        <h1 className="text-brand text-5xl font-logo absolute transform -translate-x-1/2 left-1/2">Singls</h1>
        <FiMenu onClick={props.sliderOpen} className="text-gray-800 text-4xl sm:hidden cursor-pointer ml-8" />
          <ul className="sm:flex hidden items-center">
            <li><NavLink className="nav-li" exact to="/singles"  activeClassName="nav-li-selected">Home</NavLink></li>
            <li><NavLink className="nav-li" to="/singles/message/chatRoom"  activeClassName="nav-li-selected">Message</NavLink></li>
            <li><NavLink className="nav-li" to="/singles/requests"  activeClassName="nav-li-selected">Requests</NavLink>
            {reqNoti}</li>
          </ul>
          <div className="sm:block hidden w-1/3">
            <Search />
          </div>
        </div>
      </nav>
  )
}

export default Nav;