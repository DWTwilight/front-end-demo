import React from "react";
import Price from "./Price";
import CartList from "./CartList";
import { Button } from "antd";

export default function Cart({ cartProducts }) {
  return (
    <div id="cart-overview">
      <h3>Shopping Cart</h3>
      <CartList cartProducts={cartProducts} />
      <div className="checkout-area">
        <h4>
          Total:{" "}
          <Price
            price={cartProducts
              .map((product) => product.quantity * product.price)
              .reduce((x, y) => x + y, 0)}
          />
        </h4>
        <Button type="primary">Check Out</Button>
      </div>
    </div>
  );
}
