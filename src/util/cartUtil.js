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

function combineCartProductInfo(cartProduct, productInfo) {
  return {
    ...cartProduct,
    name: productInfo.name,
    price: productInfo.price,
  };
}

export const calculateDiscount = (cartItems) => {
  const totalPrice = cartItems
    .map((product) => product.quantity * product.price)
    .reduce((x, y) => x + y, 0);
  const totalDiscount = Math.floor(totalPrice / 1000) * 150;
  return {
    totalPrice,
    totalDiscountPrice: totalPrice - totalDiscount,
    cartItems: cartItems.map((cartItem) =>
      getDiscountCartItem(cartItem, totalDiscount, totalPrice)
    ),
  };
};

function getDiscountCartItem(cartItem, totalDiscount, totalPrice) {
  return {
    ...cartItem,
    discountPrice:
      cartItem.price - (totalDiscount * cartItem.price) / totalPrice,
  };
}
