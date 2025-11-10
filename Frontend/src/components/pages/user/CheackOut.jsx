import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { addOrder } from "../../../redux/Slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/Slices/cartSlice";
import useRemoveCart from "../../../hooks/useRemoveCart";
import Navbar from "../../shared/Navbar";
const CheackOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token=useSelector((state)=>state.auth.token);
  const { removeCart } = useRemoveCart();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.carts);
  const items = cart?.items;
  const total = cart?.total;

  const [form, setFormData] = useState({
    address: "",
    number: "",
    houseNumber: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      userId: user.id,
      userName: user.firstName + " " + user.lastName,
      items: items,
      totalAmount: total,
      deliveryAddress: form.address,
      number: form.number,
      houseNumber: form.houseNumber,
      placedAt: new Date().toISOString().split("T")[0],
    };
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/order/addOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    dispatch(addOrder(await response.json()));

    if (response.ok) {
      toast.success("Order placed!", {
        description: "Your Order will arrive in 30 mins ! ",
        className: "bg-purple-600 text-white rounded-lg shadow-lg",
      });
      dispatch(clearCart());
      removeCart();
      navigate("/user/profile");
    }
  };
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen p-4">
      <div className="h-150 w-150 bg-gray-200 shadow-2xl rounded-xl p-4 mx-auto">
        <h1 className=" font-medium text-2xl text-gray-700 mb-4">
          Order Summary
        </h1>
        {items?.map((item, id) => {
          return (
            <ul key={id} className="flex text-black gap-5">
              <li>{item.name} : </li>
              <li>₹ {item.price} </li>
            </ul>
          );
        })}
        <span>Total : {total} </span>

        <h1 className="mt-8 font-medium text-2xl text-gray-700">Add Address</h1>

        {/* form */}
        <form>
          <label className="mt-2 block text-sm font-medium text-gray-700 mb-1">
            Address<span className=" text-red-600"> *</span>
          </label>
          <input
            required
            onChange={changeHandler}
            type="text"
            name="address"
            placeholder="Enter address here..."
            className="w-full px-4 py-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
          <label className=" mt-2 block text-sm font-medium text-gray-700 mb-1">
            Mobile No.<span className=" text-red-600"> *</span>
          </label>
          <input
            required
            onChange={changeHandler}
            type="text"
            name="number"
            placeholder="Enter mobile no here..."
            className="w-full px-4 py-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
          <label className="mt-2 block text-sm font-medium text-gray-700 mb-1">
            House No.<span className=" text-red-600"> *</span>
          </label>
          <input
            required
            onChange={changeHandler}
            type="text"
            name="houseNumber"
            placeholder="Enter house no here..."
            className="w-full px-4 py-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
          />
          <button
            onClick={handleSubmit}
            className="w-full p-2 mt-14 text-white bg-green-600 hover:bg-green-500 border rounded-2xl border-gray-600"
          >
            Place Order
          </button>
          <button
            onClick={()=>navigate("/user/cart")}
            className="w-full p-2 mt-2 text-white bg-red-600 hover:bg-red-500 border rounded-2xl border-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CheackOut;
