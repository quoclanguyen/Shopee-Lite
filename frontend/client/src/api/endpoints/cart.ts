import { AddToCartDto, UpdateCart } from "../../interfaces";

export const CartEndpoint = {
    createOrAddItem: (data: AddToCartDto) => ({
        url: "/cart/create-or-add-item",
        method: "POST",
        data
    }),
    updateCart: (userId: string, data: UpdateCart) => ({
        url: `/cart/update/${userId}`,
        method: "PUT",
        data
    }),
    updateCartItem: (userId: string, productId: string, quantity: number) => ({
        url: "/cart/update-each-product",
        method: "PUT",
        data: {
            userId,
            productId,
            quantity
        }
    }),
    checkProductExists: (userId: string, productId: string) => ({
        url: "/cart/check-exists",
        method: "GET",
        params: {
            userId,
            productId
        }
    }),
    getCartByUserId: (userId: string) => ({
        url: `/cart/get-by-user-id/${userId}`,
        method: "GET",
    }),
    deleteCart: (userId: string) => ({
        url: `/cart/${userId}`,
        method: "DELETE"
    }),
    removeItemFromCart: (userId: string, productId: string) => ({
        url: `/cart/remove-item/${userId}`,
        method: "DELETE",
        params: {
            productId
        }
    })
}