import React from "react";
import { render, screen } from "@testing-library/react";
import CartItem from "./CartItem";

describe("CartItem test", () => {
  test("should render CartItem", () => {
    const product = {
      productId: 4,
      quantity: 5,
      id: 1,
      price: 200,
      name: "奔驰",
    };
    render(<CartItem cartProduct={product} index={1} />);

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("奔驰(4)")).toBeInTheDocument();
    expect(screen.getByText("$200.00")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("Remove Item")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });
});
