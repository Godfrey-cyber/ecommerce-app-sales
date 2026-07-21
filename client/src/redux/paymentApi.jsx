import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from './baseQuery';

export const paymentApi = createApi({
  	reducerPath: "paymentApi",
  	baseQuery,
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