import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchProducts } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";
import ProductEditor from "./ProductEditor";
import { selectFilteredProducts } from "../store/selector";
import Pagination from "./Pagination";
import { Product } from "../store/types";

const ProductsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectFilteredProducts);
  const [editongProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Products</h2>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {product.map((product) => (
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
            </button>{" "}
            <button onClick={() => setEditingProduct(product)}>Edit</button>
          </li>
        ))}
        <Pagination />
      </ul>
      {editongProduct && (
        <ProductEditor
          product={editongProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsList;
