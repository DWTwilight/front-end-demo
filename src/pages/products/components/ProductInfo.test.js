import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProductInfo from "./ProductInfo";
import {
  createCartProduct,
  updateCartProduct,
} from "../../../api/shoppingCart";
import {
  ACTIONS,
  ShoppingCartContext,
} from "../../../context/ShoppingCartProvider";
import userEvent from "@testing-library/user-event";

jest.mock("../../../api/shoppingCart");

const product = {
  id: 1,
  name: "法拉利",
  description:
    "法拉利跑车作为世界上唯一一家始终将 F1 技术应用到新车上的公司，法拉利制造了现今最好的高性能公路跑车，因而备感自豪。",
  price: 100,
};

describe("ProductInfo test", () => {
  const mockDispatch = jest.fn();

  test("should render ProductInfo", () => {
    render(
      <ShoppingCartContext.Provider
        value={{ cartProducts: [], dispatch: mockDispatch }}
      >
        <ProductInfo product={product} />
      </ShoppingCartContext.Provider>
    );

    expect(screen.getByText("法拉利")).toBeInTheDocument();
    expect(
      screen.getByText(
        "法拉利跑车作为世界上唯一一家始终将 F1 技术应用到新车上的公司，法拉利制造了现今最好的高性能公路跑车，因而备感自豪。"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  test("should create cart product", async () => {
    render(
      <ShoppingCartContext.Provider
        value={{ cartProducts: [], dispatch: mockDispatch }}
      >
        <ProductInfo product={product} />
      </ShoppingCartContext.Provider>
    );

    const createdCartProduct = {
      productId: 1,
      quantity: 1,
      id: 1,
    };
    createCartProduct.mockResolvedValue(createdCartProduct);

    userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(createCartProduct).toBeCalledWith({
        productId: product.id,
        quantity: 1,
      });
    });
    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        type: ACTIONS.ADD_CART_PRODUCT,
        payload: {
          product: createdCartProduct,
        },
      });
    });
  });

  test("should increse cart product quantity", async () => {
    render(
      <ShoppingCartContext.Provider
        value={{
          cartProducts: [
            {
              productId: 1,
              quantity: 4,
              id: 2,
            },
          ],
          dispatch: mockDispatch,
        }}
      >
        <ProductInfo product={product} />
      </ShoppingCartContext.Provider>
    );

    const updatedCartProduct = {
      productId: 1,
      quantity: 5,
      id: 2,
    };
    updateCartProduct.mockResolvedValue(updatedCartProduct);

    userEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(updateCartProduct).toBeCalledWith(updatedCartProduct);
    });
    await waitFor(() => {
      expect(mockDispatch).toBeCalledWith({
        type: ACTIONS.UPDATE_CART_PRODUCT,
        payload: {
          product: updatedCartProduct,
        },
      });
    });
  });
});
