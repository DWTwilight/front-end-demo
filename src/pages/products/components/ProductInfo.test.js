import React from "react";
import { render, screen } from "@testing-library/react";
import ProductInfo from "./ProductInfo";

const product = {
  id: 1,
  name: "法拉利",
  description:
    "法拉利跑车作为世界上唯一一家始终将 F1 技术应用到新车上的公司，法拉利制造了现今最好的高性能公路跑车，因而备感自豪。",
  price: 100,
};

describe("ProductInfo test", () => {
  test("should render ProductInfo", () => {
    render(<ProductInfo product={product} />);

    expect(screen.getByText("法拉利")).toBeInTheDocument();
    expect(
      screen.getByText(
        "法拉利跑车作为世界上唯一一家始终将 F1 技术应用到新车上的公司，法拉利制造了现今最好的高性能公路跑车，因而备感自豪。"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });
});
