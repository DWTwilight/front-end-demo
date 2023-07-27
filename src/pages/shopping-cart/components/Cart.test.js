import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "./Cart";

describe("Price test", () => {
  test("should render Price", () => {
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
    render(<Cart cartProducts={products} />);

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("Check Out")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
