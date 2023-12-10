import { OrderObject } from "../../interfaces";

export const OrderEndpoint = {
    checkout: (data: OrderObject) => ({
        url: "/order/checkout",
        method: "POST",
        data
    })
}