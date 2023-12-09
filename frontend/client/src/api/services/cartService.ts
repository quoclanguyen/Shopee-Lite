/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../../config/axiosClient";
import { AddToCartDto } from "../../interfaces";
import { CartEndpoint } from "../endpoints/cart";

export const addProductToCart = async (data: AddToCartDto) => {
    try {
        const response = await axiosClient.request(CartEndpoint.addToCart(data));
        return response.metadata;
    } catch (error) {
        console.log(error);
        return null;
    }
}