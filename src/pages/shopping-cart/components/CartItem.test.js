import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CartItem from "./CartItem";
import {
  removeCartProduct,
  updateCartProduct,
} from "../../../api/shoppingCart";
import {
  ACTIONS,
  ShoppingCartContext,
  updateCartItem,
} from "../../../context/ShoppingCartProvider";
import userEvent from "@testing-library/user-event";

jest.mock("../../../api/shoppingCart");

describe("CartItem test", () => {
  const mockDispatch = jest.fn();

  test("should render CartItem", () => {
    const product = {
      productId: 4,
      quantity: 5,
      id: 1,
      price: 200,
      name: "奔驰",
    };

    render(
      <ShoppingCartContext.Provider
        value={{ cartProducts: [product], dispatch: mockDispatch }}
      >
        <CartItem cartProduct={product} index={1} />
      </ShoppingCartContext.Provider>
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("奔驰(4)")).toBeInTheDocument();
    expect(screen.getByText("$200.00")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("Remove Item")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  test("should remove cart item", async () => {
    const product = {
      productId: 4,
      quantity: 5,
      id: 1,
      price: 200,
      name: "奔驰",
    };

    render(
      <ShoppingCartContext.Provider
        value={{ cartProducts: [product], dispatch: mockDispatch }}
      >
        <CartItem cartProduct={product} index={1} />
      </ShoppingCartContext.Provider>
    );

    userEvent.click(screen.getByText("Remove Item"));

    await waitFor(() => {
      expect(removeCartProduct).toBeCalledWith(product.id);
    });
    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        type: ACTIONS.REMOVE_CART_PRODUCT,
        payload: {
          id: product.id,
        },
      });
    });
  });

  test("should increase quantity", async () => {
    const product = {
      productId: 4,
      quantity: 5,
      id: 1,
      price: 200,
      name: "奔驰",
    };

    render(
      <ShoppingCartContext.Provider
        value={{ cartProducts: [product], dispatch: mockDispatch }}
      >
        <CartItem cartProduct={product} index={1} />
      </ShoppingCartContext.Provider>
    );
    const updatedItem = { ...product, quantity: 6 };
    updateCartProduct.mockResolvedValue(updatedItem);

    userEvent.click(screen.getByText("+"));

    await waitFor(() => {
      expect(updateCartProduct).toBeCalledWith(updatedItem);
    });
    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        type: ACTIONS.UPDATE_CART_PRODUCT,
        payload: {
          product: updatedItem,
        },
      });
    });
  });

  test("should decrease quantity", async () => {
    const product = {
      productId: 4,
      quantity: 5,
      id: 1,
      price: 200,
      name: "奔驰",
    };

    render(
      <ShoppingCartContext.Provider
        value={{ cartProducts: [product], dispatch: mockDispatch }}
      >
        <CartItem cartProduct={product} index={1} />
      </ShoppingCartContext.Provider>
    );
    const updatedItem = { ...product, quantity: 4 };
    updateCartProduct.mockResolvedValue(updatedItem);

    userEvent.click(screen.getByText("-"));

    await waitFor(() => {
      expect(updateCartProduct).toBeCalledWith(updatedItem);
    });
    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        type: ACTIONS.UPDATE_CART_PRODUCT,
        payload: {
          product: updatedItem,
        },
      });
    });
  });
});
