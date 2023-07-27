import React from "react";
import { Button, Card } from "antd";
import { convertToDisplayPrice } from "../../../util/priceUtil";

const { Meta } = Card;

export default function ProductInfo({ product }) {
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
          <Button type="primary" danger>
            Add to Cart
          </Button>,
        ]}
      >
        <Meta title={product.name} description={product.description} />
      </Card>
    </li>
  );
}
