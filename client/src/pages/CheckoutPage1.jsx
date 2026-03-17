import React, { useState } from "react";

import CheckoutHeader from "../components/header/CheckoutHeader";
import CustomerSection from "../components/CustomerSection";
import DeliverySection from "../components/DeliverySection";
import PaymentSection from "../components/PaymentSection";
import OrderSummary from "../components/OrderSummary";

const CheckoutPage = () => {

  const [completedSections, setCompletedSections] = useState({
    customer: true,
    delivery: false,
    payment: false
  });

  const [selectedDelivery, setSelectedDelivery] = useState("door");
  const [selectedPayment, setSelectedPayment] = useState("bank");

  const [customerData, setCustomerData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+254 712 345 678",
    county: "Nairobi",
    subCounty: "Westlands",
    station: "Sarit Centre"
  });

  const products = [
    { id: 1, title: "Atomic Habits", quantity: 1, price: 1200, icon: "📚" },
    { id: 2, title: "The Psychology of Money", quantity: 2, price: 2400, icon: "📖" },
    { id: 3, title: "Deep Work", quantity: 1, price: 1500, icon: "📕" }
  ];

  const itemsTotal = products.reduce((sum, p) => sum + p.price, 0);

  const toggleSection = (section) => {
    setCompletedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckout = () => {
    const allComplete = Object.values(completedSections).every(Boolean);

    if (!allComplete) {
      alert("Please complete all sections before proceeding.");
      return;
    }

    alert("Order completed! Proceeding to payment...");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white">

      <CheckoutHeader />

      <div className="w-full mx-auto px-2 py-8 grid grid-cols-12 gap-4">

        <div className="col-span-12 lg:col-span-8 space-y-6">

          <CustomerSection
            completed={completedSections.customer}
            toggle={() => toggleSection("customer")}
            customerData={customerData}
            setCustomerData={setCustomerData}
          />

          <DeliverySection
            completed={completedSections.delivery}
            toggle={() => toggleSection("delivery")}
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
            products={products}
            setCompletedSections={setCompletedSections}
          />

          <PaymentSection
            completed={completedSections.payment}
            toggle={() => toggleSection("payment")}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            setCompletedSections={setCompletedSections}
          />

        </div>

        <OrderSummary
          itemsTotal={itemsTotal}
          onCheckout={handleCheckout}
        />

      </div>

    </div>
  );
};

export default CheckoutPage;