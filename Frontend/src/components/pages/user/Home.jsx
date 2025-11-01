// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Navbar from "../../shared/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../shared/Footer";
import { useDispatch } from "react-redux";
import { addRestaurant } from "../../../redux/Slices/adminSlice";

const Home = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const [restaurants,setRestaurants]=useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch("http://localhost:8080/allrestraunt");
        if (res.ok) {
          const data = await res.json();
          dispatch(addRestaurant(data));
          setRestaurants(data)
        } else {
          console.error("Failed to fetch restaurants");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRestaurants();
  }, [dispatch]);

 
  return (
    <>
    <Navbar/>
      <div className="bg-gray-50">
      <section className="bg-gradient-to-l from-orange-500 to-red-500 text-white p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Delicious Food, Delivered To You</h1>
        <p className="text-lg mb-6">Order from your favorite restaurants with just a few clicks</p>
        <p
          className=" text-black">
          Search restaurants or dishes...
        </p>
      </section>

      <section className="px-8 py-12">
        <h2 className="text-2xl font-semibold mb-6">Popular Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {restaurants.map((rest) => (
            <div key={rest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition">
              <img src={rest.image} alt={rest.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-lg font-bold">{rest.name}</h3>
                <p className="text-gray-600">{rest.location}</p>
                <button
                 onClick={()=>navigate(`/user/restaraunt/${rest.id}`)}
                 className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Hungry? Let’s Order Now!</h2>
        <button className="px-6 py-3 bg-red-500 text-white rounded-lg text-lg hover:bg-red-600">
          Start Ordering
        </button>
      </section>
     <Footer/>
    </div>
    </>
    
  );
};

export default Home;
