import React, {useState} from 'react';

import TextInput from '../../../components/formElements/textInput';

const Edu = (props) => {

  const [changed, setChanged] = useState(false);

  const [edu, setEdu] = useState(props.user.edu);
  const [field, setField] = useState(props.user.field);
  const [uni, setUni] = useState(props.user.uni);
  const [job, setJob] = useState(props.user.job);

  const set = (func, e) => {
    func(e.target.value);
    if (!changed) {
      setChanged(true);
    }
  }

  const update = () => {
    const obj = {};

    if (edu != props.user.edu) {
      obj.edu = edu
    }

    if (field != props.user.field) {
      obj.field = field
    }

    if (uni != props.user.uni) {
      obj.uni = uni;
    }

    if (job != props.user.job) {
      obj.job = job;
    }

    props.update(obj);
  }

  return (
    <>
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
  <button className="bg-brand relative z-10 w-52 h-12 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500 mt-10 btnDis" disabled={changed ? false : true} onClick={update}>Upload</button>
  </>
  )
}

export default Edu;