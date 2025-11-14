import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../shared/Navbar";
import useAddItem from "../../../hooks/useAddItem";

export default function RestaurantPage() {
  const {restId}=useParams();

  const carts= useSelector((state) => state.cart.carts);
  
  let cartItems=null;
  if(carts)cartItems=carts?.items;
  

  const restaurants=useSelector((state)=>state.admin.restaurants);
  const restaurant = restaurants.find((r) =>r.id === restId);
  
  const {addItem}=useAddItem();

  const cartHandler=async(item)=>{
          addItem(item)
  }
  
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 mx-auto">

      <div className="relative">
        <img
          src={restaurant?.image}
          alt="Restaurant Banner"
          className="w-full h-100 object-cover"
        />
        <div className="absolute bottom-4 left-6 bg-white p-4 rounded shadow">
          <h2 className="text-3xl font-bold">{restaurant?.cuisine}</h2>
          <p>⭐ {restaurant?.rating} | {restaurant?.name} | 30-40 min | ₹200-₹500</p>
        </div>
      </div>
      {
        restaurant.menu.length<=0 && <h1 className=" text-gray-500 ml-6">currently this service unavailable...</h1>
      }
      <div className=" ">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-full gap-4 p-3">
          {restaurant.menu?.map((item) => {
            const alreadyInCart = cartItems?.some(
              (cartItem) => cartItem.id === item.id
            );
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 items-center md:justify-between p-4 bg-white shadow rounded-lg "
              >
                <div>
                  <img src={item.image} className="h-40 w-80 rounded-2xl mb-2" />
                  <div className="flex justify-between ">
                    <div><h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p></div>
                    <div><button   disabled={alreadyInCart}
                  onClick={() => {
                    cartHandler(item)
                  }} 
                  className={`px-4 py-2 rounded ${
                    alreadyInCart
                      ? "bg-orange-300 cursor-not-allowed text-white"
                      : "bg-orange-600 hover:bg-orange-500 text-white"
                  }`}
                >
                  {alreadyInCart ? "Added to Cart" : "Add to Cart"}
                </button></div>
                  </div>
                  
                </div>
                
              </div>
            );
          })}
        </div>

      </div>
    </div>
    </>
  );
}
