import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setUser} from "/src/redux/Slices/authSlice.js"
import { toast } from 'sonner';
import Loader from '../../shared/Loader';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({modalHandler}) => {
  
  const [loading,setLoading]=useState(false);
  const token=useSelector((state)=>state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [form , setFormData]=useState({
       firstName:user.firstName,
       lastName:user.lastName,
       email:user.email,
       password:null,
       phoneNumber:user.phoneNumber,
       userName:user.userName,
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...form, photo: reader.result });
    };
  };

const changeHandler=(e)=>{
  setFormData({...form,[e.target.name]:e.target.value})
}
const formHandler=async(e)=>{
    setLoading(true); 
    e.preventDefault();
    const _id=user.id;
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/updateUser/${_id}`, {
      method: "PUT",
      headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
      body: JSON.stringify(form)

    });
    if (response.ok) {
      setLoading(false);
      const user = await response.json();
      dispatch(setUser({user,token}))
       navigate("/user/profile")
      modalHandler();
      toast.success("✔️ profile updated successfully ! ")
    } else {
      console.error("❌ Error registering user");
    }
    setLoading(false);
    
}

  return (
   
<div className="flex items-center justify-center h-screen fixed inset-0 bg-black/40 backdrop-blur-xs z-50">

  <form 
  className="bg-white p-8 rounded-lg shadow-lg w-150">
    <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        First Name
      </label>
      <input
        type="text"
        onChange={changeHandler}
        value={form.firstName}
        name='firstName'
        placeholder="Enter First Name here..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Last Name
      </label>
      <input
        type="text"
        onChange={changeHandler}
        value={form.lastName}
        name='lastName'
        placeholder="Enter Last Name here..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
         onChange={changeHandler}
        value={form.email}
        name='email'
        placeholder="Enter Email here..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        name='password'
        value={form.password}
         onChange={changeHandler}
        placeholder="Enter Password here..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        User Name
      </label>
      <input
        type="text"
        onChange={changeHandler}
        value={form.userName}
        name='userName'
        placeholder="Enter First Name here..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input
        type="text"
        onChange={changeHandler}
        value={form.phoneNumber}
        name='phoneNumber'
        placeholder="Enter First Name here..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Photo
      </label>
      <input
        type="file"
        onChange={handleImageChange}
        name='photo'
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>

    <div className='flex items-center gap-3'>
         <button 
         onClick={formHandler}
    className="w-full text-white bg-gray-800 hover:bg-gray-600 py-2 rounded-lg flex items-center justify-center">
      {loading?<Loader/>:"Update"}
    </button>
    <button 
    onClick={modalHandler}
    className="w-full text-white bg-red-500 hover:bg-gray-600 py-2 rounded-lg transition">
      close
    </button>
    </div>
  </form>
</div>
    
  )
}

export default EditProfile
