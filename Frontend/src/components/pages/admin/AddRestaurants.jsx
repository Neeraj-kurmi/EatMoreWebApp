import React, { useState } from "react";
import { toast } from "sonner";
import { addRestaurant } from "../../../redux/Slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
const AddRestaurants = ({modalHandler}) => {
  const dispatch=useDispatch();
  
  const [form, setFormData] = useState({
    name: "",
    cuisine: "",
    rating: "",
    image:""
  });

  const changeHandler = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...form, image: reader.result });
    };
  };
  
  const token=useSelector((state)=>state.auth.token);
  const formHandler=async(e)=>{
     e.preventDefault();
      const response = await fetch(`http://localhost:8080/admin/addrestraunt`, {
        method: "POST",
        headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
        body: JSON.stringify(form)
  
      });
      if (response.ok) {
        modalHandler()
        const updatedForm = await response.json();
        setFormData(updatedForm)
        dispatch(addRestaurant(updatedForm))
        toast.success(" Restraunt added successfully ! 👍")
      } else {
        toast.error("❌ Error ! please Login");
      }
      
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs z-50">
      <form
        onSubmit={formHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center ">Add Restaurant</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            onChange={changeHandler}
            value={form.name}
            name="name"
            placeholder="Enter restaurant name here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cuisine
          </label>
          <input
            type="text"
            onChange={changeHandler}
            value={form.cuisine}
            name="cuisine"
            placeholder="Enter cuisine here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <input
            type="text"
            name="rating"
            value={form.rating}
            onChange={changeHandler}
            placeholder="Enter rating here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            name="image"
            className=" cursor-pointer w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        </div>

        <div className='flex justify-between gap-2'>
          <button className="w-full items-end text-white bg-gray-800 hover:bg-gray-600 py-2 rounded-lg">
          Add
        </button>
        <button 
        onClick={modalHandler}
        className="w-full items-end text-white bg-red-500 hover:bg-red-400 py-2 rounded-lg">
          Close
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurants;
