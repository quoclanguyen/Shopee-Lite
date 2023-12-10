import axiosClient from "../../config/axiosClient";
import { OrderObject } from "../../interfaces";
import { OrderEndpoint } from "../endpoints/order";

export const checkOut = async (data: OrderObject) => {
    try {
        const response = await axiosClient.request(OrderEndpoint.checkout(data));
        return response;

    } catch (error) {
        console.log(error)
        return null;
    }
}