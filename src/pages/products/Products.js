import { useEffect, useState } from "react";
import { getProducts } from "../../api/product";
import ProductList from "./components/ProductList";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      setProducts(await getProducts());
    }
    fetchProducts();
  }, []);

  return <ProductList products={products} />;
}
