/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../config/axiosClient";
import { UserEndpoint } from "../endpoints/user";

const findAllUsers = async () => {
    try {
        const userResponse = await axiosClient.request(UserEndpoint.findAll);
        return userResponse;

    } catch (err) {
        console.log("Error fetching")
        console.log(err)
        return [];
    }
};
const findUserById = async (id: string) => {
    try {
        const userResponse = await axiosClient.request(UserEndpoint.findById(id));
        return userResponse;
    } catch (err) {
        console.log("Error fetching")
        console.log(err)
        return [];
    }
}
const findShopById = async (id: string) => {
    try {
        const userResponse = await axiosClient.request(UserEndpoint.findShopById(id));
        return userResponse.metadata;
    } catch (err) {
        console.log("Error fetching")
        console.log(err)
        return [];
    }
}
export const usefindUserById = (id: string) => {
    return useQuery({ queryKey: ['findUserById', id], queryFn: () => findUserById(id) })
}
export const usefindShopById = (id: string) => {
    return useQuery({ queryKey: ['findShopById', id], queryFn: () => findShopById(id) })
}
export const useFindAllProduct = () => {
    return useQuery({ queryKey: ['findAllUsers'], queryFn: findAllUsers, staleTime: 5000 })
}
