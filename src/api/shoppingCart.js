import axios from "axios";

export const API_URL = "http://localhost:8080/cart-products";

export const getProducts = () =>
  axios.get(API_URL).then((response) => response.data);

export const createCartProduct = (product) =>
  axios
    .post(API_URL, product, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);

export const updateCartProduct = (product) =>
  axios
    .put(`${API_URL}/${product.id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);

export const removeCartProduct = (id) => axios.delete(`${API_URL}/${id}`);
