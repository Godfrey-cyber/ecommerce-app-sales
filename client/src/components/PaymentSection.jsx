import React from 'react'
import SectionCard from "../components/ui/SectionCard";
import PaymentOption from "../components/ui/PaymentOption";

const PaymentSection = ({
  completed,
  toggle,
  selectedPayment,
  setSelectedPayment,
  setCompletedSections
}) => {

  const handleContinue = () => {
    setCompletedSections((prev) => ({
      ...prev,
      payment: true
    }));
  };

  return (
    <SectionCard
      number="3"
      title="Payment Method"
      completed={completed}
      onToggle={toggle}
      active={!completed}
    >
      <div className="space-y-6">

        {/* Payment Options */}
        <div className="space-y-4">

          <PaymentOption
            title="Bank Card"
            description="Pay securely using debit or credit card"
            selected={selectedPayment === "Bank"}
            onSelect={() => setSelectedPayment("Bank")}
          />

          <PaymentOption
            title="Mobile Money"
            description="Pay using M-Pesa or other mobile wallets"
            selected={selectedPayment === "M-Pesa"}
            onSelect={() => setSelectedPayment("M-Pesa")}
          />

          <PaymentOption
            title="Cash on Delivery"
            description="Pay when your order arrives"
            selected={selectedPayment === "Pay-On-Delivery"}
            onSelect={() => setSelectedPayment("Pay-On-Delivery")}
          />

        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Review Order
          </button>
        </div>

      </div>
    </SectionCard>
  );
};

export default PaymentSection;