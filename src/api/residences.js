import axios from "axios";

export const getResidences = () =>
  axios.get("/residences").then((response) => response.data);
