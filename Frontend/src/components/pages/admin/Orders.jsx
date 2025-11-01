import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderAdmin } from "../../../redux/Slices/adminSlice";
import useUpdateOrderStatus from "../../../hooks/useUpdateOrderStatus";

const Orders = () => {

  const dispatch=useDispatch();
  const { updateStatus  } = useUpdateOrderStatus();
  useEffect(()=>{
          const orders=async()=>{
          const response=await fetch(`http://localhost:8080/allOrders`,{
            method:"GET",

            headers:{
              "Content-Type":"application/json"
            },
         })
         if(response.ok)dispatch(addOrderAdmin(await response.json())) ;
        }
    orders();
  },[dispatch])
   
  const allOrders=useSelector((state)=>state.admin.orders);
  return (

    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Admin - Orders</h1>

      {allOrders?.map((order) => (
        <div
          key={order.id}
          className="bg-white shadow-md rounded-lg p-4 mb-6 border"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Order #{order.id} - User #{order.userId}
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "preparing"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>Item ID: {item.id}</span>
              </div>
            ))}
          </div>

          
          <div className="flex gap-2 mt-4">
            <button
              onClick={()=>updateStatus(order.id,"pending")}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Pending
            </button>
            <button
              onClick={()=>updateStatus(order.id,"preparing")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Preparing
            </button>
            <button
              onClick={()=>updateStatus(order.id,"delivered")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Delivered
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
