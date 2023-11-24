import authenticatedClient from "../../config/axiosClient";
import { ProductEndpoint } from "./endpoint";

export const findAllProducts = async () => {
    try {
      const productResponse = await authenticatedClient.request(ProductEndpoint.findAll);
      console.log({ productResponse });
      return productResponse;
      
    } catch (err) {
      console.log("Error fetching ")
      return [];
    }
  };