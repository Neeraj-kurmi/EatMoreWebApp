import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../shared/Navbar";

export default function SearchResults() {
  const location = useLocation();
  const navigate=useNavigate();
  const query = new URLSearchParams(location.search).get("query")?.toLowerCase();

  const restaurants=useSelector((state)=>state.admin.restaurants);
  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(query) ||
      r.cuisine.toLowerCase().includes(query) ||
      r.menu.some((m) => m.name.toLowerCase().includes(query))
  );
  console.log(filteredRestaurants)
  return (
    <div>
    <Navbar/>
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Search Results for "{query}"
      </h2>

      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredRestaurants.map((rest) => (
            <div key={rest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition">
              <img src={rest.image} alt={rest.name} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-lg font-bold">{rest.name}</h3>
                <p className="text-gray-600">{rest.location}</p>
                <p>{rest?.rating} ⭐⭐⭐⭐</p>
                <p className=" text-gray-400">Please explore restaraunt for your dish 🎉</p>
                <button
                 onClick={()=>navigate(`/user/restaraunt/${rest.id}`)}
                 className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}
    </div>
    </div>
    
  );
}
