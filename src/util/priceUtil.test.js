import { convertToDisplayPrice } from "./priceUtil";

describe("price util test", () => {
  test("should convert to display price", () => {
    const displayPrice = convertToDisplayPrice(100);
    expect(displayPrice).toEqual("100.00");
  });
});
