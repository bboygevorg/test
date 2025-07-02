import { Middleware } from "@reduxjs/toolkit";

export const loggerMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    console.log("[LOGGER] Dispatching:", action);
    const result = next(action);
    console.log("[LOGGER] Next state:", storeAPI.getState());
    return result;
  };
