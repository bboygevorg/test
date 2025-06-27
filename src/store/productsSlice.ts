import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "./types";
import { fetchProducts as fetchProductsAPI } from "../api/fetchProducts";

export const fetchProducts = createAsyncThunk<Product[]>(
  "product/fetchProducts",
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
    setSearch(state, action: PayloadAction<string>) {
      state.filter.search = action.payload;
    },
    setSort(state, action: PayloadAction<"name" | "price">) {
      state.filter.sort = action.payload;
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

export const { setSearch, setSort } = productsSlice.actions;
export default productsSlice.reducer;
