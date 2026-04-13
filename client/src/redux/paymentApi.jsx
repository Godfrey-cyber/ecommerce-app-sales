import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  	reducerPath: "paymentApi",
  	baseQuery: fetchBaseQuery({
	    baseUrl: "/api/payments",
	    credentials: "include", // sends HTTP-only auth cookie
  	}),
  	endpoints: (builder) => ({
 
	    // Creates a PaymentIntent on the backend → returns { clientSecret }
	    createPaymentIntent: builder.mutation({
	      	query: ({ cartItems }) => ({
	        	url: "/create-payment-intent",
	        	method: "POST",
	        	body: cartItems,
	      	}),
	    }),
  	}),
});

export const { useCreatePaymentIntentMutation } = paymentApi;