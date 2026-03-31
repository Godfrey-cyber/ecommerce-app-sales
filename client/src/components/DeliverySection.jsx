import React, { forwardRef } from 'react'
import SectionCard from "../components/ui/SectionCard";
import DeliveryOption from "../components/ui/DeliveryOption";
import ProductItem from "../components/ui/ProductItem";

const DeliverySection = forwardRef(({
  completed,
  toggle,
  selectedDelivery,
  // handleDeliveryMethodClick,
  setSelectedDelivery,
  setCompletedSections,
  setShowUserMenu,
  showUserMenu,
  userData,
  data
}, ref) => {
  // const { data, error } = useGetCartQuery();

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
        <div className="grid grid-cols-12 gap-2">
          <DeliveryOption
            title="Door Delivery"
            description="Delivered to your home or office"
            price={300}
            selected={selectedDelivery === "Door Delivery"}
            onSelect={() => setSelectedDelivery("Door Delivery")}
            setShowUserMenu={setShowUserMenu}
            showUserMenu={showUserMenu}
            ref={ref}
            userData={userData}
            data={data}
          />

          <DeliveryOption
            title={`Pickup Station (KES. 540)`}
            description="Collect from a nearby Pickup Location"
            price={0}
            selected={selectedDelivery === "Pickup Station"}
            onSelect={() => setSelectedDelivery("Pickup Station")}
            setShowUserMenu={setShowUserMenu}
            showUserMenu={showUserMenu}
            ref={ref}
            userData={userData}
            data={data}
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
});

export default DeliverySection;