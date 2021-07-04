import React, {useState, useEffect} from 'react';
import {Switch, Route, NavLink, Link} from 'react-router-dom';

import firebase from "firebase/app";
import {firestore, storage} from '../../firebase';

import { AiFillCloseCircle } from 'react-icons/ai';

import Navigation from './nav';
import AddPost from '../../components/addPostPortal/addPost';
import Profile from '../../components/wallElements/profile';
import Friends from '../../components/wallElements/friends';
import Contact from '../../components/wallElements/contacts';
import WallPosts from './wallPosts';
import Story from './story';
import MyProfile from './profiles/userProfile';
import UsersProfiles from './profiles/usersProfiles';
import Requests from './requests';
import Search from '../search/search';

const Wall = (props) => {

  const [userData, setUserData] = useState(null);
  const [story, setStory] = useState("");
  const [caption, setCaption] = useState("");
  const [addPostPopup, setAddPostPopup] = useState(false);

  // const [aboutPost, setAboutPost] = useState('');
  const [photo, setPhoto] = useState(null);
  const [file, setFile] = useState(null);

  const [showDrawer, setShowDrawer] = useState(false);
  const [reqNoti, setReqNoti] = useState(null);

  useEffect(() => {
    if (props.userData) {
      if (props.userData.requests.length > 0) {
        setReqNoti(<span className="sm_notificationDot"></span>);
      }
    }
  }, [props.userData])
  

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

  const addStory = (e) => {
    const d = new Date();
    const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
    const day = d.getDay() < 10 ? `0${d.getDay()}` : d.getDay();
    const date = `${d.getFullYear()}.${month}.${day}`;

    const storyObj = {
      uid: props.user,
      dp: userData.dpUrl,
      name: `${userData.firstName} ${userData.lastName}`,
      date: date,
      content: story,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }

    firestore.collection("posts").add(storyObj).then(() => {
      console.log('success');
      firestore.collection("users").doc(props.user).update({
        posts: [...userData.posts, 
          { uid: props.user,
            dp: userData.dpUrl,
            name: `${userData.firstName} ${userData.lastName}`,
            date: date,
            content: story,
            timestamp: new Date()}
        ]
      })
      .then(() => {
        console.log('firestore user update success')
        setStory('');
            setCaption('');
            setPhoto(null);
            setFile(null);
            setAddPostPopup(false);
      })
      .then((err) => console.log(err))
    }).catch((error) => console.log(error))

    setStory("");
    e.preventDefault();
  }

  const addPost = (e) => {
    if (photo) {
      const d = new Date();
      const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
      const day = d.getDay() < 10 ? `0${d.getDay()}` : d.getDay();
      const date = `${d.getFullYear()}.${month}.${day}`;
      
      const imgRef = storage.ref().child(`postImgs/${file.name}`);
      imgRef.put(file)
        .then(async (snap) => {
          const imgUrl = await imgRef.getDownloadURL();
          const postObj = {
            uid: props.user,
            dp: userData.dpUrl,
            name: `${userData.firstName} ${userData.lastName}`,
            date: date,
            content: story,
            img: imgUrl,
            caption: caption,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }
          firestore.collection("posts").add(postObj).then(() => {
            firestore.collection("users").doc(props.user).update({
              posts: [...userData.posts,
                {
                uid: props.user,
                dp: userData.dpUrl,
                name: `${userData.firstName} ${userData.lastName}`,
                date: date,
                content: story,
                img: imgUrl,
                caption: caption,
                timestamp: new Date()}
                ]
            })
          .then(() => {
            console.log('firestore user update success')
            setStory('');
            setCaption('');
            setPhoto(null);
            setFile(null);
            setAddPostPopup(false);
          })
          .catch(err => console.log(err))
          }).catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    } else {
      addStory();
    }
    e.preventDefault();
  }

  const setStoryState = (e) => {
    setStory(e.target.value);
    e.preventDefault();
  }

  // const setAbout = (e) => {
  //   setAboutPost(e.target.value);
  //   e.preventDefault();
  // }

  const closePopup = (e) => {
    setAddPostPopup(false);
    e.preventDefault();
  }

  const getPhoto = (e) => {
    const getFile = e.target.files[0];
    console.log(getFile);

    if (getFile) {
      const reader = new FileReader();

      reader.onload = () => {
        setPhoto(reader.result);
        setFile(getFile);
      }

      reader.readAsDataURL(getFile);
    }

    e.preventDefault();
  }

  const yourProfile = (e) => {
    props.history.push('/singles/profile/myprofile/posts')
    e.preventDefault();
  }

  const postCaption = (e) => {
    setCaption(e.target.value);
  }

  const sliderClose = () => {
    setShowDrawer(false);
  }

  const sliderOpen = () => {
    setShowDrawer(true);
  }
  console.log(showDrawer);
  return (
    // <div className={`${addPostPopup ? 'overflow-hidden' : ""}`}>
    <div>
      <Route path="/" render={() => <Navigation userData={userData} sliderOpen={sliderOpen} />} />
      
      <div className="max-w-wall mx-auto pt-16 sm:flex justify-between">
        <div className="w-1/5 h-screen overflow-auto mb-10 sticky top sm:block hidden">
          <Profile userData={userData} />
          <button className="pro-btn mt-16" onClick={yourProfile}>Your Profile</button>
          <button className="pro-btn mt-6" onClick={() => props.history.push('/singles/edit-profile/change-picture')}>Edit Profile</button>
          <button className="pro-btn mt-6" onClick={() => setAddPostPopup(true)}>Add Post</button>

          {userData && <Friends userData={userData} />}
        </div>
        <div className={`bg-white text-center w-full h-screen overflow-auto mb-10 z-50 fixed top-0 left-0 sm:hidden transition-all duration-300 transform ${!showDrawer && '-translate-x-full'}`}>
          <div className="flex justify-between">
            <ul className="text-left my-6">
            <li><Link onClick={sliderClose} className="inline-block text-2xl text-brand font-bold ml-8 mb-3" to="/singles">Home</Link></li>
              <li><Link className="inline-block text-2xl text-brand font-bold ml-8 mb-3" to="/singles/message/chatRoom" onClick={sliderClose}  >Message</Link></li>
              <li><Link onClick={sliderClose} className="inline-block text-2xl text-brand font-bold ml-8 mb-3" to="/singles/requests" >Requests</Link>
              {reqNoti}</li>
            </ul>
            <AiFillCloseCircle onClick={sliderClose} className=" text-5xl mr-10 mt-6" />
          </div>
          <Profile userData={userData} />
          <button className="pro-btn mt-16 w-11/12" onClick={(e) => {
            yourProfile(e);
            sliderClose();
          }}>Your Profile</button>
          <button className="pro-btn mt-6 w-11/12" onClick={() => {
            props.history.push('/singles/edit-profile/change-picture');
            sliderClose();
            }}>Edit Profile</button>
          <button className="pro-btn mt-6 w-11/12" onClick={() => {
            setAddPostPopup(true);
            sliderClose();
            }}>Add Post</button>

          {userData && <Friends userData={userData} />}
        </div>
        <section className="sm:w-7/12">
          {/* <section className="bg-white flex py-3 px-9 mb-12 items-center justify-center">
            <img src={userData && userData.dpUrl} className="w-16 h-16 rounded-full object-center object-cover"/>
            <form className="w-11/12" onSubmit={addStory}>
              <input type="text" placeholder="Say something..."  onChange={setStoryState} className="w-10/12 ml-6 border-2 h-12 rounded-full pl-6 text-2xl text-gray-600 outline-none focus:border-brand bg-gray-50" />
              <input type="submit" value="SHARE"  className="bg-brand text-white h-12 w-32 ml-4 border-2 border-brand rounded-full text-2xl hover:bg-white hover:text-brand cursor-pointer transition-all duration-300"/>
            </form>
          </section> */}
            <div className="sm:hidden">
              <Search />
            </div>
            <Route exact path="/singles" render={(props) => <Story userData={userData} setStoryState={setStoryState} addStory={addStory} />} />
          <Switch>
            <Route exact path="/singles" component={WallPosts} />
            {userData && <Route exact path="/singles/profile/myprofile/:section" render={() => <MyProfile userData={userData} />} /> }
            <Route exact path="/singles/profile/:profile/:section" render={() => <UsersProfiles user={props.user} myData={userData}/>} />
            <Route exact path="/singles/requests" render={() => <Requests data={userData} myid={props.user} />} />
          </Switch>
          {/* <WallPosts /> */}
        </section>
        {userData && <Contact list={userData.chats}/>}
      </div>
      {addPostPopup && <AddPost setAbout={setStoryState} about={story} close={closePopup} setPhoto={getPhoto} url={photo} file={file} setCaption={postCaption} caption={caption} addPost={addPost}/>}
    </div>
  )
}

export default Wall;