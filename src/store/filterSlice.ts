import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "./types";

const initialState: ProductState["filter"] = {
  search: "",
  sort: "name",
  page: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(state, action: PayloadAction<"name" | "price">) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setSearch, setSort, setPage } = filterSlice.actions;
export default filterSlice.reducer;
