import React from 'react'
import { toast } from 'sonner';
import { addToCart } from '../redux/Slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const useAddItem = () => {
  const user=useSelector((state)=>state.auth.user);
  const dispatch =useDispatch();
     const addItem=async(item)=>{
    try {
       if(user==null){
         toast.error("please login first")
         return
       }
       const response = await fetch(`http://localhost:8080/addCartItem/${user.id}`,{
        method :"POST",
        headers:{
          "Content-Type": "application/json"
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
  }
}
  return {addItem}
}


export default useAddItem