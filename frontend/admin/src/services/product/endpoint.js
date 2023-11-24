export const ProductEndpoint = {
  findAll: {
    url: "/product/published/all",
    method: "GET",
  },
  findOne: (id) => ({
    url: `/product/${id}`,
    method: "GET",
  })
};
