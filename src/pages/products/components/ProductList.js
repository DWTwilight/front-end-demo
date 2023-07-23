import React from "react";
import ProductInfo from "./ProductInfo";

export default function ProductList({ products }) {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductInfo key={product.id} product={product} />
      ))}
    </ul>
  );
}
