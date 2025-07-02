import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import filterReducer from "./filterSlice";
import { loggerMiddleware } from "./loggerMiddleware";
import { loadCartState, saveCartState } from "./localStorage";
import userReducer from "./userSlice";

const preloadedCart = loadCartState();
const persistedUser = localStorage.getItem("user");

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    filter: filterReducer,
    user: userReducer,
  },
  preloadedState: {
    cart: { items: preloadedCart },
    user: {
      user: persistedUser ? JSON.parse(persistedUser) : null,
      status: "idle" as "idle" | "loading" | "succeeded" | "failed",
      error: null,
    },
  },

  // middleware по умолчанию + logger
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

store.subscribe(() => {
  const state = store.getState();
  saveCartState(state.cart.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
