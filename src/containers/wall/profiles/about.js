import React, {useState} from 'react';

import { FaGraduationCap } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import { FaSchool } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import { FaBirthdayCake } from 'react-icons/fa';

import AboutTeml from './aboutTemp';

const About = (props) => {

  const year = new Date().getFullYear();
  const age = year - +props.data.bDay.slice(0,4);

  const overview = (
    <div className="w-2/3">
        <AboutTeml icon={FaBirthdayCake} msg={`Age: ${age}`} />
        <AboutTeml icon={FaGraduationCap} msg={`Went to ${props.data.uni}`} />
        <AboutTeml icon={ImLocation} msg={`From ${props.data.city}, ${props.data.country}`} />
      </div>
  )

  const edu = (
    <div className="w-2/3">
      <div>
        <h5 className="ml-8 mb-6 text-3xl font-medium text-gray-600">Work</h5>
        <AboutTeml icon={BsFillBriefcaseFill} msg={`Works at no jobs to show`} />
      </div>
      <div>
        <h5 className="ml-8 mb-6 text-3xl font-medium text-gray-600">University</h5>
        <AboutTeml icon={FaGraduationCap} msg={`${props.data.uni}`} />
      </div>
      <div>
        <h5 className="ml-8 mb-6 text-3xl font-medium text-gray-600">School / High School</h5>
        <AboutTeml icon={FaSchool} msg={`no schols to show`} />
      </div>
    </div>
  );

  const basic = (
    <div className="w-2/3">
      <h5 className="ml-8 mb-6 text-3xl font-medium text-gray-600">Basic info</h5>
        <AboutTeml icon={GoPerson} msg={props.data.gender} moreInfo="Gender"/>
        <AboutTeml icon={FaBirthdayCake} msg={props.data.bDay} moreInfo="Birth Day"/>
    </div>
  );

  const [aboutWhat, setAboutWhat] = useState(overview);
  const [selected, setSelected] = useState('overview');

  const setWhat = (what) => {
    switch(what) {
      case 'overview':
        setAboutWhat(overview);
        setSelected('overview');
        break;
      case 'edu':
        setAboutWhat(edu);
        setSelected('edu');
        break;
      case 'basic':
        setAboutWhat(basic);
        setSelected('basic');
        break;
    }
  }

  return (
    <div className="bg-white rounded-xl p-5 flex mt-6 text-gray-500 mb-10">
      {/* <span className="about-span">{`Age: ${age}`}</span>
      <span className="about-span">{`From: ${props.data.city}, ${props.data.country}`}</span>
      <span className="about-span">{`Gender: ${props.data.gender}`}</span>
      <span className="about-span">{`Gender: ${props.data.gender}`}</span>
      <span className="about-span">{`Studyed at: ${props.data.uni}`}</span>
      <span className="about-span">{`Study field: ${props.data.field}`}</span>
      <span className="about-span">{`highest educational qualification: ${props.data.edu}`}</span>
      <span className="about-span">{`current occupation: props.data.job`}</span> */}
      <nav className="w-1/3 border-r">
        <ul>
          <li className={selected === 'overview' ? "about-nav-item-selected" : "about-nav-item"} onClick={() => setWhat('overview')}>Overview</li>
          <li className={selected === 'edu' ? "about-nav-item-selected" : "about-nav-item"} onClick={() => setWhat('edu')}>Work and Education</li>
          <li className={selected === 'basic' ? "about-nav-item-selected" : "about-nav-item"} onClick={() => setWhat('basic')}>Basic Info</li>
        </ul>
      </nav>
      {aboutWhat}
    </div>
  )
}

export default About;