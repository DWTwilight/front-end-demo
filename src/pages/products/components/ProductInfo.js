import React, { useContext } from "react";
import { Button, Card, message } from "antd";
import { convertToDisplayPrice } from "../../../util/priceUtil";
import {
  ACTIONS,
  ShoppingCartContext,
} from "../../../context/ShoppingCartProvider";
import {
  createCartProduct,
  updateCartProduct,
} from "../../../api/shoppingCart";

const { Meta } = Card;

export default function ProductInfo({ product }) {
  const { cartProducts, dispatch } = useContext(ShoppingCartContext);

  async function addToCart() {
    try {
      const existingCarProduct = cartProducts.find(
        (p) => p.productId === product.id
      );
      if (existingCarProduct) {
        // increment
        existingCarProduct.quantity++;
        const updatedCartProduct = await updateCartProduct(existingCarProduct);
        dispatch({
          type: ACTIONS.UPDATE_CART_PRODUCT,
          payload: {
            product: updatedCartProduct,
          },
        });
      } else {
        const createdCartProduct = await createCartProduct({
          productId: product.id,
          quantity: 1,
        });
        dispatch({
          type: ACTIONS.ADD_CART_PRODUCT,
          payload: {
            product: createdCartProduct,
          },
        });
      }
      message.success("Add item to cart successfully!");
    } catch (err) {
      message.error("System Error!");
    }
  }

  return (
    <li className="product-info">
      <Card
        className="product-card"
        cover={
          <img
            alt="example"
            src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960"
          />
        }
        actions={[
          <span>${convertToDisplayPrice(product.price)}</span>,
          <Button type="primary" danger onClick={addToCart}>
            Add to Cart
          </Button>,
        ]}
      >
        <Meta title={product.name} description={product.description} />
      </Card>
    </li>
  );
}
