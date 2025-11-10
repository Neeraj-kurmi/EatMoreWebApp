import React, { useEffect, useState } from 'react'
import { addRestaurant, removeRestaurant } from '../../../redux/Slices/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddRestaurants from './AddRestaurants';
import { toast } from 'sonner';
import { logout } from '../../../redux/Slices/authSlice';

const Restaurants = () => {
  const [isOpen ,setIsOpen]= useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  
    useEffect(() => {
      const fetchRestaurants = async () => {
        try {
          const res = await fetch("${import.meta.env.VITE_API_BASE_URL}/admin/allrestraunt");
          
          if (res.ok) {
            const data = await res.json();
            dispatch(addRestaurant(data));
          } else {
            console.error("Failed to fetch restaurants");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchRestaurants();
    }, [dispatch]);

    const restaurants=useSelector((state)=>state.admin.restaurants)
    const handleRemoveRestaurent=async(id)=>{
       const rId=id;
 
       const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}/removeRest/${rId}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
       })

       if(response.ok){
        dispatch(removeRestaurant({rId}))
        toast.success("Restraunt Deleted Successfully 👍")
       }else{
        toast.info("Restraunt Not Found ❌")
       }
       
  }

  const modalHandler=()=>{
  setIsOpen(!isOpen)
  }

  return (
    <div className="h-full w-full p-10 ">
    <div className='md:flex gap-4'>
      <h1 className="font-semibold text-3xl text-gray-500 mb-6 ">All Restaurants</h1>
      <button 
      onClick={modalHandler}
      className="w-40 h-10 text-white bg-gray-800 hover:bg-gray-600  rounded-lg">
                Add Restaurant
      </button>
      <button 
      onClick={()=>navigate("/admin/orders")}
      className="w-40 h-10 text-white bg-green-800 hover:bg-gray-600  rounded-lg">
                View Orders
      </button>
      <button 
              onClick={()=>{
                dispatch(logout())
                navigate("/")
              }}
              className="w-40 h-10 text-white bg-yellow-800 hover:bg-gray-600  rounded-lg">
                Logout
      </button>
    </div>
      <h1 className="font-semibold text-2xl text-gray-500 mb-4">Restaurants List</h1>
      <hr className="my-4 border-t-2 border-gray-300" />
      {restaurants?.map((r) => (
        <div key={r.id} className="mb-6">
          <div className="md:flex justify-between items-center">
            <h1 className="font-semibold text-2xl text-gray-700 mb-2">{r.name}</h1>
            <div className="flex gap-4">
              <button 
              onClick={()=>navigate(`/admin/menu/${r.id}`)}
              className="w-40 text-white bg-gray-800 hover:bg-gray-600 py-2 rounded-lg">
                View Menu Items
              </button>
              <button 
              onClick={()=>handleRemoveRestaurent(r.id)}
              className="w-40 text-white bg-red-700 hover:bg-red-600 py-2 rounded-lg">
                Delete Restaurant
              </button>
            </div>
          </div>

          <hr className="mt-4 border-t-2 border-gray-300" />
        </div>
      ))}
      
      {
        isOpen && <AddRestaurants modalHandler={modalHandler}/>
      }
    </div>
  );
};

export default Restaurants;
