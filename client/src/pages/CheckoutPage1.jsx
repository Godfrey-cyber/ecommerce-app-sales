import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useCreateOrderMutation } from '../redux/orderApi';
import { useGetCartQuery } from '../redux/cartApi';
import CheckoutHeader from "../components/header/CheckoutHeader";
import CustomerSection from "../components/CustomerSection";
import DeliverySection from "../components/DeliverySection";
import PaymentSection from "../components/PaymentSection";
import OrderSummary from "../components/OrderSummary";

const CheckoutPage = () => {
  const { data, error } = useGetCartQuery();
  const cartItems = data?.cart[0]?.items || [];
    const cartSummary = data?.cart[0];
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const cart = cartData?.cart?.[0];
  const [completedSections, setCompletedSections] = useState({
    customer: true,
    delivery: false,
    payment: false
  });
  // Deleivery & Payment states
  const [selectedDelivery, setSelectedDelivery] = useState("door");
  const [selectedPayment, setSelectedPayment] = useState("mpesa");

  // Shipping details
  const [shippingDetails, setShippingDetails] = useState({
    // name: '',
    // email: '',
    // phone: '',
    county: 'Nairobi',
    subCounty: 'Westlands',
    station: 'Sarit Centre',
    address: '' // For door delivery
  });

  const [customerData, setCustomerData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+254 712 345 678",
    county: "Nairobi",
    subCounty: "Westlands",
    station: "Sarit Centre"
  });

  const toggleSection = (section) => {
    setCompletedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckout = () => {
    const allComplete = Object.values(completedSections).every(Boolean);
    try {
        if (!allComplete) {
            alert("Please complete all sections before proceeding.");
            return;
        }

        if (!shippingDetails.county || !shippingDetails.subCounty || !shippingDetails.station || !shippingDetails.address) {
            toast.error('Please provide country number');
            return;
        }
        
        const orderData = {
          // Items from cart
          items: cart.items.map(item => ({
            product: item.product._id,
            title: item.product.title,
            quantity: item.quantity,
            price: item.product.finalPrice,
            totalPrice: item.quantity * item.product.finalPrice
          })),

          // Shipping info
          shippingAddress: {
            firstName: shippingDetails.name,
            lastName: shippingDetails.name,
            phone: shippingDetails.phone,
            email: shippingDetails.email,
            county: shippingDetails.county,
            subCounty: shippingDetails.subCounty,
            station: shippingDetails.station,
            address: selectedDelivery === 'door-delivery' 
              ? shippingDetails.address 
              : '',
          },

          // Delivery method
          deliveryMethod: selectedDelivery, // 'door-delivery' or 'pick-up-station'

          // Payment method
          paymentMethod: selectedPayment, // 'mpesa', 'bank', 'pay-on-delivery'

          // Pricing
          subtotal: cartSummary.totalAmount,
          deliveryFee: cart.deliveryFee || 0,
          tax: cart.tax || 0,
          discount: cart.discount || 0,
          totalAmount: cart.finalAmount,
        };
    } catch (error) {

    }

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
          onCheckout={handleCheckout}
        />

      </div>

    </div>
  );
};

export default CheckoutPage;