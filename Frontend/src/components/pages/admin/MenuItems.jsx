import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMenuItem ,removeMenuItem } from "../../../redux/Slices/adminSlice";
import AddMenuItems from "./AddMenuItems";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MenuItems = () => {
const { rId } = useParams();


const restaurants = useSelector((state) => state.admin.restaurants);
const restaurant = restaurants.find((r) => r.id === rId);
const menu = restaurant ? restaurant.menu : [];
const dispatch=useDispatch();
const [isOpen,setIsOpen]=useState(false);

const modalHandler=()=>{
  setIsOpen(!isOpen)
}

const token=useSelector((state)=>state.auth.token);
const handleDeleteItem=async(iId)=>{
    const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/removeitem/${rId}/${iId}`,{
      method:"DELETE",
      headers:{
        "Constent-Type":"application/json",
        Authorization: `Bearer ${token}`,
      }
      }
    )

    if(response.ok){
      dispatch(removeMenuItem({ rId, iId }));
      toast.success("item deleted successfully 👍 ")
    }else{
      toast.success("item not Found ❌")
    }
}

  return (
    <div className="h-full w-full p-4 md:p-10 inset-0">
      <h1 className="font-semibold text-3xl text-gray-600 mb-6">
        ALL Menu Items
      </h1>
      <h1 className="font-semibold text-2xl text-gray-500 mb-4">Items List</h1>
      <hr className="my-4 border-t-2 border-gray-300" />
      {menu?.map((item) => (
        <div key={item.id} className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-2xl text-gray-700">
              {item.name}
            </h1>
            <span className="font-semibold text-xl text-gray-700">₹{item.price}</span>
            <button 
            onClick={()=>handleDeleteItem(item.id)}
            className="w-40 text-white bg-red-700 hover:bg-red-600 py-2 rounded-lg">
            Delete Item
            </button>
          </div>

          <hr className="mt-4 border-t-2 border-gray-300" />
        </div>
      ))}
      <button 
      onClick={modalHandler }
      className="w-40 text-white bg-gray-800 hover:bg-gray-600 py-2 rounded-lg">
        Add Item
      </button>
      {
        isOpen && <AddMenuItems isOpen={isOpen} modalHandler={modalHandler} restId={rId}/>
      }
    </div>
    
  );
};

export default MenuItems;
