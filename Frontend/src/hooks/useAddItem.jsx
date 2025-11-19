import React, { useState } from 'react'
import { toast } from 'sonner';
import { addToCart } from '../redux/Slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const useAddItem = () => {
  const user=useSelector((state)=>state.auth.user);
  const token=useSelector((state)=>state.auth.token);
  const [load, setload] = useState(false);
  const dispatch =useDispatch();
     const addItem=async(item)=>{
    try {
      setload(true);
       if(user==null){
         toast.error("please login first")
         return
       }
       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/addCartItem/${user.id}`,{
        method :"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(item)
       })
       if(response.ok){
         dispatch(addToCart({item}));
         toast.success("🎇 Item added into your cart")
       }
     } 
   catch (error) {
    toast.error("Failed to add item into cart",error)
  }finally{
    setload(false);
  }
}
  return {load,addItem}
}


export default useAddItem