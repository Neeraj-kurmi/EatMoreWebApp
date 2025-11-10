import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "/src/redux/Slices/cartSlice.js";

export default function useRemoveItem() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token=useSelector((state)=>state.auth.token);
  const [loading, setloading] = useState(false);
  const removeItems = async (item) => {
    try {
      setloading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/cart/removeCartItem/${user.id}/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
          },
        }
      );
      
      dispatch(removeFromCart({item }));
      if (response.ok) {
        console.log("item deleted ");
      }
    } catch (error) {
      console.log("🔴 Error : ", error);
    } finally {
      setloading(false);
    }
  };
  return { loading, removeItems };
}
