import axios from "axios";
import { getUserIdFromToken } from "../utils";

const authenticatedClient = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL_BASE}/api/`,
  baseURL: "http://localhost:3000/v1/api/",
  // withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-api-key": import.meta.env.VITE_API_KEY,
    "authorization" : localStorage.getItem("accessToken") || "",
    "x-client-id": getUserIdFromToken()
  },
});
export const unauthenticatedClient = axios.create({
  baseURL: "http://localhost:3000/v1/api/",
  // withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
})

// Add a request interceptor
authenticatedClient.interceptors.request.use(
  function (config) {
    config.headers = {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-api-key": import.meta.env.VITE_API_KEY,
      "authorization" : localStorage.getItem("accessToken") || "",
      "x-client-id": getUserIdFromToken()
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
authenticatedClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { data, status } = error.response;
    if (
      (status === 401 || status === 403) &&
      data.message === "Unauthorized or Access Token is expired"
    ) {
      authenticatedClient.defaults.headers.common["authorization"] =
        localStorage.getItem("accessToken");
    }
    return Promise.reject(error);
  }
);
export default authenticatedClient;