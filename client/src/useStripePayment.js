import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useNavigate, Link } from 'react-router-dom'

export function useStripePayment() {
	const [loading, setLoading]     = useState(false);
  	const [error, setError]         = useState(null);
  	const [succeeded, setSucceeded] = useState(false);
 
  	const [createPaymentIntent] = useCreatePaymentIntentMutation();
	const params = useParams()
	const { id } = useParams()
	const pay = useCallback(async ({
	    cardNumber,   // "4242 4242 4242 4242" — spaces will be stripped
	    expiry,       // "MM / YY"
	    cvv,          // "123"
	    cardName,     // "John Doe"
	    amount,       // KSh whole number e.g. 36500
	    orderId,
	    customerEmail,
	}) => {
	    setError(null);
	    setLoading(true);
 
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe.js failed to load.");
 
      // ── 1. Create PaymentIntent on your backend ───
      const { data, error: rtkError } = await createPaymentIntent({
        amount: amount * 100,   // convert KSh → cents (smallest unit)
        orderId,
        customerEmail,
      });
 
      if (rtkError) throw new Error(rtkError.data?.message ?? "Failed to create payment.");
 
      const { clientSecret } = data;
 
      // ── 2. Parse expiry ────
      // expiry arrives as "MM / YY" → split into month/year
      const [expMonth, expYear] = expiry
        .replace(/\s/g, "")
        .split("/")
        .map(Number);
 
      // ── 3. Create PaymentMethod from raw card data ────
      const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
        type: "card",
        card: {
          number:    cardNumber.replace(/\s/g, ""),
          exp_month: expMonth,
          exp_year:  2000 + expYear,
          cvc:       cvv,
        },
        billing_details: {
          name:  cardName,
          email: customerEmail,
        },
      });
 
      if (pmError) throw new Error(pmError.message);
 
      // ── 4. Confirm payment ────
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: paymentMethod.id }
      );
 
      if (confirmError) throw new Error(confirmError.message);
 
      if (paymentIntent.status === "succeeded") {
        setSucceeded(true);
        return { success: true, paymentIntentId: paymentIntent.id };
      }
 
      throw new Error(`Unexpected payment status: ${paymentIntent.status}`);
 
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [createPaymentIntent]);
 
  return { pay, loading, error, succeeded };
}