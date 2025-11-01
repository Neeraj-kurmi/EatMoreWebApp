import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../../components/pages/user/LoggedOut";

const initialState= {
    pastOrders: []
  }
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addPastOrders:(state,action)=>{
      state.pastOrders=action.payload
    },
    addOrder: (state,action) => {
      const order=action.payload;
      state.pastOrders.push(order);
    },
    clearOrders: (state) => {
      state.pastOrders= [];
    },
  },
  extraReducers: (builder) => {
      builder.addCase(logoutUser, () => initialState);
  },
});

export const { addOrder, clearOrders,addPastOrders } = orderSlice.actions;
export default orderSlice.reducer;
