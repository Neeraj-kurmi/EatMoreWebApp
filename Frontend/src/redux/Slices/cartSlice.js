import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../../components/pages/user/LoggedOut";

const initialState= {
    carts: null, // { userId: { items: [], total: 0 } }
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart:(state,action)=>{
        state.carts=action.payload;
    },

    addToCart: (state, action) => {
      const {item } = action.payload;
      if (!state.carts) {
        state.carts = { items: [], total: 0 };
      }
      
      const userCart = state.carts;
      const existing = userCart.items.find((i) => i.id===item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        userCart.items.push({ ...item, quantity: 1 });
      }
      userCart.total += Number(item.price);
    },

    removeFromCart: (state, action) => {
      const {item } = action.payload;
      const userCart = state.carts;
      if (!userCart) return;

      const existing = userCart.items.find((i) => i.id === item.id);
      if (!existing) return;

      existing.quantity -= 1;
      userCart.total -= existing.price;

      if (existing.quantity === 0) {
        userCart.items = userCart.items.filter((i) => i.id !== item.id);
      }
    },

    removeItemFromCart: (state, action) => {
      const {itemId } = action.payload;
      const userCart = state.carts;
      if (!userCart) return;
      const existing = userCart.items.find((i) => i.id === itemId);
      userCart.items = userCart.items.filter((i) => i.id !== itemId);
      if (!existing) return;
      userCart.total -= existing.price;
      console.log(userCart.total)
    },

    clearCart: (state) => {
      state.carts=null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => initialState);
  },
});

export const { addToCart, removeFromCart, clearCart ,removeItemFromCart,addCart} = cartSlice.actions;
export default cartSlice.reducer;
