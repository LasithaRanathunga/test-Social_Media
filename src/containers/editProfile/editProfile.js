import React, {useState, useEffect} from 'react';
import {NavLink, Link, Route, Switch} from 'react-router-dom';

import {firestore} from '../../firebase';

import { AiOutlineArrowLeft } from 'react-icons/ai';

import Navigation from '../wall/nav';
import EditPicture from './sections/picture';
import EditBasic from './sections/basic';
import EditEdu from './sections/edu';
import EditIntro from './sections/intro';
import EditPass from './sections/pass';
import Delete from './sections/delete';

const Edit = (props) => {

  const [userData, setUserData] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // if (props.user) {
    //   const docRef = firestore.collection('users').doc(props.user);

    // docRef.get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       setUserData(doc.data());
    //       console.log(doc.data());
    //     } else {
    //       console.log('there is no such doc');
    //     }
    //   })
    //   .catch((error) => console.log(error))
    // }
    setUserData(props.userData);
  }, [props.userData]);

  const update = (obj) => {
    const userRef = firestore.collection('users').doc(props.user);

    userRef.update({
      ...obj
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }

  const sideDrower = () => {
    setShow(!show);
  }

  const hideDrower = () => {
    setShow(false);
  }

  return (
    <>
    <AiOutlineArrowLeft onClick={sideDrower} className={`fixed z-50 top-5 left-0 text-gray-700 sm:hidden text-5xl border p-2 rounded-full bg-gray-200 ml-6 cursor-pointer transition-all duration-500 transform ${!show && 'rotate-180'} `} />
    <div className="sm:block hidden">
      <Navigation userData={userData} />
    </div>
    <div className="max-w-form mx-auto text-gray-600">
      <h1 className="text-brand text-7xl font-logo mt-8 ml-5 sm:ml-0 sm:block hidden">Singls</h1>
      <h3 className="text-brand text-4xl text-center font-bold sm:mt-2 mt-8">Edit Profile</h3>
      <div className="sm:w-4/5 w-full h-screen sm:mx-auto mx-2 mt-20 sm:flex justify-between">
        <div className="sm:flex hidden flex-col justify-between bg-white sm:w-1/4 w-full p-6 sm:h-2/4">
          <NavLink to="/singles/edit-profile/change-picture" activeStyle={{color: "#FA501A"}} className="eddit-linck">Change profile picture</NavLink>
          <NavLink to="/singles/edit-profile/change-basic-info" activeStyle={{color: "#FA501A"}}  className="eddit-linck">Change basic info</NavLink>
          <NavLink to="/singles/edit-profile/change-edu-car" activeStyle={{color: "#FA501A"}} className="eddit-linck">Change education and career info</NavLink>
          <NavLink to="/singles/edit-profile/change-intro" activeStyle={{color: "#FA501A"}} className="eddit-linck">Change your intoduction</NavLink>
          <NavLink to="/singles/edit-profile/change-pass" activeStyle={{color: "#FA501A"}} className="eddit-linck">Change password</NavLink>
          <NavLink to="/singles/edit-profile/delete" activeStyle={{color: "#FA501A"}} className="eddit-linck">Delete Account</NavLink>
        </div>
        <div className={`sm:hidden bg-white w-full h-screen z-30 fixed top-0 left-0 transition-all transform ${!show && '-translate-x-full'}`}>
          <div className="block sm:hidden shadow-md pb-6 mb-5 pt-8">
          <h1 className="text-brand text-5xl font-logo text-center block sm:hidden">Singls</h1>
            <Link to="/singles" className="bg-brand rounded-full text-2xl text-white py-1 w-11/12 block mx-auto text-center mt-6">Home</Link>
            <Link to="/singles/message/chatRoom" className="bg-brand rounded-full text-2xl text-white py-1 w-11/12 block mx-auto text-center mt-3">Message</Link>
            <Link to="/singles/requests" className="bg-brand rounded-full text-2xl text-white py-1 my-2 w-11/12 block mx-auto text-center mt-3">Requests</Link>
           </div>
           <div className="flex flex-col sm:hidden">
          <NavLink onClick={hideDrower} to="/singles/edit-profile/change-picture" activeClassName="smEdit-active" className="smedit-link">Change profile picture</NavLink>
          <NavLink onClick={hideDrower} to="/singles/edit-profile/change-basic-info" activeClassName="smEdit-active"  className="smedit-link">Change basic info</NavLink>
          <NavLink onClick={hideDrower} to="/singles/edit-profile/change-edu-car" activeClassName="smEdit-active" className="smedit-link">Change education and career info</NavLink>
          <NavLink onClick={hideDrower} to="/singles/edit-profile/change-intro" activeClassName="smEdit-active" className="smedit-link">Change your intoduction</NavLink>
          <NavLink onClick={hideDrower} to="/singles/edit-profile/change-pass" activeClassName="smEdit-active" className="smedit-link">Change password</NavLink>
          <NavLink onClick={hideDrower} to="/singles/edit-profile/delete" activeClassName="smEdit-active" className="smedit-link">Delete Account</NavLink>
          </div>
        </div>
        <div className="sm:w-2/3 w-full">
          {userData ? (<Switch>
            <Route exact path='/singles/edit-profile/change-picture' render={() => (<EditPicture user={userData} update={update} />)} />
            <Route exact path='/singles/edit-profile/change-basic-info' render={() => (<EditBasic user={userData} update={update} />)} />
            <Route exact path='/singles/edit-profile/change-edu-car' render={() => (<EditEdu user={userData} update={update} />)} />
            <Route exact path='/singles/edit-profile/change-intro' render={() => (<EditIntro user={userData} update={update} />)} />
            <Route exact path='/singles/edit-profile/change-pass' render={() => (<EditPass user={userData} />)} />
            <Route exact path='/singles/edit-profile/delete' render={() => (<Delete user={userData} uid={props.user} />)} />
          </Switch>) : <h1>Loading...</h1>}
        </div>
      </div>
    </div>
    </>
  )
}

export default Edit;