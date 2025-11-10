import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setUser } from '../../../redux/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { addCart } from '../../../redux/Slices/cartSlice';

const SignIn = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [form ,setFormData]=useState({
     email:"",
     password:""
  })
  const changeHandler=(e)=>{
         setFormData({...form,[e.target.name]:e.target.value})
  }
  const submitHandler=async(e)=>{
         e.preventDefault();
         const response1=await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/login`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
         })
         const userData = await response1.json();
         if(response1.ok){
         const user=userData.user;
         const token=userData.token;

         dispatch(setUser({user,token}))

         if(user.email=="neeraj@gmail.com"){
          navigate("/admin/restaraunts")
         }else{
          const response2=await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/getCartItem/${user.id}`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
               Authorization: `Bearer ${token}`,
            },
         })
          
          if(response2.ok){
            const cart=await response2.json();
            dispatch(addCart({items:cart.cartItems,total:cart.total}))
          }

          navigate("/user/profile")

          toast.success("Logged In Successfully");
         }
          
         }else{
          toast.error("Invalid Credentials")
         }
        
        


  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
  <form 
  onSubmit={submitHandler}
  className="bg-white p-8 rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        value={form.email}
        name='email'
        onChange={changeHandler}
        placeholder="Enter your email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
      </label>
      <input
        type="password"
        value={form.password}
        name='password'
        onChange={changeHandler}
        placeholder="Enter your password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
      />
    </div>

    <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600 transition"
     onSubmit={submitHandler}>
      Login
    </button>

    <div className="mt-4 text-sm text-center text-gray-600">
      <a className="text-blue-600 hover:underline">
        Forgot your password?
      </a>
    </div>

    <div className="mt-2 text-sm text-center text-gray-600">
      Don’t have an account?{" "}
      <a href="/user/register"  className="text-blue-600 font-medium hover:underline">
        Register
      </a>
    </div>
  </form>
</div>

  )
}

export default SignIn