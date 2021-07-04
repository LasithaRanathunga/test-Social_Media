import React from 'react';
import {NavLink, Route} from 'react-router-dom';

import Posts from './posts';
import About from './about';
import Friends from './friends';

const Profile = (props) => {
  return (
    <main >
      <header className="bg-white">
        <img src={props.userData.tmUrl} className="w-full h-96 object-center object-fill" alt="timeline image" />
        <img src={props.userData.dpUrl} className="relative inline w-56 h-56 rounded-full left-1/2 object-center object-cover transform -translate-x-1/2 -translate-y-2/3 border-2" alt="profile picture" />
        <h3 className="text-center text-7xl text-gray-700 -mt-28">{`${props.userData.firstName} ${props.userData.lastName}`}</h3>
        <p className="pt-12 mx-12 text-xl text-left text-gray-500 pb-8" >{props.userData.intro}</p>
      </header>
      <nav className="text-5xl text-gray-600 mt-12 w-11/12 mx-auto flex justify-between">
        <NavLink to="/singles/profile/myprofile/posts" className="profile-nav-link" activeClassName="active-profile-nav-link">Posts</NavLink>
        <NavLink to="/singles/profile/myprofile/about" className="profile-nav-link" activeClassName="active-profile-nav-link">About</NavLink>
        <NavLink to="/singles/profile/myprofile/friends" className="profile-nav-link" activeClassName="active-profile-nav-link">Friends</NavLink>
      </nav>
      <section>
        <Route exact path="/singles/profile/myprofile/posts" render={() => <Posts posts={props.userData.posts}/>} />
        <Route exact path="/singles/profile/myprofile/about" render={() => <About data={props.userData}/>} />
        <Route exact path="/singles/profile/myprofile/friends" render={() => <Friends data={props.userData}/>} />
      </section>
    </main>
  )
}

export default Profile;