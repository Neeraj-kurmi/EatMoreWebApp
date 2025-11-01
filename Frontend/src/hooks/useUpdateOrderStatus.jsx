import React from "react";
import { updateOrderStatus } from "../redux/Slices/adminSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useUpdateOrderStatus = () => {

  const dispatch=useDispatch();

  const updateStatus = async (orderId, ordersStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/updateStatus/${orderId}?status=${ordersStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
