import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "./types";
import { fetchProductsAPI as fetchProductsAPI } from "../api/fetchProducts";

export const fetchProducts = createAsyncThunk<Product[]>(
  "product/fetchProductsAPI",
  async () => {
    const response = await fetchProductsAPI();
    return response;
  }
);

const initialState: ProductState = {
  items: [],
  status: "idle",
  error: null,
  filter: {
    search: "",
    sort: "name",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";

        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
