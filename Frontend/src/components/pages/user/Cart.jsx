import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../../shared/Navbar";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAddItem from "../../../hooks/useAddItem";
import useRemoveCart from "../../../hooks/useRemoveCart";
import useRemoveWholeItem from "../../../hooks/useRemoveWholeItem";
import useRemoveItem from "../../../hooks/useRemoveItem";

const Cart = () => {
    
  const { loading, removeItems } = useRemoveItem();
  const {removeWholeItems}=useRemoveWholeItem();
  const {removeCart}=useRemoveCart();
  const {addItem}=useAddItem();

  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.carts);
  const navigate = useNavigate();

  if (user == null)
    return (
  <>

  <Navbar/>
    <div className="h-screen flex items-center justify-center flex-col">
        <div className="">Please Login first</div>
        <button
          onClick={() => navigate("/user/login")}
          className=" text-blue-800"
        >
          click for Login
        </button>
      </div>
  </>
      
    );
  
  if (!cart)
    return (
      <><Navbar/>
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">Your Cart</h1>
        <p className="text-gray-400 text-center">Your cart is empty.</p>
      </div>
      </>
    );

  const { items, total } = cart;


  const handleRemoveItem = async (item) => {
    removeItems(item);
  };

  const handleAddItem = async (item) => {
    addItem(item)
  };

  const handleRemoveWholeItem = async (item) => {
     removeWholeItems(item);
  };
  const handleRemoveCart = async () => {
     removeCart();
  };

  return (
    <div>
      <Navbar />
      <div className=" p-8 ">
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-600">Your Cart</h1>

          {!total ? (
            <p className="text-gray-400 text-center">Your cart is empty.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200 ">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center py-4"
                  >
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">₹{item.price}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAddItem(item)}
                        className="bg-green-500 font-bold text-white px-3 py-1 rounded-lg hover:bg-green-600"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="bg-green-500 font-bold text-white px-3 py-1 rounded-lg hover:bg-green-600"
                      >
                        {loading ? <div className="animate-spin">C</div> : "-"}
                      </button>
                      <button
                        onClick={() => handleRemoveWholeItem(item)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">Total: ₹{cart.total}</h2>
                <div className="flex gap-1 md:space-x-4">
                  <button
                    onClick={handleRemoveCart}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 "
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => navigate("/user/cheackout/")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
