import React, { useReducer, useEffect } from "react";
import { getProducts } from "../api/shoppingCart";

export const ACTIONS = {
  LOAD_CART_PRODUCTS: "load_cart_products",
};

const reducer = (products, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_CART_PRODUCTS:
      return action.payload.products;
    default:
      return products;
  }
};

export const ShoppingCartContext = React.createContext({
  products: [],
  dispatch: () => {},
});

export default function ShoppingCartProvider({ children }) {
  const [products, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    async function loadCartProducts() {
      dispatch({
        type: ACTIONS.LOAD_CART_PRODUCTS,
        payload: {
          products: await getProducts(),
        },
      });
    }
    loadCartProducts();
  }, []);

  return (
    <ShoppingCartContext.Provider value={{ products, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
