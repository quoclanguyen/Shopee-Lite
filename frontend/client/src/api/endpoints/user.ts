/* eslint-disable @typescript-eslint/no-explicit-any */
export const UserEndpoint = {
    // findAll: {
    //     url: "/product/published/all",
    //     method: "GET",
    // },
    findAll: {
        url: "/users",
        method: "GET",
    },
    findById: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
    }),
};