import React from "react";
import { Button } from "antd";
import Price from "./Price";

export default function CartItem({ cartProduct, index }) {
  return (
    <li key={index} className="cart-item">
      <span className="cart-item-id">{index + 1}</span>
      <span className="cart-item-name">
        {cartProduct.name}({cartProduct.productId})
      </span>
      <Price price={cartProduct.price} />
      <div className="cart-item-quantity-selector">
        <Button shape="circle" size="small">
          +
        </Button>
        <span>{cartProduct.quantity}</span>
        <Button shape="circle" size="small">
          -
        </Button>
      </div>
      <Button className="cart-item-remove-btn" type="primary" danger>
        Remove Item
      </Button>
    </li>
  );
}
