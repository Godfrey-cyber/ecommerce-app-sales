// import { axiosInstance } from "../../utilities/apiCalls.js";
// import { logout, loginStart, loginSuccess, loginFailure, getCurrentUserStart, getCurrentUserSuccess, getCurrentUserFailure, signUpStart, signUpSuccess, signUpFailure } from "../slices/authSlice.js";

// // @User register
// export const signUpUser = (formData, navigate, toast) => async dispatch => {
//   dispatch(signUpStart());
//   try {
//     const res = await axiosInstance.post("/users/register-user", formData);

//     if (res.status === 201 || res.statusText === "OK") {
//       dispatch(signUpSuccess(res.data));
//       navigate("/auth/login");
//       toast.success("Account Successfully Created 🥇");
//     }
//   } catch (error) {
//     dispatch(signUpFailure(error?.response?.data?.msg || "Signup failed"));
//     toast.error(error?.response?.data?.msg || "Signup failed");
//   }
// };

// // @Login User
// export const loginUser = (loginData, navigate, toast) => async dispatch => {
//   dispatch(loginStart());
//   try {
//     const res = await axiosInstance.post("/users/login-user", loginData);
//       dispatch(loginSuccess(res.data));
//       navigate("/");
//       toast.success("Successfully Logged in🥇");
//     } catch (error) {
//     dispatch(loginFailure(error.response?.data?.msg || "Login failed"));
//     console.log(error)
//     toast.error(error?.response?.data?.error || "Login failed. Try again.");
//   }
// };

// // @Token refresh
// export const refreshUser = () => async dispatch => {
//   dispatch(getCurrentUserStart());
//   try {
//     const response = await axiosInstance.get("/users/refresh_token", {
//       withCredentials: true,
//     });
//     if (response.status === 200) {
//       dispatch(getCurrentUserSuccess(response.data));
//       // console.log(response.data)
//     }
//   } catch (error) {
//     dispatch(getCurrentUserFailure(null));
//   }
// };

// export const initializeAuth = () => async (dispatch, getState) => {
//   dispatch(loginStart());
//   console.log(getState().auth)
//   try {
//     const { auth } = getState();
//     // Try to refresh token using the httpOnly cookie
//     if (auth.user || auth.accessToken) {
//       const response = await axiosInstance.get('/users/refresh_token');
//       dispatch(loginSuccess(response.data));
//     } else {
//       dispatch(setInitialized());
//     }
    
//   } catch (error) {
//     // If refresh fails, user stays logged out
//     // dispatch(loginFailure(error.response?.data?.msg || "Login failed"));
//     dispatch(logout());
//   }
// };