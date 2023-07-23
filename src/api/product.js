import axios from "axios";

export const API_URL = "http://localhost:8080/products";

export const getProducts = () =>
  axios.get(API_URL).then((response) => response.data);
