import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSearch, setSort } from "../store/filterSlice";

const ProductFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Поиск․․․"
        value={filter.search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <select
        value={filter.sort}
        onChange={(e) => dispatch(setSort(e.target.value as "name" | "price"))}
        style={{ padding: "5px" }}
      >
        <option value="name">Сортировать по названию</option>
        <option value="price">Сортировать по цене</option>
      </select>
    </div>
  );
};

export default ProductFilter;
