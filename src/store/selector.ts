import { createSelector } from "reselect";
import { RootState } from "./store";

export const selectProducts = (state: RootState) => state.products.items;
export const selectFilter = (state: RootState) => state.filter;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilter],
  (products, filter) => {
    const filtered = [...products]
      .filter((p) => p.name.toLowerCase().includes(filter.search.toLowerCase()))
      .sort((a, b) => {
        if (filter.sort === "name") return a.name.localeCompare(b.name);
        if (filter.sort === "price") return a.price - b.price;
        return 0;
      });

    const startIndex = (filter.page - 1) * 10;
    const paginated = filtered.slice(startIndex, startIndex + 10);

    return paginated;
  }
);
