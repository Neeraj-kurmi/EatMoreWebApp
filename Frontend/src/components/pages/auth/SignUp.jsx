import React, { useState } from 'react'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate =useNavigate();
  const [form , setFormData]=useState({
       firstName:"",
       lastName:"",
       email:"",
       password:"",
       createdAt:new Date().toISOString().split("T")[0]
  })

const changeHandler=(e)=>{

  setFormData({...form,[e.target.name]:e.target.value})
}

const formHandler=async(e)=>{
    e.preventDefault();
         const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/addUser`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
         })
         if(response.ok){
          navigate("/")
          toast.success("Regitered In Successfully");
         }else{
          toast.error("Invalid Credentials")
         }
}

  return (
   
<div className="flex items-center justify-center h-screen bg-gray-100">
  <form 
  onSubmit={formHandler}
  className="bg-white p-8 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

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
    <div className="my-2 text-sm text-center text-gray-600">
      Aready Registered ?{" "}
      <a href="/user/login"  className="text-blue-600 font-medium hover:underline">
        Login
      </a>
    </div>

    <button className="w-full text-white bg-gray-800 hover:bg-gray-600 py-2 rounded-lgtransition">
      Register
    </button>
  </form>
</div>
    
  )
}

export default SignUp