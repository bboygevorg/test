import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProducts } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";

const ProductsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status, error, filter } = useAppSelector(
    (state) => state.products
  );

  const filtered = [...items]
    .filter((p) => p.name.toLowerCase().includes(filter.search.toLowerCase()))
    .sort((a, b) => {
      if (filter.sort === "name") return a.name.localeCompare(b.name);
      if (filter.sort === "price") return a.price - b.price;
      return 0;
    });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Products</h2>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {filtered.map((product) => (
          <li
            key={product.id}
            style={{ border: "1px solid #ccc", padding: "10px", width: 200 }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              width={150}
              height={150}
            />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <strong>{product.price} ₽</strong>
            <button onClick={() => dispatch(addToCart(product))}>
              В корзину
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
