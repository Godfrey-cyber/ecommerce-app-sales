import React, { useState, useRef, useEffect } from 'react';
import SummaryRow from "../components/ui/SummaryRow";
import { useGetCartQuery } from "../redux/cartApi.jsx"

const OrderSummary = ({ onCheckout }) => {

  const { data, error } = useGetCartQuery();
  const cartItems = data?.cart[0]?.items || [];
  const cartSummary = data?.cart[0];

  

  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col bg-white border rounded-sm p-6 shadow-sm h-fit space-y-6">

      <h2 className="text-lg font-semibold text-gray-800">
        Order Summary
      </h2>
      <hr />
      <div className="space-y-3">

        <SummaryRow label={`Items Total (${cartSummary?.totalItems})`} value={new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(cartSummary?.totalAmount)} />
        {/* Shipping & Delivery */}
        <SummaryRow label="Delivery Fee" value={cartSummary?.shipping === 0 ? "FREE" : new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(cartSummary?.shipping)} /> 

        <SummaryRow label="Tax (8%)" value={new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(cartSummary?.tax)} />

        <hr />

        <SummaryRow
          label="Total"
          value={new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(cartSummary?.finalAmount)}
          bold
        />

      </div>

      <button
        onClick={onCheckout}
        className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
      >
        Place Order
      </button>

    </div>
  );
};

export default OrderSummary;