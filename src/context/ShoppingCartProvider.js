import React, { useReducer, useEffect } from "react";

export const ACTIONS = {
  LOAD_CART_PRODUCTS: "load_cart_products",
  ADD_CART_PRODUCT: "add_cart_product",
  UPDATE_CART_PRODUCT: "update_cart_product",
  REMOVE_CART_PRODUCT: "remove_cart_product",
};

const reducer = (products, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_CART_PRODUCTS:
      return action.payload.products;
    case ACTIONS.ADD_CART_PRODUCT:
      const id =
        products && products.length ? products[products.length - 1].id + 1 : 1;
      return [...products, { ...action.payload.product, id }];
    case ACTIONS.UPDATE_CART_PRODUCT:
      return products.map((product) => {
        if (product.id === action.payload.product.id) {
          return action.payload.product;
        }
        return product;
      });
    case ACTIONS.REMOVE_CART_PRODUCT:
      return products.filter((product) => product.id !== action.payload.id);
    default:
      return products;
  }
};

export const ShoppingCartContext = React.createContext({
  cartProducts: [],
  dispatch: () => {},
});

export const createCartItem = (productId, dispatch) => {
  const createdCartProduct = {
    productId,
    quantity: 1,
  };
  dispatch({
    type: ACTIONS.ADD_CART_PRODUCT,
    payload: {
      product: createdCartProduct,
    },
  });
};

export const updateCartItem = (cartProduct, dispatch) => {
  dispatch({
    type: ACTIONS.UPDATE_CART_PRODUCT,
    payload: {
      product: cartProduct,
    },
  });
};

export const removeCartItem = (cartProductId, dispatch) => {
  dispatch({
    type: ACTIONS.REMOVE_CART_PRODUCT,
    payload: {
      id: cartProductId,
    },
  });
};

export default function ShoppingCartProvider({ children }) {
  const initialState = localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [];
  const [cartProducts, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  return (
    <ShoppingCartContext.Provider value={{ cartProducts, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
