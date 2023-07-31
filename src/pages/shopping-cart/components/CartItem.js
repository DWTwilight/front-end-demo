import React, { useContext } from "react";
import { Button, message } from "antd";
import Price from "./Price";
import {
  ShoppingCartContext,
  removeCartItem,
  updateCartItem,
} from "../../../context/ShoppingCartProvider";

export default function CartItem({ cartProduct, index }) {
  const { dispatch } = useContext(ShoppingCartContext);

  async function removeItem() {
    try {
      await removeCartItem(cartProduct.id, dispatch);
      message.success("Successfully removed cart item!");
    } catch (err) {
      console.error(err);
      message.error("System Error!");
    }
  }

  async function addQuantity() {
    try {
      cartProduct.quantity++;
      await updateCartItem(cartProduct, dispatch);
    } catch (err) {
      console.error(err);
      message.error("System Error!");
    }
  }

  async function reduceQuantity() {
    try {
      if (cartProduct.quantity === 1) {
        message.error("Minimum quantity is 1!");
        return;
      }
      cartProduct.quantity--;
      await updateCartItem(cartProduct, dispatch);
    } catch (err) {
      console.error(err);
      message.error("System Error!");
    }
  }

  return (
    <li key={index} className="cart-item">
      <span className="cart-item-id">{index + 1}</span>
      <span className="cart-item-name">
        {cartProduct.name}({cartProduct.productId})
      </span>
      <Price
        price={cartProduct.price}
        discountPrice={cartProduct.discountPrice}
      />
      <div className="cart-item-quantity-selector">
        <Button shape="circle" size="small" onClick={addQuantity}>
          +
        </Button>
        <span>{cartProduct.quantity}</span>
        <Button shape="circle" size="small" onClick={reduceQuantity}>
          -
        </Button>
      </div>
      <Button
        className="cart-item-remove-btn"
        type="primary"
        danger
        onClick={removeItem}
      >
        Remove Item
      </Button>
    </li>
  );
}
