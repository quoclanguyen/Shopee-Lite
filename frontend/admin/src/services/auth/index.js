import { unauthenticatedClient } from "../../config/axiosClient";
import { AuthEndpoint } from "./endpoint";

export const login = async (body) => {
    try {
      const authResponse = await unauthenticatedClient.request(AuthEndpoint.login(body));
      return authResponse.data;
      
    } catch (err) {
      console.log("Error fetching ")
      return [];
    }
  };