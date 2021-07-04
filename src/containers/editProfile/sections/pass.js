import React, {useState, useEffect} from 'react';

import firebase from 'firebase/app';
import {auth} from '../../../firebase';

import TextInput from '../../../components/formElements/textInput';

const Email = (props) => {

  const [changed, setChanged] = useState(false);
  const [pass, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [conNewPass, setConNewPass] = useState('');

  const [passMsg, setPassMsg] = useState(null);
  const [conMsg, setConMsg] = useState(null);
  const [authErr, setAuthErr] = useState(null);

  useEffect(() => {
    if(newPass) {
      if (newPass.length < 6) {
        setPassMsg(<p className="pass-char text-red-500">password should contain at least 6 characters</p>);
      } else if (newPass.length >= 6) {
        setPassMsg(<p className="pass-char text-green-500">password strong enough</p>);
      }
    }
  }, [newPass])

  useEffect(() => {
    if (pass && newPass && conNewPass) {
      setChanged(true);
    }
  }, [pass, newPass, conNewPass])

  const set = (func, e) => {
    func(e.target.value);
  }

  const update = () => {
    if (newPass != conNewPass) {
      setConMsg(<p className="pass-char text-red-500">password confirmation faild, Try again</p>);
    } else {
      setConMsg(null);

      const user = auth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(props.user.email, pass);

      user.reauthenticateWithCredential(credential)
        .then(() => {
          user.updatePassword(newPass).then(() => {
            console.log('Update password successful')
          }).catch(function(error) {
            console.log(error);
          });
        }).catch((error) => {
          // An error happened.
          setAuthErr(<p className="pass-char text-red-500">{error}</p>);
        });
    }
  }

  return (
    <>
    <div className="form-card">
          <p className="text-3xl mb-8">Passward</p>
          <p className="text-lg">All fields should be filled before change password</p>
          <div className="">
            <TextInput type="password" name="passward" label="Passward" value={pass} onChange={(e) => set(setPass, e)}/>
            <TextInput type="password" name="passwardNew" label="New Passward" value={newPass} onChange={(e) => set(setNewPass, e)}/>
            {passMsg}
            <TextInput type="password" name="passwardNewCon" label="Confirm new Passward" value={conNewPass} onChange={(e) => set(setConNewPass, e)}/>
            {conMsg}
            {authErr}
          </div>
        </div>
        <button className="bg-brand relative z-10 w-52 h-12 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500 mt-10 btnDis" disabled={changed ? false : true} onClick={update}>Change Password</button>
      </>
  );
}

export default Email;