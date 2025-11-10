import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../redux/Slices/cartSlice';
import { toast } from 'sonner';

const useRemoveWholeItem = () => {
    const user = useSelector((state) => state.auth.user);
    const token=useSelector((state)=>state.auth.token);
    const dispatch =useDispatch();
    const removeWholeItems = async (item) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/cart/removeWholeCartItem/${user.id}/${item.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            dispatch(removeItemFromCart({ itemId: item.id }));
            toast.success("item deleted ");
          }
        } catch (error) {
          console.log("🔴 Error : ", error);
        } 
      };
  return {removeWholeItems};
}

export default useRemoveWholeItem