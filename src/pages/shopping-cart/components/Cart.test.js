import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Cart from "./Cart";
import userEvent from "@testing-library/user-event";

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
    render(
      <Cart
        cartProducts={products}
        recommendedDiscountType={"D_150_EVERY_1000"}
      />
    );

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
    render(
      <Cart cartProducts={products} recommendedDiscountType={"NO_DISCOUNT"} />
    );

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("Check Out")).toBeInTheDocument();

    expect(screen.getByText("$100.00")).toBeInTheDocument();

    expect(screen.getByText("$400.00")).toBeInTheDocument();

    expect(screen.getByText("$800.00")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("should choose discount type", async () => {
    const products = [
      {
        productId: 4,
        quantity: 10,
        id: 1,
        price: 200,
        name: "奔驰",
      },
      {
        productId: 3,
        quantity: 10,
        id: 2,
        price: 100,
        name: "法拉利",
      },
    ];
    render(
      <Cart cartProducts={products} recommendedDiscountType={"NO_DISCOUNT"} />
    );
    expect(screen.getByText("$3000.00")).toBeInTheDocument();

    userEvent.click(screen.getByText("10% Off"));
    await waitFor(() => {
      expect(screen.getByText("$2700.00")).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("$150 Off $1000"));
    await waitFor(() => {
      expect(screen.getByText("$2550.00")).toBeInTheDocument();
    });

    userEvent.click(screen.getByText("$500 Off $3000"));
    await waitFor(() => {
      expect(screen.getByText("$2500.00")).toBeInTheDocument();
    });
  });
});
