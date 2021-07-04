import React, {useState} from 'react';

import TextInput from '../../../components/formElements/textInput';

const Basic = (props) => {

  const [changed, setChanged] = useState(false);

  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [country, setCountry] = useState(props.user.country);
  const [city, setCity] = useState(props.user.city);
  const [bDay, setbDay] = useState(props.user.city);
  const [gender, setGender] = useState(props.user.gender);

  const set = (func, e) => {
    func(e.target.value);
    if (!changed) {
      setChanged(true);
    }
  }

  const update = () => {
    const obj = {};

    if (firstName != props.user.firstName) {
      obj.firstName = firstName
    }
    
    if (lastName != props.user.lastName) {
      obj.lastName = lastName
    }
    
    if (country != props.user.country) {
      obj.country = country
    }
    
    if (city != props.user.city) {
      obj.city = city
    }
    
    if (bDay != props.user.bDay) {
      obj.bDay = bDay
    }
    
    if (gender != props.user.gender) {
      obj.gender = gender
    }

    props.update(obj);
  }

  return (
    <>
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
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            </div>
          </div>
        </div>
        <button className="bg-brand relative z-10 w-52 h-12 rounded-md text-2xl text-center my-auto text-white flex justify-center items-center hover:bg-white hover:text-gray-400 hover:border-2 hover:border-gray-400 transition-all duration-500 mt-10 btnDis" disabled={changed ? false : true} onClick={update}>Upload</button>
        </>
  )
}

export default Basic;