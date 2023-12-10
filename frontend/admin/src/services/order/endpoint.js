export const OrderEndpoint = {
    findOrdersByShopId: (shopId) => ({
        url: `/order/get-by-shop-id/${shopId}` ,
        method: "GET",
    })
}