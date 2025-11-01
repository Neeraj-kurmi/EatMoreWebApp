import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    restaurants: [],
    orders: null,
  },
  reducers: {
    addRestaurant: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.restaurants = action.payload;
      } else {
        state.restaurants.push(action.payload);
      }
    },
    removeRestaurant: (state, action) => {
      const { rId } = action.payload;
      state.restaurants = state.restaurants.filter((r) => r.id !== rId);
    },

    addMenuItem: (state, action) => {
      const { restId, item } = action.payload;
      const restaurant = state.restaurants.find((r) => r.id === restId);
      restaurant.menu=item;    
    },
    removeMenuItem: (state, action) => {
      const { rId, iId } = action.payload;
      const restaurant = state.restaurants.find((r) => r.id === rId);
      if (restaurant && restaurant.menu) {
        restaurant.menu = restaurant.menu.filter((item) => item.id !== iId);
      }
    },

    addOrderAdmin: (state, action) => {
      state.orders=action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) order.status = status;
    },
  },
});

export const {
  addRestaurant,
  removeRestaurant,
  addMenuItem,
  removeMenuItem,
  addOrderAdmin,
  updateOrderStatus,
} = adminSlice.actions;

export default adminSlice.reducer;
