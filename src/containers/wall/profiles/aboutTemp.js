import React from 'react';

const Temp = (props) => {
  return (
    <div className="mb-12">
      <div className="flex items-center">
        <props.icon className="sm:text-5xl text-4xl sm:ml-12 ml-4" />
        <span className="ml-5 text-2xl">{props.msg}</span>
      </div>
      {props.moreInfo && <div className="ml-28 sm:text-2xl text-xl text-gray-400">{props.moreInfo}</div>}
    </div>
  )
}

export default Temp;