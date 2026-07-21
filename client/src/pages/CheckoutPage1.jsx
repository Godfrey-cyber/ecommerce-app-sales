import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { useCreateOrderMutation } from '../redux/orderApi';
import { useGetCartQuery } from '../redux/cartApi';
import { useGetMeQuery } from '../redux/authApi';
import CheckoutHeader from "../components/header/CheckoutHeader";
import CustomerSection from "../components/CustomerSection";
import DeliverySection from "../components/DeliverySection";
import PaymentSection from "../components/PaymentSection";
import OrderSummary from "../components/OrderSummary";
import LocationModal from "../components/ui/LocationModal";

const CheckoutPage = () => {
  const { data, error } = useGetCartQuery();
  const { data:userData, error:isError } = useGetMeQuery();
  const cartItems = data?.cart[0]?.items || [];
  const cartSummary = data?.cart[0];
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [completedSections, setCompletedSections] = useState({
    customer: true,
    delivery: false,
    payment: false
  });

  // console.log("userData", userData.user)
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate()
  const menuRef = useRef(null);
  // Deleivery & Payment states
  const [selectedDelivery, setSelectedDelivery] = useState("Door Delivery");
  const [selectedPayment, setSelectedPayment] = useState("M-Pesa");
  // const [tempDeliveryMethod, setTempDeliveryMethod] = useState(null);

  // Shipping details
    const [shippingDetails, setShippingDetails] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        county: '',
        subCounty: '',
        station: '',
        address: '' // For door delivery
    });

    const [location, setLocation] = useState({
        county: '',
        subCounty: '',
        station: ''
    });

    const counties = [
        'Nairobi',
        'Mombasa',
        'Kisumu',
        'Nakuru',
        'Eldoret',
        'Kiambu',
        'Machakos',
    ];

    const subCounties = {
        'Nairobi': ['Westlands', 'Langata', 'Dagoretti', 'Kasarani', 'Embakasi', 'Makadara', 'Starehe'],
        'Mombasa': ['Mvita', 'Likoni', 'Changamwe', 'Jomvu', 'Kisauni', 'Nyali'],
        'Kisumu': ['Kisumu East', 'Kisumu West', 'Kisumu Central', 'Seme', 'Nyando'],
        'Nakuru': ['Nakuru Town', 'Naivasha', 'Gilgil', 'Molo', 'Njoro'],
        'Eldoret': ['Ainabkoi', 'Kapseret', 'Kesses', 'Moiben', 'Soy', 'Turbo'],
        'Kiambu': ['Thika Town', 'Juja', 'Gatundu', 'Ruiru'],
        'Machakos': ['Machakos Town', 'Kangundo', 'Matungulu', 'Yatta', 'Mwala']
    };

    const stations = {
        'Westlands': ['Sarit Centre', 'Westgate Mall', 'The Mall Westlands', 'ABC Place'],
        'Langata': ['Prestige Plaza', 'T-Mall', 'Karen Hub'],
        'Dagoretti': ['Junction Mall', 'Ngong Road Mall'],
        'Kasarani': ['Thika Road Mall', 'Garden City Mall', 'Nextgen Mall'],
        'Embakasi': ['Gateway Mall', 'Fedha Plaza'],
        'Makadara': ['City Stadium', 'Machakos Bus Station'],
        'Starehe': ['Times Tower', 'GPO Nairobi'],
        // Mombasa
        'Mvita': ['Nkrumah Road Station', 'Moi Avenue Station'],
        'Likoni': ['Likoni Ferry Station', 'Shelly Beach'],
        'Changamwe': ['Port Reitz Station', 'Airport Road'],
        'Jomvu': ['Miritini Station'],
        'Kisauni': ['Bamburi Station', 'Nyali Centre'],
        'Nyali': ['Nyali City Mall', 'Mamba Village'],
        // Kisumu
        'Kisumu East': ['Mega Plaza', 'Kisumu Bus Station'],
        'Kisumu West': ['West End Mall', 'Kondele Market'],
        'Kisumu Central': ['Simba Club', 'Jubilee Market'],
        // Kiambu
        'Makongeni': ['Ananas Mall', 'Naivas Makongeni'],
        'Thika Town': ['Thika Poster', 'Near KCB'],
        'Gatitu': ['Gateway {Plaza', 'Engen Garissa Road'],
        // Default fallback
        'default': ['Main Collection Point', 'Town Centre', 'Market Station']
    };

    const [customerData, setCustomerData] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "+254 712 345 678",
        county: "Nairobi",
        subCounty: "Westlands",
        station: "Sarit Centre"
    });

    

    // Update delivery click handler
    const handleDeliveryMethodClick = (method) => {
        // setTempDeliveryMethod(method);
        setShowLocationModal(true);
    };

    // Add location confirmation handler
    const handleLocationConfirm = (location) => {
        setShippingDetails({
            ...shippingDetails,
            county: location.county,
            subCounty: location.subCounty,
            station: location.station
        });
        setSelectedDelivery(selectedDelivery);
        setCompletedSections(prev => ({...prev, delivery: true}));
    };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSection = (section) => {
    setCompletedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

const handleCheckout = async() => {
    const allComplete = Object.values(completedSections).every(Boolean);
    try {
        if (!allComplete) {
            alert("Please complete all sections before proceeding.");
            return;
        }

        if (!shippingDetails.county || !shippingDetails.subCounty || !shippingDetails.station) {
            toast.error('Please provide country number');
            return;
        }
        // console.log("cartSummary ==", cartSummary)
        const orderData = {
          // Items from cart
          items: cartSummary?.items.map(item => ({
            product: item.product,
            title: item.name,
            image: item.image,
            quantity: item.quantity,
            price: item.price,
            finalPrice: item.finalPrice,
            discount: item.discountAmount,
          })),
 
          // Shipping info
          shippingAddress: {
            firstname: userData?.user?.firstname,
            lastname: userData?.user?.lastname,
            phone: shippingDetails?.phone,
            email: userData?.user?.email,
            county: shippingDetails?.county,
            subCounty: shippingDetails?.subCounty,
            station: shippingDetails?.station,
            address: selectedDelivery === 'door-delivery' 
              ? shippingDetails?.address 
              : '',
          },

          // Delivery method totalPrice
          deliveryMethod: selectedDelivery, // 'door-delivery' or 'pick-up-station'

          // Payment method
          paymentMethod: selectedPayment, // 'mpesa', 'bank', 'pay-on-delivery'

          // Pricing
          subtotal: cartSummary?.totalAmount,
          deliveryFee: cartSummary?.deliveryFee || 0,
          tax: cartSummary?.tax || 0,
          discount: cartSummary?.discount || 0,
          totalAmount: cartSummary?.finalAmount,
        };

        console.log(orderData)
        console.log("data ---", data)

        const result = await createOrder(orderData).unwrap();
        toast.success('Order placed successfully!');
        console.log(result)

        if (selectedPayment === 'M-Pesa') {
            navigate(`/payment/${result?.order?.paymentMethod}/order/${result.order._id}`);
        } else if (selectedPayment === 'Bank') {
            navigate(`/payment/${result?.order?.paymentMethod}/order/${result.order._id}`);
        } else {
            navigate(`/order-confirmation/order/${result.order._id}`);
        }
        console.log("orderData", orderData)
    } catch (error) {
        console.log(error)
        toast.error(error?.data?.msg || 'Failed to create order')
    }
};

console.log("cartSummary", cartSummary)
console.log("cartItems", cartItems)

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
            userData={userData}
          />

          <DeliverySection
            completed={completedSections.delivery}
            toggle={() => toggleSection("delivery")}
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
            setCompletedSections={setCompletedSections}
            setShowUserMenu={setShowUserMenu} 
            showUserMenu={showUserMenu} 
            ref={menuRef}
            userData={userData}
            data={data}
            // handleDeliveryMethodClick={handleDeliveryMethodClick}
            // onClick={() => handleDeliveryMethodClick('pick-up-station')}
          />
          {userData?.user && showUserMenu && (
            <LocationModal
              setShowUserMenu={setShowUserMenu}
              onConfirm={handleLocationConfirm}
              setSelectedDelivery={setSelectedDelivery}
            />
          )}
          
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