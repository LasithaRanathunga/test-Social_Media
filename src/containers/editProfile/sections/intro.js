import React, {useState} from 'react';

const Intro = (props) => {

  const [changed, setChanged] = useState(false);

  const [intro, setIntro] = useState(props.user.intro);

  const set = (func, e) => {
    func(e.target.value);
    if (!changed) {
      setChanged(true);
    }
  }

  const update = () => {
    const obj = {};

    if (intro != props.user.intro) {
      obj.intro = intro;
    }

    props.update(obj);
  }

  return (
    <>
    <div className="form-card">
      <p className="text-3xl mb-8">Breaf Intro</p>
      <textarea placeholder="Tell us some thing about you..." value={intro} onChange={(e) => set(setIntro, e)} className="border-2 border-gray-300 w-full h-64 p-5 text-2xl outline-none rounded-lg focus:border-brand transition-all duration-300" />
    </div>
    <button className="bg-brand relative z-10 w-52 h-12 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500 mt-10 btnDis" disabled={changed ? false : true} onClick={update}>Upload</button>
    </>
  )
}

export default Intro;