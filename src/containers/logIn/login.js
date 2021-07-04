import React, {useState} from 'react';

import {Link} from 'react-router-dom';

import {auth} from '../../firebase';

import { SiMailDotRu } from 'react-icons/si';
import { RiLockPasswordLine } from 'react-icons/ri';

const LogIn = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const updateEmail = (e) => {
    setEmail(e.target.value);
  }

  const updatePass = (e) => {
    setPass(e.target.value);
  }

  const signIn = (e) => {
    auth.signInWithEmailAndPassword(email, pass)
      .then(cred => {
        console.log(cred);
      })
      .catch(error => {
        console.log(error);
      })
    
    e.preventDefault();
  }

  return (
    <div className="text-center w-full absolute top-2/4 transform -translate-y-2/4">
      <h1 className="font-logo text-9xl text-brand">Singls</h1>
    <form onSubmit={signIn} className="mt-32">
      <div>
        <label htmlFor="email"><SiMailDotRu className="inline text-3xl text-brand -mr-12 z-10 relative"/></label>
        <input type="email" id="email" name="email" placeholder="Enter your email" value={email} 
        onChange={updateEmail} className="h-16 pl-16 sm:w-2/4 w-11/12 rounded-lg rounded-b-none bg-white border-2 border-gray-300 border-b  focus:outline-none focus:ring-brand focus:border-brand focus:z-10 focus:border-b-2 text-2xl"/>
      </div>
      <div>
        <label htmlFor="pass"><RiLockPasswordLine className="inline text-3xl text-brand  -mr-12 z-10 relative"/></label>
        <input type="password" id="pass" name="pass" placeholder="Enter your password" value={pass} onChange={updatePass} className="h-16 pl-16 sm:w-2/4 w-11/12 rounded-lg rounded-t-none bg-white border-2 border-gray-300 border-t focus:outline-none focus:ring-brand focus:border-brand focus:z-10 focus:border-t-2 text-2xl"/>
      </div>
      <input type="submit" value="Log In" className="mt-8 w-11/12 sm:w-64 bg-brand h-14 text-3xl text-white rounded-full cursor-pointer border-2 border-brand hover:bg-white hover:text-brand transition-all duration-500"/>
    </form>
    {/* <a href="/singles/createaccount" className="block mt-9 text-brand text-2xl underline">I Don't Have an Account, Create One</a> */}
    <Link to="/singles/creataccount" className="block mt-9 text-brand text-2xl underline">I Don't Have an Account, Create One</Link>
    </div>
  )
}

export default LogIn;