import React from 'react';

const Profile = (props) => {
  return (
    <section className="w-full bg-white pb-12">
            <img src={props.userData && props.userData.tmUrl} className="h-56 w-full object-cover object-center"/>
            <img src={props.userData && props.userData.dpUrl} className="w-36 h-36 rounded-full object-center object-cover relative left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"/>
            <h3 className="text-3xl font-bold text-gray-600 text-center -mt-12">{props.userData ? `${props.userData.firstName} ${props.userData.lastName}` : ' '}</h3>
            <p className="text-2xl w-11/12 mx-auto text-center text-gray-500 mt-9">{props.userData && props.userData.intro}</p>
          </section>

  );
}

export default Profile;