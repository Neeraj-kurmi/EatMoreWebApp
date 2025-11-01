import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/Slices/authSlice";
import OrderHistory from "./OrderHistory";
import { useState } from "react";
import EditProfile from "./EditProfile";
import Navbar from "../../shared/Navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [isOpen,setIsOpen]=useState();

  const modalHandler =()=>{
      setIsOpen(!isOpen)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">No User Found</h2>
          <p className="text-gray-600 mt-2">Please log in to view your profile.</p>
           <div className="flex flex-col ">
          <a className=" text-blue-800 underline cursor-pointer"
          onClick={()=>navigate("/user/login")}
          >Login</a>
          <a className=" text-blue-800 underline cursor-pointer"
          onClick={()=>navigate("/user/register")}
          >if not regitered yet please register</a>
        </div>
        </div>
      </div>
    );
  }

  return (
  <div>
    <Navbar/>
<div className=" bg-gray-100 py-10 px-4">
      <div className=" bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center gap-6">
          <img
            src={user.photo || "https://i.pravatar.cc/150?img=12"}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-gray-200"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{user.firstName +" "+ user.lastName}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.phoneNumber || "No phone added"}</p>
          </div>
        </div>

        <hr className="my-6" />

        <div className="space-y-3">
          <p>
            <span className="font-semibold text-gray-700">Username: </span>
            {user.userName || "Not set"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Joined: </span>
            {user.id ? user.createdAt : "Unknown"}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={modalHandler}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg shadow"
          >
            Edit Profile
          </button>
          <button
            onClick={() => {dispatch(logout()) , navigate("/")}}
            className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>
      </div>
      <OrderHistory/>
      {isOpen && <EditProfile modalHandler={modalHandler}/>}
    </div>
  </div>
    
  );
}
