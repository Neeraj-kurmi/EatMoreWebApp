import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { addMenuItem } from '../../../redux/Slices/adminSlice';

const AddMenuItems = ({modalHandler,restId}) => {
  const dispatch=useDispatch();
    const [form, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...form, image: reader.result });
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const formHandler=async(e)=>{
       e.preventDefault();
        const response = await fetch(`http://localhost:8080/addItem/${restId}`, {
          method: "POST",
          headers: {
        "Content-Type": "application/json"
      },
          body: JSON.stringify(form)
    
        });
        if (response.ok) {
          modalHandler()
          const newItem = await response.json();
          setFormData(newItem);
          dispatch(addMenuItem({ restId, item: newItem }));
          toast.success(" Item added successfully ! 👍")
        } else {
          console.error("❌ Error occur during the creation of item ");
        }
        
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <form
        onSubmit={formHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Menu Item</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Item Name
          </label>
          <input
            type="text"
            onChange={changeHandler}
            value={form.name}
            name="name"
            placeholder="Enter Item name here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="text"
            onChange={changeHandler}
            value={form.cuisine}
            name="price"
            placeholder="Enter price here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
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
}

export default AddMenuItems