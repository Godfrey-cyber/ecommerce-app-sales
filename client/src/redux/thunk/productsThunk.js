import { axiosInstance } from "../../utilities/apiCalls.js";
// import { productStart, productSuccess, productFailure } from "../slices/productSlice.js";
import { productsStart, productsSuccess, productsFailure, createProductStart, createProductSuccess, createProductFailure } from "../slices/productsSlice.js";

// @All blogs
export const fetchProducts = () => async dispatch => {
  // dispatch(clearBlogs());
  dispatch(productsStart())
  try {
    const res = await axiosInstance.get("/products/get-products");
    console.log(res.data.products)
    dispatch(productsSuccess(res.data.products)) // line 13
  } catch (error) {
    dispatch(productsFailure(error?.response?.data?.msg || "Failed to fetch blog"));
  }
};

