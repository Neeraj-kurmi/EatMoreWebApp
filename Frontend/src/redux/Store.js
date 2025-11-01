import { combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer  from "./Slices/authSlice"
import cartReducer from "./Slices/cartSlice"
import orderReducer from "./Slices/orderSlice"
import adminReducer from "./Slices/adminSlice"
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    admin:adminReducer, 
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig,rootReducer);

const store =configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => // Ignore redux-persist actions
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    })
})

export default store;


