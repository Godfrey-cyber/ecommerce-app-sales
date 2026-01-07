import { axiosInstance } from "../utilities/utiles.js";

// @Register User
export const registerUser = async (signupData) => {
  try {
    const res = await axiosInstance.post("/auth/signup-user", signupData);
    if (res.status === 200 || res.statusText === "OK") {
      return res.data; // return only what you need
    }
  } catch (error) {
    throw error?.response?.data?.msg || "Login failed"; // throw meaningful error
  }
};

// @Login User
// export const loginUser = (loginData, navigate, toast) => async dispatch => {
//   dispatch(loginStart());
//   try {
//     const res = await axiosInstance.post("/auth/login-user", loginData);
//       dispatch(loginSuccess(res.data));
//       navigate("/");
//       toast.success("Successfully Logged in🥇");
//     } catch (error) {
//     dispatch(loginFailure(error.response?.data?.msg || "Login failed"));
//     console.log(error)
//     toast.error(error?.response?.data?.error || "Login failed. Try again.");
//   }
// };