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
