import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/Slices/cartSlice";
import { toast } from "sonner";

const useRemoveCart = () => {
  const user = useSelector((state) => state.auth.user);
  const token=useSelector((state)=>state.auth.token);
  const dispatch =useDispatch();
  const removeCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/cart/removeCart/${user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.ok){
         dispatch (clearCart())
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return { removeCart };
};

export default useRemoveCart;
