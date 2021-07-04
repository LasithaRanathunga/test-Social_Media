import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import {firestore} from '../../firebase';

const Requests = (props) => {

  const [data, setData] = useState(false);
  const [html, setHtml] = useState(<h1>Loading...</h1>);

  useEffect(() => {
    if (props.data) {
    console.log(props.data.requests);
    setData(props.data.requests);
    }
  }, [props.data])

  useEffect(() => {
    if (data === false) {
      setHtml(<h1>Loading...</h1>);
    } else if (data.length === 0) {
      setHtml(<div>
        <p className="sm:text-5xl text-4xl font-light text-gray-500 border-2 border-gray-200 rounded-md p-8 bg-gray-100">No requests to show</p>
      </div>)
    } else if (data.length > 0) {
      const requestsList = data.map(request => {
          return (
            <div key={request.uid} className="flex items-center justify-between mb-8">
              <Link to={`/singles/profile/${request.uid}/posts`}>
              <div className="flex items-center" >
                <img src={request.dp} className="w-20 h-20 rounded-full object-center object-cover" />
                <div className="ml-6">
                  <div className="text-gray-600 text-2xl font-bold" >{request.name}</div>
                  <div className="text-gray-400">{`Posted: ${request.date}`}</div>
                </div>
              </div> 
              </Link>
              <div>
                <button onClick={() => accept(request.uid, request.dp, request.name)} className="bg-success text-white border-2 border-success text-3xl py-1 px-6 rounded-full mr-10 hover:bg-white hover:text-success transition-all duration-200">Accept</button>
                <button onClick={() => dlt(request.uid)} className="bg-danger text-white border-2 border-danger text-3xl py-1 px-6 rounded-full mr-10 hover:bg-white hover:text-danger transition-all duration-200">Delete</button>
              </div>
            </div>   
          )
        })
      
      setHtml(requestsList);
    } 
  }, [data])

  const accept = async (uid, dp, userName) => {
    console.log('run accept');
    const myRef = firestore.collection('users').doc(props.myid);
    const newArrRequests = props.data.requests.filter(el => {
      return el.uid != uid
    })
    const newArrFriends = [...props.data.friends, {
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
    const friendData = await friendRef.get();
    const newArrRequested = friendData.data().requested.filter(el => {
      return el.uid != props.myid
    })
    const newArrFriendsFriend = [...friendData.data().friends, {
      uid: props.myid,
      dp: props.data.dpUrl,
      name: `${props.data.firstName} ${props.data.lastName}`
    }];
    friendRef.update({
      requested: newArrRequested,
      friends: newArrFriendsFriend
    }).then(() => console.log("Friend Document successfully updated!"))
    .catch(err => console.log(err))

  }

  const dlt = async (uid) => {
    console.log('run delete', uid);
    const myRef = firestore.collection('users').doc(props.myid);
    const newArrRequests = props.data.requests.filter(el => {
      return el.uid != uid
    })
    myRef.update(
      {
        requests: newArrRequests
      }
    ).then(() => console.log("My Document successfully updated!"))
    .catch(err => console.log(err))

    const friendRef = firestore.collection('users').doc(uid);
    const friendData = await friendRef.get();
    const newArrRequested = friendData.data().requested.filter(el => {
      return el.uid != props. myid
    })
    friendRef.update({
      requested: newArrRequested
    }
    ).then(() => console.log("Friend Document successfully updated!"))
    .catch(err => console.log(err))
  }

  

  return (
    <div className="bg-white p-10 sm:mx-32 mx-2">
      <h2 className="text-brand text-5xl text-center mt-3 mb-10 font-bold" >Requests</h2>
      <div>
      {html}
      </div>
    </div>
  )
}

export default Requests;