import React from 'react'
import SectionCard from "../components/ui/SectionCard";
import DeliveryOption from "../components/ui/DeliveryOption";
import ProductItem from "../components/ui/ProductItem";
import { useGetCartQuery } from "../redux/cartApi.jsx"

const DeliverySection = ({
  completed,
  toggle,
  selectedDelivery,
  setSelectedDelivery,
  products,
  setCompletedSections
}) => {
  const { data, error } = useGetCartQuery();

  const cartItems = data?.cart[0]?.items || [];

  const handleContinue = () => {
    setCompletedSections((prev) => ({
      ...prev,
      delivery: true
    }));
  };

  return (
    <SectionCard
      number="2"
      title="Delivery Method"
      completed={completed}
      onToggle={toggle}
      active={!completed}
    >
      <div className="space-y-6">

        {/* Delivery Options */}
        <div className="grid md:grid-cols-2 gap-4">
          <DeliveryOption
            title="Door Delivery"
            description="Delivered to your home or office"
            price={300}
            selected={selectedDelivery === "door"}
            onSelect={() => setSelectedDelivery("door")}
          />

          <DeliveryOption
            title="Pickup Station"
            description="Collect from a nearby pickup location"
            price={0}
            selected={selectedDelivery === "pickup"}
            onSelect={() => setSelectedDelivery("pickup")}
          />
        </div>

        {/* Cart Products */}
        <div className="border-t pt-6 space-y-4">
          {cartItems?.map((product) => (
            <ProductItem
              key={product._id}
              title={product.name}
              quantity={product.quantity}
              finalPrice={product.finalPrice}
              image={product.image}
            />
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg
            hover:bg-orange-600 transition"
          >
            Continue to Payment
          </button>
        </div>

      </div>
    </SectionCard>
  );
};

export default DeliverySection;