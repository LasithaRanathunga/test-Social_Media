import React from 'react';

const input = (props) => {
  return (
    <div className="mt-5 sm:w-2/4">
            <label htmlFor={props.name} className="text-2xl block">{props.label}</label>
            <input type={props.type} id={props.name} name={props.name} value={props.value} required onChange={props.onChange} className="mt-3 border border-gray-300 h-12 sm:w-4/5 w-11/12 rounded-lg shadow-sm text-2xl pl-3 outline-none focus:ring-1 focus:ring-brand focus:border-0"/>
          </div>
  );
}

export default input;