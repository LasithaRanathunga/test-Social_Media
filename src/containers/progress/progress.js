import React from 'react';
import ReactDOM from 'react-dom'

import { AiOutlineCloudUpload } from 'react-icons/ai';

const Progress = (props) => {

  const pres = () => {
    const half = Math.round((props.send/props.total)*100);
    return half;
  }

  return ReactDOM.createPortal(
    <div className="w-full h-screen fixed top-0 left-0 z-50 bg-white opacity-95 flex justify-center items-center">
      <div className="w-full">
        <AiOutlineCloudUpload className="text-brand text-7xl mx-auto" />
        <p className="text-brand text-5xl my-4 text-center">Creating Account</p>
        <div className="flex my-6 justify-center items-center">
          <div className="w-4/5 sm:w-3/6 h-3 p-px border rounded-full border-gray-300">
            <div style={{width: `${pres()}%`, background: '#FA501A', height:'100%', borderRadius: '500px'}}></div>
          </div>
          <p className="ml-6 text-gray-600">{pres()}/100</p>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  )
}

export default Progress;