import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  	reducerPath: "paymentApi",
  	baseQuery: fetchBaseQuery({
	    baseUrl: import.meta.env.VITE_API_URL,
	    credentials: "include", // sends HTTP-only auth cookie
  	}),
  	endpoints: (builder) => ({
 
	    // Creates a PaymentIntent on the backend → returns { clientSecret }
	    createPaymentIntent: builder.mutation({
	      	query: ({ orderId }) => ({
	        	url: "payments/stripe/create-intent",
	        	method: "POST",
	        	body: { orderId },
	      	}),
	    }),
  	}),
});

export const { useCreatePaymentIntentMutation } = paymentApi;