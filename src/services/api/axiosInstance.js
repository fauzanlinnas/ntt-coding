import Axios from "axios";

// @create an instance
const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
});

// @default export
export default api;
