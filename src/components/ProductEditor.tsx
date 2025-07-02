import React, { useState } from "react";
import { useAppDispatch } from "../hooks";
import { updateProduct } from "../store/productsSlice";
import { Product } from "../store/types";

type Props = {
  product: Product;
  onClose: () => void;
};

const ProductEditor: React.FC<Props> = ({ product, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  console.log(product);

  const handleSubmit = () => {
    dispatch(
      updateProduct({
        ...product,
        name,
        price,
        description,
      })
    );
    onClose();
  };

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}
    >
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={onClose}
          style={{ marginLeft: "0.5rem" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductEditor;
