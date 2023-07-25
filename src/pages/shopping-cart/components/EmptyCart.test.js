import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyCart from "./EmptyCart";

describe("EmptyCart test", () => {
  test("should render EmptyCart", () => {
    render(<EmptyCart />);

    expect(screen.getByText("购物车是空的")).toBeInTheDocument();
  });
});
