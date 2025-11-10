import React from "react";
import { updateOrderStatus } from "../redux/Slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useUpdateOrderStatus = () => {

  const dispatch=useDispatch();
  const token=useSelector((state)=>state.auth.token);

  const updateStatus = async (orderId, ordersStatus) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/order/updateStatus/${orderId}?status=${ordersStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.ok) {
        dispatch(updateOrderStatus({ orderId: orderId, status: ordersStatus }));

        toast.success("status updates successfully... ");
      }
    } catch (error) {
      toast.error("Failed to update status")
      console.log("🔴 Error : ", error);
    }
  };
  return { updateStatus };
};

export default useUpdateOrderStatus;
