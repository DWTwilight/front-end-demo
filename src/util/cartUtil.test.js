import {
  DISCOUNT_TYPE,
  calculateDiscount,
  getCombinedCartProductInfo,
  getRecommendedDiscountType,
} from "./cartUtil";

describe("cart util test", () => {
  test("should get combine cart product info", () => {
    const cartProduct = [
      {
        productId: 1,
        quantity: 4,
        id: 1,
      },
      {
        productId: 4,
        quantity: 5,
        id: 2,
      },
    ];
    const productsInfo = [
      {
        id: 1,
        name: "法拉利",
        description:
          "法拉利跑车作为世界上唯一一家始终将 F1 技术应用到新车上的公司，法拉利制造了现今最好的高性能公路跑车，因而备感自豪。",
        price: 100,
      },
      {
        id: 4,
        name: "奔驰",
        description:
          "奔驰是世界著名的汽车品牌，是戴姆勒-奔驰公司的核心品牌，总部设在德国斯图加特。",
        price: 400,
      },
    ];

    const combinedInfo = getCombinedCartProductInfo(cartProduct, productsInfo);
    expect(combinedInfo).toEqual([
      {
        id: 1,
        name: "法拉利",
        price: 100,
        productId: 1,
        quantity: 4,
      },
      {
        id: 2,
        name: "奔驰",
        price: 400,
        productId: 4,
        quantity: 5,
      },
    ]);
  });

  test("should calculate discount", () => {
    const cartItems = [
      {
        id: 1,
        name: "法拉利",
        price: 100,
        productId: 1,
        quantity: 10,
      },
      {
        id: 2,
        name: "奔驰",
        price: 200,
        productId: 4,
        quantity: 10,
      },
    ];
    expect(
      calculateDiscount(cartItems, DISCOUNT_TYPE.NO_DISCOUNT).totalDiscountPrice
    ).toEqual(3000);
    expect(
      calculateDiscount(cartItems, DISCOUNT_TYPE.TEN_PERCENT_OFF)
        .totalDiscountPrice
    ).toEqual(2700);
    expect(
      calculateDiscount(cartItems, DISCOUNT_TYPE.D_150_EVERY_1000)
        .totalDiscountPrice
    ).toEqual(2550);
    expect(
      calculateDiscount(cartItems, DISCOUNT_TYPE.D_500_EVERY_3000)
        .totalDiscountPrice
    ).toEqual(2500);
  });

  test("should get recommended discount type as TEN_PERCENT_OFF", () => {
    const cartItems = [
      {
        id: 1,
        name: "法拉利",
        price: 100,
        productId: 1,
        quantity: 10,
      },
      {
        id: 2,
        name: "奔驰",
        price: 200,
        productId: 4,
        quantity: 4,
      },
    ];

    const recommendedDiscountType = getRecommendedDiscountType(cartItems);
    expect(recommendedDiscountType).toEqual("TEN_PERCENT_OFF");
  });

  test("should get recommended discount type as D_150_EVERY_1000", () => {
    const cartItems = [
      {
        id: 1,
        name: "法拉利",
        price: 100,
        productId: 1,
        quantity: 10,
      },
      {
        id: 2,
        name: "奔驰",
        price: 200,
        productId: 4,
        quantity: 8,
      },
    ];

    const recommendedDiscountType = getRecommendedDiscountType(cartItems);
    expect(recommendedDiscountType).toEqual("D_150_EVERY_1000");
  });

  test("should get recommended discount type as D_500_EVERY_3000", () => {
    const cartItems = [
      {
        id: 1,
        name: "法拉利",
        price: 100,
        productId: 1,
        quantity: 10,
      },
      {
        id: 2,
        name: "奔驰",
        price: 200,
        productId: 4,
        quantity: 10,
      },
    ];

    const recommendedDiscountType = getRecommendedDiscountType(cartItems);
    expect(recommendedDiscountType).toEqual("D_500_EVERY_3000");
  });
});
