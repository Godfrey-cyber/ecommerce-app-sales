import { axiosInstance } from "../../utilities/apiCalls.js";
import { logout, loginStart, loginSuccess, loginFailure, getCurrentUserStart, getCurrentUserSuccess, getCurrentUserFailure, signUpStart, signUpSuccess, signUpFailure } from "../slices/authSlice.js";

// @User register
export const signUpUser = (formData, navigate, toast) => async dispatch => {
  dispatch(signUpStart());
  try {
    const res = await axiosInstance.post("/users/register-user", formData);

    if (res.status === 201 || res.statusText === "OK") {
      dispatch(signUpSuccess(res.data));
      navigate("/auth/login");
      toast.success("Account Successfully Created 🥇");
    }
  } catch (error) {
    dispatch(signUpFailure(error?.response?.data?.msg || "Signup failed"));
    toast.error(error?.response?.data?.msg || "Signup failed");
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