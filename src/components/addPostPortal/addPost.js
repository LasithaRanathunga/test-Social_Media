import React from 'react';
import ReactDOM from 'react-dom';

import { MdPhotoSizeSelectLarge } from 'react-icons/md';
import {AiOutlineCloseCircle} from 'react-icons/ai';

const AddPost = (props) => {
  const noBg = <div className="h-52 w-72 border-2 border-gray-300 p-5">
  <div className="w-full h-full border-2 border-gray-300 border-dashed flex justify-center items-center">
    <MdPhotoSizeSelectLarge className="text-6xl text-gray-400" />
  </div>
</div>;

  return ReactDOM.createPortal(
    <div className="w-full h-screen overflow-auto fixed top-0 left-0 z-50 popup-bg flex justify-center items-center">
      <div className="bg-white opacity-100 sm:w-2/4 w-full p-5 sm:border-2 sm:rounded-xl pt-16 sm:pt-0">
        <AiOutlineCloseCircle onClick={props.close} className="relative ml-auto z-30 text-4xl text-gray-500 cursor-pointer mt-8 sm:mt-4" />
        <h2 className="text-4xl text-brand font-bold block">Add Post</h2>
        <form className="mx-auto sm:w-11/12 mt-16" onSubmit={props.addPost}>
          <label htmlFor="about" className="text-3xl text-gray-500 block mt-6 mb-2" >Say something about this post...</label>
          <textarea id="about" onChange={props.setAbout} value={props.about} className="w-full h-64 text-gray-700 text-2xl p-3 border rounded-lg border-gray-400 outline-none focus:border-brand" />
          <h4 htmlFor="postPhoto" className="text-3xl text-gray-500 block mt-6 mb-2">Photo</h4>
          <div className="sm:flex block mt-7">
            {props.url ? <img src={props.url} className="h-52 object-center object-cover"/> : noBg}
            <div className="flex items-center mt-7 sm:mt-0">
            <label htmlFor="postPhoto" className="bg-brand mt-0 relative z-10 w-36 h-12 sm:ml-14 rounded-md text-2xl text-center text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500">Choose File</label>
            <p className="text-2xl ml-3">{props.file ? props.file.name : 'No file has choosen'}</p>
            </div>
            <input type='file' id='postPhoto' name='postPhoto' accept="image/*" onChange={props.setPhoto} className="hidden" />
          </div>
          <label htmlFor="caption" className="text-3xl text-gray-500 block mt-9 mb-2" >Caption</label>
          <input id="caption" type="text" onChange={props.setCaption} className="w-full text-gray-700 text-2xl p-3 border rounded-lg border-gray-400 outline-none focus:border-brand" />
          <input type="submit" value="Upload Post" disabled={props.about ? false : true} className="bg-brand btnDis mb-6 relative z-10 sm:w-36 w-11/12 mx-auto h-12 mt-20 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500"/>
        </form>
      </div>
    </div>
  , document.getElementById("portal-root"))
}

export default AddPost;