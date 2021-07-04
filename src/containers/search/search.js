import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import { BiSearchAlt } from 'react-icons/bi';
import { RiArrowUpSLine } from 'react-icons/ri';

import { firestore } from '../../firebase';

const Search = (props) => {

  const [name, setName] = useState('');
  const [firstResultList, setFirstResultList] = useState(null);
  const [lastResultList, setLastResultList] = useState(null);
  const [showList, setShowList] = useState(false)

  
  const closeList = () => {
    setShowList(false);
  }

  const search = () => {
    if (name) {
      firestore.collection('users').where("firstName", "==", name).limit(10).get()
      .then((querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            arr.push(
              <Link onClick={closeList} key={doc.id} to={`/singles/profile/${doc.id}/posts`} className="hover:bg-gray-100 flex items-center pl-10 pr-4 py-3 w-full" >
                <img src={doc.data().dpUrl} className="w-16 h-16 rounded-full object-center object-cover" />
                <div className="ml-6">
                  <div className="text-gray-600 text-2xl font-bold" >{`${doc.data().firstName} ${doc.data().lastName}`}</div>
                </div>
              </Link>
            );

        });
        setFirstResultList(arr);
        setShowList(true);
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


      firestore.collection('users').where("lastName", "==", name).limit(10).get()
      .then((querySnapshot) => {
        const arr = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            arr.push(
              <Link onClick={closeList} key={doc.id} to={`/singles/profile/${doc.id}/posts`} className="hover:bg-gray-100 flex items-center pl-10 pr-4 py-3 w-full" >
                <img src={doc.data().dpUrl} className="w-16 h-16 rounded-full object-center object-cover" />
                <div className="ml-6">
                  <div className="text-gray-600 text-2xl font-bold" >{`${doc.data().firstName} ${doc.data().lastName}`}</div>
                </div>
              </Link>
            );

        });
        setLastResultList(arr);
        setShowList(true);
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

      }
  }

  const nameSet = (e) => {
    setName(e.target.value);
  }

  return (
    <div className="w-full flex flex-col relative">
      <div className="w-full flex items-center">
        <input onChange={nameSet} type="text" placeholder="Search Friends" className=" block sm:mb-0 mb-6 h-11 w-full border-2 pl-8 text-2xl text-gray-600 rounded-full outline-none focus:border-brand transition-all duration-300" value={name}/>
        <BiSearchAlt onClick={search} className="text-4xl sm:mb-0 mb-6 sm:mx-0 mx-3 text-gray-600 -ml-14 cursor-pointer hover:text-gray-800 hover:text-5xl transition-all duration-300 border-l-2 pl-2" />
      </div>
      <div className={`absolute top-0 bg-white w-full mt-12 sm:border border-2 sm:border-gray-300 border-brand ${showList ? 'block' : 'hidden'}`}>
        {firstResultList}
        {lastResultList}
        <RiArrowUpSLine onClick={closeList} className="mx-auto text-3xl border-t-2 w-full bg-gray-200 cursor-pointer hover:bg-gray-300" />
      </div>
    </div>
  )
}

export default Search;