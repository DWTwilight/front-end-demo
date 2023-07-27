import React from "react";
import { convertToDisplayPrice } from "../../../util/priceUtil";

export default function Price({ price }) {
  return <span className="price-info">${convertToDisplayPrice(price)}</span>;
}
