import React from "react";
import { convertToDisplayPrice } from "../../../util/priceUtil";

export default function Price({ price, discountPrice }) {
  const hasDiscount = discountPrice && discountPrice !== price;
  return (
    <div className="price-info">
      <span
        className={hasDiscount ? "original-price-discount" : "original-price"}
      >
        ${convertToDisplayPrice(price)}
      </span>
      {hasDiscount ? (
        <span className="discount-price">
          ${convertToDisplayPrice(discountPrice)}
        </span>
      ) : null}
    </div>
  );
}
