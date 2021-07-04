import React, {useState, useEffect} from 'react';
import {withRouter, NavLink, Route} from 'react-router-dom';

import { HiUserAdd } from 'react-icons/hi';
import { AiFillMessage } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import { FaUserFriends } from 'react-icons/fa';
import { FcApproval } from 'react-icons/fc';

import {firestore} from '../../../firebase';

import Posts from './posts';
import About from './about';
import Friends from './friends';

const Profile = (props) => {

  const [data, setData] = useState(false);
  const [btn, setBtn] = useState(null);
  console.log(data);
  useEffect(() => {
    if(props.match.params.profile === props.user) {
      props.history.replace('/singles/profile/myprofile/posts');
    } else {
      const profileRef = firestore.collection('users').doc(props.match.params.profile);

      profileRef.get()
        .then((doc) => {
          if (doc.exists) {
            setData(doc.data());
            console.log(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((err) => console.log(err))
    }
    
  }, [])

  useEffect(() => {

    const contains = (arr) => {
      for (let el of arr) {
        if (el.uid === props.match.params.profile) {
          return true;
        }
      }
    }

    if (props.myData) {
      
      if (contains(props.myData.friends)) {
        setBtn(friends);
      } else if (contains(props.myData.requested)) {
        setBtn(requested);
      } else if (contains(props.myData.requests)) {
        setBtn(acceptBtn);
      } else {
        setBtn(addFriendBtn);
      }
    }  

  }, [props.myData])

  const addFriend = () => {

    const d = new Date();
    const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
    const day = d.getDay() < 10 ? `0${d.getDay()}` : d.getDay();
    const date = `${d.getFullYear()}.${month}.${day}`;


    const myRef = firestore.collection('users').doc(props.user);
    const friendRef = firestore.collection('users').doc(props.match.params.profile);
    
    myRef.update({
      requested: [...props.myData.requested, {
        uid: props.match.params.profile,
        name: `${data.firstName} ${data.lastName}`,
        dp: data.dpUrl,
        date: date
      }]
    }).then(() => {
      console.log("my Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating my document: ", error);
    });

    friendRef.update({
      requests: [...data.requests, {
        uid: props.user,
        name: `${props.myData.firstName} ${props.myData.lastName}`,
        dp: props.myData.dpUrl,
        date: date
      }]
    }).then(() => {
      console.log("Document friend successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating friend document: ", error);
    });
  }

  const accept = async (uid = props.match.params.profile, dp = data.dpUrl, userName = `${data.firstName} ${data.lastName}`) => {
    console.log('run accept');
    const myRef = firestore.collection('users').doc(props.user);
    const newArrRequests = props.myData.requests.filter(el => {
      return el.uid != uid
    })
    const newArrFriends = [...props.myData.friends, {
      uid: uid,
      dp: dp,
      name: userName
    }]
    
    myRef.update(
      {
        requests: newArrRequests,
        friends: newArrFriends
      }
    ).then(() => console.log("My Document successfully updated!"))
    .catch(err => console.log(err))

    const friendRef = firestore.collection('users').doc(uid);
    const newArrRequested = data.requested.filter(el => {
      return el.uid != props.user
    })
    const newArrFriendsFriend = [...data.friends, {
      uid: props.user,
      dp: props.myData.dpUrl,
      name: `${props.myData.firstName} ${props.myData.lastName}`
    }];
    
    friendRef.update({
      requested: newArrRequested,
      friends: newArrFriendsFriend
    }).then(() => console.log("Friend Document successfully updated!"))
    .catch(err => console.log(err))

  }

  const addFriendBtn = <button onClick={addFriend} className="flex items-center bg-brand text-white text-3xl p-2 rounded-md ml-12 border-2 border-brand hover:bg-white hover:text-brand transition duration-300"><HiUserAdd className="text-4xl mr-3" />Add Friend</button>;

  const friends = <button className="flex items-center bg-blue-200 text-blue-500 text-3xl p-2 rounded-md ml-12 border-2 border-blue-300 cursor-default"><FaUserFriends className="text-4xl mr-3" />Friends</button>

  const requested = <button className="flex items-center bg-gray-200 text-gray-500 text-3xl p-2 rounded-md ml-12 border-2 border-gray-300 cursor-default"><TiTick className="text-4xl mr-3" />Requested</button>

  const acceptBtn = <button onClick={() => accept()} className="flex items-center bg-blue-200 text-blue-500 text-3xl p-2 rounded-md ml-12 border-2 border-blue-300"><FcApproval className="text-4xl mr-3" />Accept</button>

  const message = async () => {
    if (props.myData.chats[`${props.user}${props.match.params.profile}`]) {
      props.history.push(`/singles/message/chatRoom/${props.user}${props.match.params.profile}`);
    } else if (props.myData.chats[`${props.match.params.profile}${props.user}`]) {
      props.history.push(`/singles/message/chatRoom/${props.match.params.profile}${props.user}`);
    } else {
      const myChats = props.myData.chats;
      myChats[`${props.user}${props.match.params.profile}`] = {
        chatId: `${props.user}${props.match.params.profile}`,
        name: `${data.firstName} ${data.lastName}`,
        uid: props.match.params.profile,
        dp: data.dpUrl
      }
      console.log(myChats);

      const myRef = firestore.collection('users').doc(props.user);
      await myRef.update({
        chats: myChats
      }).then(() => console.log('my chats updated'))
        .catch(err => console.log(err))

      
    const friendChats = data.chats;
    friendChats[`${props.user}${props.match.params.profile}`] = {
      chatId: `${props.user}${props.match.params.profile}`,
      name: `${props.myData.firstName} ${props.myData.lastName}`,
      uid: props.user,
      dp: props.myData.dpUrl
    }

    const friendRef = firestore.collection('users').doc(props.match.params.profile);
    await friendRef.update({
      chats: friendChats
    }).then(() => console.log('friend chats updated'))
      .catch(err => console.log(err))

    props.history.push(`/singles/message/chatRoom/${props.user}${props.match.params.profile}`);
    }
  }
  

  const profile = (
    <main >
      <header className="bg-white">
        <img src={data.tmUrl} className="w-full h-96 object-center object-fill" alt="timeline image" />
        <img src={data.dpUrl} className="relative inline w-56 h-56 rounded-full left-1/2 object-center object-cover transform -translate-x-1/2 -translate-y-2/3 border-2" alt="profile picture" />
        <h3 className="text-center text-7xl text-gray-700 -mt-28">{`${data.firstName} ${data.lastName}`}</h3>
        <div className="mt-12 flex">
          {btn}
          <button onClick={message} className="flex items-center bg-brand text-white text-3xl p-2 rounded-md ml-12 border-2 border-brand hover:bg-white hover:text-brand transition duration-30"><AiFillMessage className="text-4xl mr-3" />Message</button>
        </div>
        <p className="pt-12 mx-12 text-xl text-left text-gray-500 pb-8" >{data.intro}</p>
      </header>
      <nav className="text-5xl text-gray-600 mt-12 w-11/12 mx-auto flex justify-between">
        <NavLink to={`/singles/profile/${props.match.params.profile}/posts`} className="profile-nav-link" activeClassName="active-profile-nav-link">Posts</NavLink>
        <NavLink to={`/singles/profile/${props.match.params.profile}/about`} className="profile-nav-link" activeClassName="active-profile-nav-link">About</NavLink>
        <NavLink to={`/singles/profile/${props.match.params.profile}/friends`} className="profile-nav-link" activeClassName="active-profile-nav-link">Friends</NavLink>
      </nav>
      <section>
        <Route exact path={`/singles/profile/${props.match.params.profile}/posts`} render={() => <Posts posts={data.posts}/>} />
        <Route exact path={`/singles/profile/${props.match.params.profile}/about`} render={() => <About data={data}/>} />
        <Route exact path={`/singles/profile/${props.match.params.profile}/friends`} render={() => <Friends data={data}/>} />
      </section>
    </main>
  )

  return (
    <>
    {data ? profile : <h1>Loading...</h1>}
    </>
  )
}

export default withRouter(Profile);