export const getCombinedCartProductInfo = (cartProducts, productsInfo) => {
  if (!productsInfo.length) {
    return [];
  }
  const productInfoMap = new Map(productsInfo.map((info) => [info.id, info]));
  return cartProducts.map((cartProduct) =>
    combineCartProductInfo(
      cartProduct,
      productInfoMap.get(cartProduct.productId)
    )
  );
};

const combineCartProductInfo = (cartProduct, productInfo) => {
  return {
    ...cartProduct,
    name: productInfo.name,
    price: productInfo.price,
  };
};

export const DISCOUNT_TYPE = {
  NO_DISCOUNT: () => 0,
  TEN_PERCENT_OFF: (totalPrice) => totalPrice * 0.1,
  D_150_EVERY_1000: (totalPrice) => Math.floor(totalPrice / 1000) * 150,
  D_500_EVERY_3000: (totalPrice) => Math.floor(totalPrice / 3000) * 500,
};

export const getRecommendedDiscountType = (cartItems) => {
  const totalPrice = cartItems
    .map((product) => product.quantity * product.price)
    .reduce((x, y) => x + y, 0);
  if (totalPrice < 0) return null;

  let index = 0;
  let discountPrice = -1;
  const discountTypes = Object.values(DISCOUNT_TYPE);
  discountTypes.forEach((discountType, i) => {
    if (discountType(totalPrice) > discountPrice) {
      discountPrice = discountType(totalPrice);
      index = i;
    }
  });
  return Object.keys(DISCOUNT_TYPE)[index];
};

export const calculateDiscount = (cartItems, discountType) => {
  const totalPrice = cartItems
    .map((product) => product.quantity * product.price)
    .reduce((x, y) => x + y, 0);
  const totalDiscount = discountType(totalPrice);
  return {
    totalPrice,
    totalDiscountPrice: totalPrice - totalDiscount,
    cartItems: cartItems.map((cartItem) =>
      getDiscountCartItem(cartItem, totalDiscount, totalPrice)
    ),
  };
};

const getDiscountCartItem = (cartItem, totalDiscount, totalPrice) => {
  return {
    ...cartItem,
    discountPrice:
      cartItem.price - (totalDiscount * cartItem.price) / totalPrice,
  };
};
