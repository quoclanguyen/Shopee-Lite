import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient";
import { ProductEndpoint } from "./endpoint";

const findAllProducts = async () => {
    try {
      const productResponse = await axiosClient.request(ProductEndpoint.findAll);
      return productResponse.data;
      
    } catch (err) {
      console.log("Error fetching")
      console.log(err)
      return [];
    }
  };
const findAllDeletedProducts = async () => {
  try {
    const productResponse = await axiosClient.request(ProductEndpoint.findAllDeleted);
    return productResponse.data;
    
  } catch (err) {
    console.log("Error fetching")
    console.log(err)
    return [];
  }
};
export const useFindAllProduct =  () => {
  return useQuery({ queryKey: ['findAllProducts'], queryFn: findAllProducts, staleTime: 1000, refetchInterval: 10000})
}
export const useFindAllDeletedProducts = () => {
  return useQuery({ queryKey: ['findAllDeletedProducts'], queryFn: findAllDeletedProducts, staleTime: 1000, refetchInterval: 10000})
}
export const createNewProduct = async (payload) => {
  try {
    const productResponse = await axiosClient.request(ProductEndpoint.createNewProduct(payload));
    return productResponse;
  } catch (err) {
    console.log("Error fetching");
    console.log(err);
    return [];
  }
};
export const updateProduct = async (id, payload) => {
  try {
    const productResponse = await axiosClient.request(ProductEndpoint.updateProduct(id, payload));
    return productResponse;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const deleteProduct = async (id, payload) => {
  try {
    const productResponse = await axiosClient.request(
      ProductEndpoint.deleteProduct(id, { ...payload, isPublished: false })
    );
    return productResponse;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const publishProduct = async (id, payload) => {
  try{
    const productResponse = await axiosClient.request(ProductEndpoint.publishProduct(id, {...payload, isPublished: true}));
    return productResponse;
  }catch(error){
    console.log(err)
    return [];
  }
};
