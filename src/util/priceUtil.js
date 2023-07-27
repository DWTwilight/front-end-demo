export const convertToDisplayPrice = (price) =>
  (Math.round(price * 100) / 100).toFixed(2);
