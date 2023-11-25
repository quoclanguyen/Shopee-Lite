import axios, { AxiosError, AxiosResponse } from "axios";
import { getUserIdFromToken } from "../utils";

// interface AuthenticatedClientConfig extends AxiosRequestConfig {
//   headers: {
//     "Content-Type": string;
//     "Access-Control-Allow-Origin": string;
//     "x-api-key": string;
//     authorization: string;
//     "x-client-id": string;
//   };
// }

const authenticatedClient = axios.create({
  baseURL: "http://localhost:3000/v1/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-api-key": import.meta.env.VITE_API_KEY || "",
    authorization: localStorage.getItem("accessToken") || "",
    "x-client-id": getUserIdFromToken(),
  },
});

export const unauthenticatedClient = axios.create({
  baseURL: "http://localhost:3000/v1/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-api-key": import.meta.env.VITE_API_KEY || "",
  },
});

// Add a request interceptor
authenticatedClient.interceptors.request.use(
  function (config) {
    config?.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-api-key": import.meta.env.VITE_API_KEY || "",
      authorization: localStorage.getItem("accessToken") || "",
      "x-client-id": getUserIdFromToken(),
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
authenticatedClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error: AxiosError) {
    const { data, status } = error.response || {};
    if (
      (status === 401 || status === 403) &&
      data?.message === "Unauthorized or Access Token is expired"
    ) {
      authenticatedClient.defaults.headers.common[
        "authorization"
      ] = localStorage.getItem("accessToken") || "";
    }
    return Promise.reject(error);
  }
);

export default authenticatedClient;
