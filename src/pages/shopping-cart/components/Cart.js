import React from "react";
import Price from "./Price";
import CartList from "./CartList";
import { Button } from "antd";
import { calculateDiscount } from "../../../util/cartUtil";

export default function Cart({ cartProducts }) {
  const discountCartItems = calculateDiscount(cartProducts);
  return (
    <div id="cart-overview">
      <h3>Shopping Cart</h3>
      <CartList cartProducts={discountCartItems.cartItems} />
      <div className="checkout-area">
        <h4>
          Total:
          <Price
            price={discountCartItems.totalPrice}
            discountPrice={discountCartItems.totalDiscountPrice}
          />
        </h4>
        <Button type="primary">Check Out</Button>
      </div>
    </div>
  );
}
