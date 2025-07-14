import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "./types";
import { fetchProductsAPI as fetchProductsAPI } from "../api/fetchProducts";
import { RootState } from "./store";

export const fetchProducts = createAsyncThunk<
  { data: Product[]; totalCount: number },
  void,
  { state: RootState }
>("product/fetchProductsAPI", async (_, { getState }) => {
  const { search, sort, page } = getState().products.filter;
  const response = await fetchProductsAPI({ search, sort, page });
  return response;
});

const initialState: ProductState = {
  items: [],
  status: "idle",
  error: null,
  totalCount: 0,
  filter: {
    search: "",
    sort: "name",
    page: 1,
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
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
