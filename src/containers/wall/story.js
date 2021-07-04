import React from 'react';

const Story = (props) => {
  return (
    <section className="bg-white flex py-3 px-9 mb-12 items-center justify-center">
            <img src={props.userData && props.userData.dpUrl} className="sm:w-16 sm:h-16 w-22 h-12 rounded-full object-center object-cover sm:block hidden"/>
            <form className="w-11/12" onSubmit={props.addStory}>
              <input type="text" placeholder="Say something..."  onChange={props.setStoryState} className="w-10/12 ml-6 border-2 h-12 rounded-full pl-6 text-2xl text-gray-600 outline-none focus:border-brand bg-gray-50" />
              <input type="submit" value="SHARE"  className="bg-brand text-white sm:h-12 sm:w-32 sm:ml-4 border-2 border-brand rounded-full sm:text-2xl hover:bg-white hover:text-brand cursor-pointer transition-all duration-300 px-2 py-1 text-md ml-2"/>
            </form>
          </section>
  )
}

export default Story;