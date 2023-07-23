import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

const items = [
  {
    label: <h1>Online Store</h1>,
    key: "home",
  },
  {
    label: "Products",
    key: "products",
  },
  {
    label: "Shopping Cart",
    key: "shoppingCart",
  },
];

export default function NavBar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("products");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  useEffect(() => {
    if (current === "shoppingCart") {
      navigate("/shopping-cart");
    } else {
      navigate("/");
    }
  }, [navigate, current]);

  return (
    <Menu
      id="navBar"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}
