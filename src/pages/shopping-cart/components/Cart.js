import React, { useEffect, useState } from "react";
import Price from "./Price";
import CartList from "./CartList";
import { Button, Radio } from "antd";
import { DISCOUNT_TYPE, calculateDiscount } from "../../../util/cartUtil";

export default function Cart({ cartProducts, recommendedDiscountType }) {
  const [discountType, setDiscountType] = useState("NO_DISCOUNT");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setDiscountType(recommendedDiscountType);
  }, [recommendedDiscountType]);

  useEffect(() => {
    setCartItems(calculateDiscount(cartProducts, DISCOUNT_TYPE[discountType]));
  }, [cartProducts, discountType]);

  function onDiscountTypeRadioChange(e) {
    setDiscountType(e.target.value);
  }

  return (
    <div id="cart-overview">
      <h3>Shopping Cart</h3>
      <CartList cartProducts={cartItems.cartItems} />
      <div className="checkout-area">
        <h4>Discount Type:</h4>
        <Radio.Group
          value={discountType}
          buttonStyle="solid"
          onChange={onDiscountTypeRadioChange}
        >
          <Radio.Button value="NO_DISCOUNT">No Discount</Radio.Button>
          <Radio.Button value="TEN_PERCENT_OFF">10% Off</Radio.Button>
          <Radio.Button value="D_150_EVERY_1000">$150 Off $1000</Radio.Button>
          <Radio.Button value="D_500_EVERY_3000">$500 Off $3000</Radio.Button>
        </Radio.Group>
        <h4>
          Total:
          <Price
            price={cartItems.totalPrice}
            discountPrice={cartItems.totalDiscountPrice}
          />
        </h4>
        <Button type="primary">Check Out</Button>
      </div>
    </div>
  );
}
