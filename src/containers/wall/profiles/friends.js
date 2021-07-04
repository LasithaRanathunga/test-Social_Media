import React from 'react';
import {Link} from 'react-router-dom';

const Friends = (props) => {

  const friendsArr = props.data.friends.map(friend => {
    return (
      <Link to={`/singles/profile/${friend.uid}/posts`}>
              <div className=" flex items-center mt-6 hover:bg-gray-100 p-2 mr-6">
                  <img src={friend.dp} className="w-20 h-20 rounded-full object-center object-cover" />
                <div className="ml-6">
                  <div className="text-gray-600 text-2xl font-bold" >{friend.name}</div>
                </div>
              </div>
              </Link>
    )
  })

  return (
    <div className="bg-white p-6 mt-6 sm:grid sm:grid-cols-2">
      {friendsArr}
    </div>
  )
}

export default Friends;