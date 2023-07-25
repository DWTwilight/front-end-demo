import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "./ProductList";

const products = [
  {
    id: 1,
    name: "法拉利",
    description:
      "法拉利跑车作为世界上唯一一家始终将 F1 技术应用到新车上的公司，法拉利制造了现今最好的高性能公路跑车，因而备感自豪。",
    price: 100,
  },
  {
    id: 2,
    name: "兰博基尼",
    description:
      "兰博基尼希望可以采用类似于法拉利的3升V12引擎，但他希望引擎的设计纯粹是为了在普通道路上使用。对比了修改后的法拉利公路车使用的引擎。",
    price: 200,
  },
  {
    id: 3,
    name: "保时捷",
    description:
      "保时捷是德国汽车制造商，总部位于斯图加特。保时捷公司由费迪南德·保时捷于1931年在斯图加特成立，主要生产高性能跑车、SUV和轿车。",
    price: 300,
  },
];

describe("ProductList test", () => {
  test("should render ProductList", () => {
    render(<ProductList products={products} />);

    expect(screen.getAllByRole("img")).toHaveLength(3);
  });
});
