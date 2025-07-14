import React from "react";
import ProductFilter from "../components/ProductFilter";
import ProductsList from "../components/ProductsList";

const ProductsPage = () => {
  return (
    <div style={{ flex: "2" }}>
      <ProductFilter />
      <ProductsList />
    </div>
  );
};

export default ProductsPage;
