import React, {useState, useEffect} from 'react';

import {storage, firestore} from '../../../firebase';

import url from '../../../assets/default.png';
import { MdPhotoSizeSelectLarge } from 'react-icons/md';

const Picture = (props) => {

  const [newDp, setNewDp] = useState(false);
  const [newTm, setNewTm] = useState(false);

  const [dp, setDp] = useState('');
  const [dpUrl, setDpUrl] = useState('');

  const [tm, setTm] = useState('');
  const [tmUrl, setTmUrl] = useState('');

  useEffect(() => {
    setDpUrl(props.user.dpUrl);
    setTmUrl(props.user.tmUrl);
  }, [])

  const onPicChange = (e, fileFunc, urlFunc) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        fileFunc(file);
        urlFunc(reader.result);
      }

      reader.readAsDataURL(file);
    }
    
    e.preventDefault();
  }

  const onDpChange = (e) => {
    onPicChange(e, setDp, setDpUrl);
    setNewDp(true);
  }

  const onTmChange = (e) => {
    onPicChange(e, setTm, setTmUrl);
    setNewTm(true);
  }

  const update = async (e) => {
    console.log('run');
    const obj = {};

    if (dp) {
      const dpRef = storage.ref().child(`dp/${dp.name}`);
      await dpRef.put(dp);
      obj.dpUrl = await dpRef.getDownloadURL();
      obj.dpName = dp.name;

      const deleteImg = storage.ref().child(`dp/${props.user.dpName}`);
      deleteImg.delete()
        .then(() => console.log('deleted'))
        .catch(() => console.log("something wrong with image deletion"))
    }

    if (tm) {
      const tmRef = storage.ref().child(`tm/${tm.name}`);
      await tmRef.put(tm);
      obj.tmUrl = await tmRef.getDownloadURL();
      obj.tmName = tm.name;

      const deleteImg = storage.ref().child(`tm/${props.user.tmName}`);
      deleteImg.delete()
        .then(() => console.log('deleted'))
        .catch(() => console.log("something wrong with image deletion"))
    }

    props.update(obj);
    e.preventDefault();
  }

  const noBg = <div className="h-52 w-72 border-2 border-gray-300 p-5">
  <div className="w-full h-full border-2 border-gray-300 border-dashed flex justify-center items-center">
    <MdPhotoSizeSelectLarge className="text-6xl text-gray-400" />
  </div>
</div>;

  return (
    <div>
      <div className="form-card">
            <p className="text-3xl">Upload Profile Picture</p>
            <div className="flex mt-8">
              <img src={dpUrl ? dpUrl : url} alt="profile picture" className="sm:w-40 sm:h-40 w-24 h-24 rounded-full object-center object-cover"/>
              <label htmlFor="tm" className="bg-brand relative z-10 sm:w-52 sm:h-12 sm:p-0 p-2 sm:ml-14 ml-8 rounded-md sm:text-2xl text-xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500">Choose New File</label>
              <p className="my-auto sm:text-2xl text-xl ml-3 overflow-hidden w-96">{dp ? dp.name : 'No New File Has Choosen'}</p>
              <input type='file' id='tm' name='tm' accept="image/*" className="hidden" onChange={onDpChange}/>
            </div>
          </div>
      <div className="form-card">
      <p className="text-3xl">Upload Timeline Picture</p>
      <div className="flex sm:flex-row flex-col mt-8">
        {tmUrl ? <img src={tmUrl} alt="timeline picture" className="sm:h-52 h-72"/> : noBg}
        {/* <div className="h-52 w-72 border-2 border-gray-300 p-5">
          <div className="w-full h-full border-2 border-gray-300 border-dashed flex justify-center items-center">
            <MdPhotoSizeSelectLarge className="text-6xl text-gray-400" />
          </div> */}
        <div className="flex sm:mt-0 mt-6">
          <label htmlFor="dp" className="bg-brand relative z-10 sm:w-52 sm:h-12 sm:ml-14 rounded-md sm:text-2xl text-xl sm:p-0 p-2  text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500">Choose New File</label>
          <p className="my-auto text-2xl ml-3 overflow-hidden w-96">{tm ? tm.name : 'No New File Has Choosen'}</p>
          <input type='file' id='dp' name='dp' accept="image/*" className="hidden" onChange={onTmChange} />
        </div>
      </div>
    </div>
    <button className="bg-brand relative z-10 w-52 h-12 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500 mt-10 btnDis" disabled={dp || tm ? false : true} onClick={update}>Upload</button>
  </div>
  )
}

export default Picture;