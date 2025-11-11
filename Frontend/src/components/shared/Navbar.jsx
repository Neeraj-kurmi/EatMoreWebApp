import { Avatar, IconButton } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/Slices/authSlice";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userCart=useSelector((state)=>state.cart.carts);


  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/user/search?query=${query}`);
    }
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  return (
    <div>
      <div className="px-5 z-50 p-1 bg-gradient-to-l from-orange-500 to-red-500 lg:px-10 flex justify-between items-center">
        <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
          <img
            onClick={() => navigate("/")}
            src="/src/public/logo.jpg"
            className="h-15 w-15 rounded-full cursor-pointer"
            alt="Logo"
          />
          <li className="logo list-none italic font-semibold text-gray-300 text-2xl">
            Eat<span className="text-orange-400">More</span>
          </li>
        </div>

        <div className="hidden md:flex gap-2 h-10">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search food , restaurents and more . . ."
              className="lg:w-150 md:w-100 px-4 py-3 border-2 text-white border-orange-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-950"
            />
            <IconButton onClick={handleSearch}>
              <BsSearchHeart className="text-white text-xl" />
            </IconButton>
          </div>

        <div className="flex items-center space-x-2 lg:space-x-10">
          

          <div className="relative" ref={dropdownRef}>
            <Avatar
              onClick={() => setDropdownOpen(!dropdownOpen)}
              sx={{ bgcolor: "black", cursor: "pointer" }}
            >
              {user?.firstName ? user.firstName[0].toUpperCase() : "U"} 
            </Avatar>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/user/profile");
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/user/profile");
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("user/login");
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="">
            <IconButton className="text-white " onClick={() => navigate("/user/cart")}>
              <FaCartPlus className="text-white text-xl" />
            </IconButton>
            {userCart?.items.length > 0 && (
          <span className="absolute top-3 right-4 md:right-8 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {userCart?.items.length}
          </span>
        )}
          </div>
        </div>

    </div>
    <div className="md:hidden px-5 pt-3 flex gap-2 bg-gradient-to-l from-orange-500 to-red-500 justify-center w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search food here..."
              className="w-160 px-4 py-2 my-2 border-2 text-white border-orange-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-950"
            />
            <IconButton onClick={handleSearch}>
              <BsSearchHeart className="text-white text-xl" />
            </IconButton>
          </div>
    </div>
      
    
  );
};

export default Navbar;
