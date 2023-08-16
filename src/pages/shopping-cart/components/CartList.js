import React from "react";
import { Divider } from "antd";
import CartItem from "./CartItem";

export default function CartList({ cartProducts }) {
  return (
    <ul className="cart-list">
      {cartProducts
        ? cartProducts.map((cartProduct, index) => (
            <>
              <CartItem cartProduct={cartProduct} index={index} />
              <Divider />
            </>
          ))
        : null}
    </ul>
  );
}
