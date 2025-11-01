import "./index.css";
import SignIn from "./components/pages/auth/SignIn";
import SignUp from "./components/pages/auth/SignUp";
import Navbar from "./components/shared/Navbar";
import Cart from "./components/pages/user/Cart";
import RestaurantPage from "./components/pages/user/RestaurantsPage";
import OrderHistory from "./components/pages/user/OrderHistory";
import CheackOut from "./components/pages/user/CheackOut";
import { Toaster } from "sonner";
import AddRestaurants from "./components/pages/admin/AddRestaurants";
import AddMenuItems from "./components/pages/admin/AddMenuItems";
import Restaurants from "./components/pages/admin/Restaurants";
import MenuItems from "./components/pages/admin/MenuItems";
import Routing from "./Routes/Routing";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <>
      <Toaster  />
      <Routing/>
    </>
  );
}

export default App;
