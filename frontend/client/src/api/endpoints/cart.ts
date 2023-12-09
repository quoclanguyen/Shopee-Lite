import { AddToCartDto } from "../../interfaces";

export const CartEndpoint = {
    addToCart: (data: AddToCartDto) => ({
        url: "/cart",
        method: "POST",
        data
    })
}