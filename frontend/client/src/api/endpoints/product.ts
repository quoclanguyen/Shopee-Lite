/* eslint-disable @typescript-eslint/no-explicit-any */
export const ProductEndpoint = {
    findAll: {
        url: "/product",
        method: "GET",
    },
    findById: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
    }),
    createNewProduct: (data: any) => ({
        url: "/product",
        method: "POST",
        data
    }),
    updateProduct: (id: string, data: any) => ({
        url: `/product/${id}`,
        method: "PATCH",
        data
    }),
    deleteProduct: (id: string, data: any) => ({
        url: `/product/${id}`,
        method: "PATCH",
        data
    })
};