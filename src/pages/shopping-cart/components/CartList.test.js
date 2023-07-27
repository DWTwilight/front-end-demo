import React from "react";
import { render, screen } from "@testing-library/react";
import CartList from "./CartList";

describe("CartList test", () => {
  test("should render CartList", () => {
    const products = [
      {
        productId: 4,
        quantity: 5,
        id: 1,
        price: 200,
        name: "奔驰",
      },
      {
        productId: 3,
        quantity: 2,
        id: 2,
        price: 100,
        name: "法拉利",
      },
    ];

    render(<CartList cartProducts={products} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
