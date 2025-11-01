import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "../components/pages/user/Home"
import Cart from "../components/pages/user/Cart"
import OrderHistory from "../components/pages/user/OrderHistory"
import RestaurantsPage from "../components/pages/user/RestaurantsPage"
import CheackOut from "../components/pages/user/CheackOut"
import Restaurants from "../components/pages/admin/Restaurants"
import MenuItems from "../components/pages/admin/MenuItems"
import Orders from "../components/pages/admin/Orders"
import Profile from "../components/pages/user/Profile"
import SearchResults from "../components/pages/user/SearchResults "
import SignUp from "../components/pages/auth/SignUp"
import SignIn from "../components/pages/auth/SignIn"

const Routing = () => {
  const allRoutes=createBrowserRouter([

    { path:"/",element:<Home/> },
    { path:"/user/profile" , element:<Profile/>},
    { path:"/user/cart" , element:<Cart/>},
    { path:"/user/cheackout" , element:<CheackOut/>},
    { path:"/user/orderhistory" , element:<OrderHistory/>},
    { path:"/user/restaraunt/:restId" , element:<RestaurantsPage/>},
    { path:"/user/search" , element:<SearchResults/>},
    { path:"/user/register" , element:<SignUp/>},
    { path:"/user/login" , element:<SignIn/>},

    { path:"/admin/restaraunts",element:<Restaurants/> },
    { path:"/admin/menu/:rId",element:<MenuItems/> },
    { path:"/admin/orders",element:<Orders/> },


  ])
  return (
      <RouterProvider router={allRoutes}/>
  )
}

export default Routing