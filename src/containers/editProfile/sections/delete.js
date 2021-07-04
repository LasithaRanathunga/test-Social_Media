import React, {useState, useEffect} from 'react';

import firebase from 'firebase/app';
import {auth, storage, firestore} from '../../../firebase';

import TextInput from '../../../components/formElements/textInput';

const Delete = (props) => {

  const [changed, setChanged] = useState(false);
  const [pass, setPass] = useState('');
  const [conPass, setConPass] = useState('');

  const [conMsg, setConMsg] = useState(null);
  const [authErr, setAuthErr] = useState(null);

  console.log(props.uid);

  useEffect(() => {
    if (pass && conPass) {
      setChanged(true);
    }
  }, [pass, conPass])

  const set = (func, e) => {
    func(e.target.value);
  }

  const update = () => {
    if (pass != conPass) {
      setConMsg(<p className="pass-char text-red-500">password confirmation faild, Try again</p>);
    } else {
      setConMsg(null);

      const user = auth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(props.user.email, pass);

      firestore.collection("users").doc(props.uid).delete()
              .then(() => console.log('user deleted from firestore'))
              .catch(err => console.log(err));

      user.reauthenticateWithCredential(credential)
        .then(() => {
          user.delete().then(() => {
            console.log('User deleted')
            const dpRef = storage.ref().child(`dp/${props.user.dpName}`);
            const tmRef = storage.ref().child(`tm/${props.user.tmName}`);

            dpRef.delete().then(() => {
              console.log('dp deleted');
            }).catch((error) => {
              console.log('dp', error);
            });

            tmRef.delete().then(() => {
              console.log('tm deleted');
            }).catch((error) => {
              console.log('tm', error);
            });

            

          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          // An error happened.
          setAuthErr(<p className="pass-char text-red-500">{error.message}</p>);
        });
    }
  }

  return (
    <>
    <div className="form-card">
          <p className="text-3xl mb-8">Delete Account</p>
          <p className="text-lg">All fields should be filled before change password</p>
          <div className="">
            <form>
            <TextInput type="password" name="passwardNew" label="Passward" value={pass} onChange={(e) => set(setPass, e)}/>
            <TextInput type="password" name="passwardNewCon" label="Confirm Passward" value={conPass} onChange={(e) => set(setConPass, e)}/>
            {conMsg}
            {authErr}
            </form>
          </div>
        </div>
        <button className="bg-brand relative z-10 w-52 h-12 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500 mt-10 btnDis" disabled={changed ? false : true} onClick={update}>Delete Account</button>
      </>
  );
}

export default Delete;