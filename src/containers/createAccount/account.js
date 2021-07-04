import React, {useState, useEffect} from 'react';
import {storage, firestore, auth} from '../../firebase';

import TextInput from '../../components/formElements/textInput';
import Progress from '../progress/progress';

import { MdPhotoSizeSelectLarge } from 'react-icons/md';

import dp from '../../assets/default.png';

const Account = () => {

  const [url, setUrl] = useState(dp);
  const [fileName, setFileName] = useState("No file has choosen");
  const [file, setFile] = useState('');
  const [dpUrl, setDpUrl] = useState("");

  const [tmUrl, setTmUrl] = useState("");
  const [tmName, setTmName] = useState("No file has choosen");
  const [tm, setTm] = useState('');

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [bDay, setbDay] = useState("");
  const [gender, setGender] = useState("male");

  const [edu, setEdu] = useState("");
  const [field, setField] = useState("");
  const [uni, setUni] = useState("");
  const [job, setJob] = useState("");

  const [intro, setIntro] = useState("");

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");

  const [passMsg, setPassMsg] = useState(null);
  const [send, setSend] = useState(0);
  const [total, setTotal] = useState(0);

  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    if(pass) {
      if (pass.length < 6) {
        setPassMsg(<p className="pass-char text-red-500">password should contain at least 6 characters</p>);
      } else if (pass.length >= 6) {
        setPassMsg(<p className="pass-char text-green-500">password strong enough</p>);
      }
    }
  }, [pass])

  const set = (func, e) => {
    func(e.target.value);
  }

  const refresh = () => {
    setUrl(dp);
    setFileName('No file has choosen');
    setFile('');

    setTmUrl("");
    setTmName("No file has choosen");
    setTm('');

    setFirstName('');
    setLastName('');
    setCountry('');
    setCity('');
    setbDay('');
    setGender('male');

    setEdu('');
    setField('');
    setUni('');
    setJob('');

    setIntro('');

    setEmail('');
    setPass('');
    setConPass('');

    setPassMsg('');
    setSend('');
    setTotal('');

    setShowProgress(false);
  }

  const addUser = (dpUrl, tmUrl) => {
    // firestore.collection("users").add({
    //   dpUrl: dpUrl,
    //   tmUrl: tmUrl,
    //   firstName: firstName,
    //   lastname: lastName,
    //   country: country,
    //   city: city,
    //   bDay: bDay,
    //   gender: gender,
    //   edu:edu,
    //   feield: feield,
    //   uni:uni,
    //   job:job,
    //   email: email
    // }).then(() => {
    //   auth.createUserWithEmailAndPassword(email, pass)
    //   .then(cred => {
    //     console.log(cred.user.uid);
    //     setShowProgress(false);
    //   })
    //   .catch(error => console.log(error))
    // } )
    auth.createUserWithEmailAndPassword(email, pass)
      .then((cred) => {
        firestore.collection("users").doc(`${cred.user.uid}`).set({
          dpUrl: dpUrl,
          tmUrl: tmUrl,
          dpName: fileName,
          tmName: tmName,
          firstName: firstName,
          lastName: lastName,
          country: country,
          city: city,
          bDay: bDay,
          gender: gender,
          edu:edu,
          field: field,
          uni:uni,
          job:job,
          intro: intro,
          email: email,
          posts: [],
          friends: [],
          requests: [],
          requested: [],
          chats: {}
        })
        .then(() => {
          setShowProgress(false);
          refresh();
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  const createUser = (e) => {

    if ((pass === conPass) && (pass.length >= 6) && pass) {
      setShowProgress(true);
      if (file && tm) {
        const storageRef = storage.ref();
        
        const dpRef = storageRef.child(`dp/${file.name}`);
        const tmRef = storageRef.child(`tm/${tm.name}`);

        const uploadTaskDp = dpRef.put(file);
          // .then(async snap => {
          //   const dpUrl = await dpRef.getDownloadURL();
          //   addUser(dpUrl);
          // })
        const uploadTaskTm = tmRef.put(tm);

        uploadTaskDp.on('state_changed', (snap) => {
          setSend(snap.bytesTransferred);
          setTotal(snap.totalBytes);
          uploadTaskTm.on('state_changed', (snap) => {
            setSend(send + snap.bytesTransferred);
            setTotal(total + snap.totalBytes);
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTaskTm.snapshot.ref.getDownloadURL().then((url) => {
              setTmUrl(url);
            })
          })
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTaskDp.snapshot.ref.getDownloadURL().then(async (url) => {
            // const tmToken = await tmRef.getDownloadURL();
            // addUser(url, tmToken);
            setDpUrl(url)
          })
        })
      } else if (file) {
        const storageRef = storage.ref();
        
        const dpRef = storageRef.child(`dp/${file.name}`);

        const uploadTaskDp = dpRef.put(file)

        uploadTaskDp.on('state_changed', (snap) => {
          setSend(snap.bytesTransferred);
          setTotal(snap.totalBytes);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTaskDp.snapshot.ref.getDownloadURL().then(async (url) => {
            // const tmToken = await tmRef.getDownloadURL();
            // addUser(url, tmToken);
            setDpUrl(url);
            setTmUrl('https://firebasestorage.googleapis.com/v0/b/singals-dfa5b.appspot.com/o/tm%2Fold-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg?alt=media&token=0cc83a7c-e50e-45f9-8313-5bcb0606d595');
          })
        })
      } else if (tm) {
        const storageRef = storage.ref();

        const tmRef = storageRef.child(`tm/${tm.name}`);
        const uploadTaskTm = tmRef.put(tm);

        uploadTaskTm.on('state_changed', (snap) => {
          setSend(send + snap.bytesTransferred);
          setTotal(total + snap.totalBytes);
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTaskTm.snapshot.ref.getDownloadURL().then((url) => {
            setTmUrl(url);
            setDpUrl('https://firebasestorage.googleapis.com/v0/b/singals-dfa5b.appspot.com/o/dp%2Fdefault.png?alt=media&token=59d3a4e0-05c2-448d-9947-68c8c62b07f3');
          })
        })
      }
      else {
        addUser('https://firebasestorage.googleapis.com/v0/b/singals-dfa5b.appspot.com/o/dp%2Fdefault.png?alt=media&token=59d3a4e0-05c2-448d-9947-68c8c62b07f3', 'https://firebasestorage.googleapis.com/v0/b/singals-dfa5b.appspot.com/o/tm%2Fold-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg?alt=media&token=0cc83a7c-e50e-45f9-8313-5bcb0606d595');
      }
    
    } else {
      setPassMsg(<p className="pass-char text-red-500">password confirmation faild, Try again</p>);
    }
    e.preventDefault();
  }

  useEffect(() => {
    if (tmUrl, dpUrl) {
      addUser(dpUrl, tmUrl);
    }
  }, [tmUrl, dpUrl])

  const setDp = (e) => {
    const file = e.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        setUrl(reader.result);
        setFileName(file.name);
        setFile(file);
      }

      reader.readAsDataURL(file);
    }

    e.preventDefault();
  }

  const setBg = (e) => {
    const file = e.target.files[0];

    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        setTmUrl(reader.result);
        setTmName(file.name);
        setTm(file);
      }

      reader.readAsDataURL(file);
    }
    e.preventDefault();
  }

  const noBg = <div className="h-52 w-72 border-2 border-gray-300 p-5">
  <div className="w-full h-full border-2 border-gray-300 border-dashed flex justify-center items-center">
    <MdPhotoSizeSelectLarge className="text-6xl text-gray-400" />
  </div>
</div>;

  return(
    <div className="max-w-form mx-auto text-gray-600">
      <h1 className="text-brand text-7xl font-logo mt-8 ml-5 sm:ml-0">Singls</h1>
      <h3 className="text-brand text-4xl text-center font-bold mt-2">Create Account</h3>
      <form className="sm:flex justify-between w-full relative">
      <div className="sm:w-full w-11/12 mx-auto">
        <div className="form-card">
          <p className="text-3xl">Upload Profile Picture</p>
          <div className="flex mt-8">
            <img src={url} className="w-40 h-40 rounded-full object-cover object-center"/>
            <label htmlFor="tm" className="bg-brand relative z-10 w-36 h-12 ml-14 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500">Choose File</label>
            <p className="my-auto text-2xl ml-3">{fileName}</p>
            <input type='file' id='tm' name='tm' accept="image/*" className="hidden" onChange={setDp}/>
          </div>
        </div>
        <div className="form-card">
          <p className="text-3xl">Upload Timeline Picture</p>
          <div className="flex mt-8">
            {tmUrl ? <img src={tmUrl} className="h-52"/> : noBg}
            {/* <div className="h-52 w-72 border-2 border-gray-300 p-5">
              <div className="w-full h-full border-2 border-gray-300 border-dashed flex justify-center items-center">
                <MdPhotoSizeSelectLarge className="text-6xl text-gray-400" />
              </div> */}
            <label htmlFor="dp" className="bg-brand relative z-10 w-36 h-12 ml-14 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500">Choose File</label>
            <p className="my-auto text-2xl ml-3">{tmName}</p>
            <input type='file' id='dp' name='dp' accept="image/*" className="hidden" onChange={setBg}/>
          </div>
        </div>
        <div className="form-card">
          <p className="text-3xl mb-8">Basic info</p>
          <div className="sm:flex">
            <TextInput type="text" name="firstname" label="First Name" value={firstName} onChange={(e) => set(setFirstName, e)}/>
            <TextInput type="text" name="lastname" label="Last Name" value={lastName} onChange={(e) => set(setLastName, e)}/>
          </div>
          <div className="sm:flex">
            <TextInput type="text" name="country" label="Country" value={country} onChange={(e) => set(setCountry, e)}/>
            <TextInput type="text" name="city" label="City" value={city} onChange={(e) => set(setCity, e)}/>
          </div>
          <div className="sm:flex">
          <TextInput type="date" name="b'day" label="Date Of Birth" value={bDay} onChange={(e) => set(setbDay, e)}/>
          <div className="mt-5 w-2/4">
            <label htmlFor="gender" className="text-2xl block">Gender</label>
            <select name="gender" id="gender" className="mt-3 border border-gray-300 h-12 w-4/5 rounded-lg shadow-sm text-2xl pl-3 outline-none focus:ring-1 focus:ring-brand focus:border-0" required onChange={(e) => set(setGender, e)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            </div>
          </div>
        </div>
        {/* <input type="submit" value="Create Account" className="bg-brand mb-12 relative z-10 w-56 h-12 mt-10 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500"/> */}
      </div>
      <div className="sm:w-full w-11/12 mx-auto">
        <div className="form-card">
          <p className="text-3xl mb-8">Education And Career</p>
            <div className="sm:flex">
              <TextInput type="text" name="edu-col" label="Highest Educational Qualification" value={edu} onChange={(e) => set(setEdu, e)}/>
              <TextInput type="text" name="study-field" label="Field Of Study" value={field} onChange={(e) => set(setField, e)}/>
            </div>
            <div className="sm:flex">
              <TextInput type="text" name="institute" label="University/School" value={uni} onChange={(e) => set(setUni, e)}/>
              <TextInput type="text" name="job" label="Corrent Job Roll" value={job} onChange={(e) => set(setJob, e)}/>
            </div>
        </div>
        <div className="form-card">
          <p className="text-3xl mb-8">Breaf Intro</p>
          <textarea placeholder="Tell us some thing about you..." className="border-2 border-gray-300 w-full h-64 p-5 text-2xl outline-none rounded-lg focus:border-brand transition-all duration-300" onChange={(e) => set(setIntro, e)}/>
        </div>
        <div className="form-card">
          <p className="text-3xl mb-8">Email And Passward</p>
          <TextInput type="email" name="email" label="Email" value={email} onChange={(e) => set(setEmail, e)}/>
          <div className="sm:flex">
            <TextInput type="password" name="passward" label="Passward" value={pass} onChange={(e) => set(setPass, e)}/>
            <TextInput type="password" name="passwardCon" label="Confirm Passward" value={conPass} onChange={(e) => set(setConPass, e)}/>
          </div>
          {passMsg}
        </div>
        
      </div>
      
      </form>
      <button type="submit" value="Create Account" onClick={createUser} className="bg-brand mb-12 z-10 sm:w-56 w-11/12 mx-auto sm:mx-0  h-12 mt-10 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500 ">Submit</button>
      {showProgress ? <Progress send={send} total={total}/> : null}
    </div>
  )
}

export default Account;