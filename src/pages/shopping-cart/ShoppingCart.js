import React, { useContext, useState, useEffect } from "react";
import EmptyCart from "./components/EmptyCart";
import { ShoppingCartContext } from "../../context/ShoppingCartProvider";
import Cart from "./components/Cart";
import { getProducts } from "../../api/product";
import { getCombinedCartProductInfo } from "../../util/cartUtil";

export default function ShoppingCart() {
  const { products } = useContext(ShoppingCartContext);
  const [productsInfo, setProductsInfo] = useState([]);
  useEffect(() => {
    async function fetchProductsInfo() {
      setProductsInfo(await getProducts());
    }
    fetchProductsInfo();
  }, []);
  return (
    <div className="shopping-cart">
      {products && products.length ? (
        <Cart
          cartProducts={getCombinedCartProductInfo(products, productsInfo)}
        />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
