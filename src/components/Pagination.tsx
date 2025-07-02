import React from "react";
import { setPage } from "../store/filterSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);
  const totalProducts = useAppSelector((state) => state.products.items.length);

  const totalPages = Math.ceil(totalProducts / 10);

  return (
    <div>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          style={{
            margin: "0 4px",
            padding: "4px 8px",
            background: filter.page === i + 1 ? "#555" : "#ddd",
            color: filter.page === i + 1 ? "#fff" : "#000",
          }}
          onClick={() => dispatch(setPage(i + 1))}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
