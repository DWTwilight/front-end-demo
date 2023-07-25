import React from "react";
import { Empty } from "antd";

export default function EmptyCart() {
  return <Empty id="empty-cart" description={<span>购物车是空的</span>} />;
}
