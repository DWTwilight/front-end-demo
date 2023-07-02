import axios from "axios";

export const registerUser = (phone, password, residence) =>
  axios
    .post("/user", {
      phone,
      password,
      residence,
    })
    .then((response) => response.data);
