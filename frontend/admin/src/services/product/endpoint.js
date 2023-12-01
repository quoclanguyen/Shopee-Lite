export const ProductEndpoint = {
  findAll: {
    url: "/product/published/all",
    method: "GET",
  },
  findAllDeleted: {
    url: "/product/drafts/all",
    method: "GET",
  },
  createNewProduct: (data) => ({
    url: "/product",
    method: "POST",
    data
  }),
  updateProduct: (id, data) => ({
    url: `/product/${id}`,
    method: "PATCH",
    data
  }),
  deleteProduct: (id, data) => ({
    url: `/product/unpublish/${id}`,
    method: "POST",
    data
  }),
  publishProduct: (id, data) => ({
    url: `/product/publish/${id}`,
    method: "POST",
    data
  })
};
