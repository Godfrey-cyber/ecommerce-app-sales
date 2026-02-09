import { axiosInstance } from "../../utilities/apiCalls.js";
import { productStart, productSuccess, productFailure } from "./productSlice.js";
import { productsStart, productsSuccess, productsFailure, createProductStart, createProductSuccess, createProductFailure } from "./blogsSlice.js";
// import { blogsByCatStart, blogsByCatSuccess, blogsByCatFailure } from "./blogsByCatSlice.js";
// import { categoryStart, categorySuccess, categoryFailure } from "./categorySlice.js";

// @All blogs
export const fetchBlogs = () => async dispatch => {
  // dispatch(clearBlogs());
  dispatch(productsStart())
  try {
    const res = await axiosInstance.get("/products/get-products");
    dispatch(productsSuccess(res.data.data)) // line 13
  } catch (error) {
    dispatch(productsFailure(error?.response?.data?.msg || "Failed to fetch blog"));
  }
};