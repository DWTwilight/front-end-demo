import React, { useReducer, useEffect } from "react";
import { getProducts } from "../api/shoppingCart";
import { createCartProduct, updateCartProduct } from "../api/shoppingCart";

export const ACTIONS = {
  LOAD_CART_PRODUCTS: "load_cart_products",
  ADD_CART_PRODUCT: "add_cart_product",
  UPDATE_CART_PRODUCT: "update_cart_product",
};

const reducer = (products, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_CART_PRODUCTS:
      return action.payload.products;
    case ACTIONS.ADD_CART_PRODUCT:
      return [...products, action.payload.product];
    case ACTIONS.UPDATE_CART_PRODUCT:
      return products.map((product) => {
        if (product.id === action.payload.product.id) {
          return action.payload.product;
        }
        return product;
      });
    default:
      return products;
  }
};

export const ShoppingCartContext = React.createContext({
  cartProducts: [],
  dispatch: () => {},
});

export const createCartItem = async (productId, dispatch) => {
  const createdCartProduct = await createCartProduct({
    productId,
    quantity: 1,
  });
  dispatch({
    type: ACTIONS.ADD_CART_PRODUCT,
    payload: {
      product: createdCartProduct,
    },
  });
};

export const updateCartItem = async (cartProduct, dispatch) => {
  const updatedCartProduct = await updateCartProduct(cartProduct);
  dispatch({
    type: ACTIONS.UPDATE_CART_PRODUCT,
    payload: {
      product: updatedCartProduct,
    },
  });
};

export default function ShoppingCartProvider({ children }) {
  const [cartProducts, dispatch] = useReducer(reducer, []);

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
    <ShoppingCartContext.Provider value={{ cartProducts, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
