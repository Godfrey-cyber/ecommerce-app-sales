// import { axiosInstance } from "../../utilities/apiCalls.js";
// import { productStart, productSuccess, productFailure, productsStart, productsSuccess, productsFailure, createProductStart, createProductSuccess, createProductFailure } from "../slices/productsSlice.js";

// // @All blogs
// export const fetchProducts = () => async dispatch => {
//   // dispatch(clearBlogs());
//   dispatch(productsStart())
//   try {
//     const res = await axiosInstance.get("/products/get-products");
//     dispatch(productsSuccess(res.data.products)) // line 13
//   } catch (error) {
//     dispatch(productsFailure(error?.response?.data?.msg || "Failed to fetch blog"));
//   }
// };

// export const fetchOneProduct = (id) => async dispatch => {
//   // dispatch(clearBlogs());
//   dispatch(productStart())
//   try {
//     const res = await axiosInstance.get(`/products/get-product/${id}`);
//     dispatch(productSuccess(res.data.product)) // line 13
//   } catch (error) {
//     dispatch(productFailure(error?.response?.data?.msg || "Failed to fetch blog"));
//   }
// };

