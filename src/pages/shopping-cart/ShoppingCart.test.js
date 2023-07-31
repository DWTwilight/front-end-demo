import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";
import { ShoppingCartContext } from "../../context/ShoppingCartProvider";
import { getProducts } from "../../api/product";

jest.mock("../../api/product");

describe("ShoppingCart test", () => {
  const mockDispatch = jest.mock();

  beforeEach(() => {
    getProducts.mockResolvedValue([
      {
        id: 1,
        name: "法拉利",
        description:
          "法拉利跑车作为世界上唯一一家始终将 F1 技术应用到新车上的公司，法拉利制造了现今最好的高性能公路跑车，因而备感自豪。",
        price: 100,
      },
    ]);
  });

  test("should render empty cart", async () => {
    render(
      <ShoppingCartContext.Provider
        value={{ cartProducts: [], dispatch: mockDispatch }}
      >
        <ShoppingCart />
      </ShoppingCartContext.Provider>
    );
    expect(screen.getByText("购物车是空的")).toBeInTheDocument();

    await waitFor(() => {
      expect(getProducts).toBeCalled();
    });
  });

  test("should render cart", async () => {
    render(
      <ShoppingCartContext.Provider
        value={{
          cartProducts: [
            {
              productId: 1,
              quantity: 5,
              id: 1,
            },
          ],
          dispatch: mockDispatch,
        }}
      >
        <ShoppingCart />
      </ShoppingCartContext.Provider>
    );

    await waitFor(() => {
      expect(getProducts).toBeCalled();
    });
    await waitFor(() => {
      expect(screen.getByText("法拉利(1)")).toBeInTheDocument();
    });
  });
});
