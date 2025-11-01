import React from 'react'
import {  useSelector } from 'react-redux';
const OrderHistory = () => {
  const previousOrders= useSelector((state)=>state.orders.pastOrders);
  if(!previousOrders){
    return (
      <div>
         <h1 className='my-4 text-3xl font-bold'>previous orders</h1>
        <h1>No previous order Found....</h1>
      </div>
    )
  }
  return (
      <div className=' bg-gray-200 h-full w-full p-4 rounded-b-lg shadow-2xl'>
        <h1 className=' font-medium text-gray-600 text-3xl my-5'> Order History</h1>
        {
          previousOrders.map((order)=>{
            return <>
            <hr className=' text-orange-400 my-3'/>
              <h1>Total Amount : ₹{order.totalAmount}</h1>
              <span>Order Status : </span>
              <span
              className={`px-3 py-1  rounded-full text-sm font-medium ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "preparing"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.status}
            </span>
            <div>Order Date : {order.placedAt}</div>
              <table className='my-2'>
            <td><th>Item Name</th>
            {
              order.items.map((item)=>{
                return (
                  <tr>{item.name}</tr>
                )
              })
            }
            </td>
            <td><th>Item Price</th>
            {
              order.items.map((item)=>{
                return (
                  <tr>₹{item.price}</tr>
                )
              })
            }
            </td>
              </table>
            </>
              
              }
            
          )
        }
        

      </div>
  )
}

export default OrderHistory