import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "./Cart";

describe("Cart test", () => {
  test("should render Cart with discount", () => {
    const products = [
      {
        productId: 4,
        quantity: 5,
        id: 1,
        price: 400,
        name: "奔驰",
      },
      {
        productId: 3,
        quantity: 4,
        id: 2,
        price: 100,
        name: "法拉利",
      },
    ];
    render(<Cart cartProducts={products} />);

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("Check Out")).toBeInTheDocument();

    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("$87.50")).toBeInTheDocument();

    expect(screen.getByText("$400.00")).toBeInTheDocument();
    expect(screen.getByText("$350.00")).toBeInTheDocument();

    expect(screen.getByText("$2400.00")).toBeInTheDocument();
    expect(screen.getByText("$2100.00")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("should render Cart without discount", () => {
    const products = [
      {
        productId: 4,
        quantity: 1,
        id: 1,
        price: 400,
        name: "奔驰",
      },
      {
        productId: 3,
        quantity: 4,
        id: 2,
        price: 100,
        name: "法拉利",
      },
    ];
    render(<Cart cartProducts={products} />);

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("Check Out")).toBeInTheDocument();

    expect(screen.getByText("$100.00")).toBeInTheDocument();

    expect(screen.getByText("$400.00")).toBeInTheDocument();

    expect(screen.getByText("$800.00")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
