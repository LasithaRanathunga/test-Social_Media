import React from 'react';
import {Link} from 'react-router-dom';

const Following = (props) => {

  const friendsArr = props.userData.friends.map(friend => {
    return (
      <Link to={`/singles/profile/${friend.uid}/posts`} key={friend.uid}>
              <div className=" flex items-center p-3 w-full mb-6 hover:bg-gray-100">
                  <img src={friend.dp} className="w-20 h-20 rounded-full object-center object-cover" />
                <div className="ml-6">
                  <div className="text-gray-600 text-2xl font-bold" >{friend.name}</div>
                </div>
              </div>
              </Link>
    )
  })

  return (
    <section className="w-full bg-white mt-12 py-6">
            <h4 className="text-3xl font-bold text-brand text-center">Friends</h4>
            <ul className="mt-9">
              {/* <li className="flex items-center mb-6">
                <img src="https://us.123rf.com/450wm/iko/iko1409/iko140900116/31694000-studio-portrait-of-a-handsome-young-man-astonished-with-something.jpg?ver=6" className="w-16 h-16 rounded-full object-cover object-center" />
              <span className="pl-6 text-2xl font-medium text-gray-500">Jams Anderson</span>
              </li>
              <li className="flex items-center mb-6">
                <img src="https://us.123rf.com/450wm/iko/iko1409/iko140900116/31694000-studio-portrait-of-a-handsome-young-man-astonished-with-something.jpg?ver=6" className="w-16 h-16 rounded-full object-cover object-center" />
              <span className="pl-6 text-2xl font-medium text-gray-500">Jams Anderson</span>
              </li>
              <li className="flex items-center mb-6">
                <img src="https://us.123rf.com/450wm/iko/iko1409/iko140900116/31694000-studio-portrait-of-a-handsome-young-man-astonished-with-something.jpg?ver=6" className="w-16 h-16 rounded-full object-cover object-center" />
              <span className="pl-6 text-2xl font-medium text-gray-500">Jams Anderson</span>
              </li> */}
              {friendsArr}
            </ul>
          </section>
  )
}

export default Following;