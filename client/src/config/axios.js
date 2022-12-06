import axios from "axios";
const BASE_URL = "https://apirideshop.onrender.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosReq = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
