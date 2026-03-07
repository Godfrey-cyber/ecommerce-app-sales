// ============================================
// CategoriesModal.jsx - Complete Categories Modal
// ============================================

import React from 'react';
import { X } from 'lucide-react';
import { 
  Refrigerator,      // Appliances
  Monitor,           // Computing
  Shirt,            // Fashion
  Gamepad2,         // Gaming
  Sparkles,         // Health & Beauty
  Home,             // Home & Office
  Smartphone,       // Phones & Tablets
  Tv               // TVs & Audio
} from 'lucide-react';

const CategoriesModal = ({ isOpen, setIsOpen }) => {
  // Categories data with icons
  const categories = [
    {
      id: 1,
      name: 'Appliances',
      icon: Refrigerator,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-50',
      link: '/category/appliances',
    },
    {
      id: 2,
      name: 'Computing',
      icon: Monitor,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-50',
      link: '/category/computing',
    },
    {
      id: 3,
      name: 'Fashion',
      icon: Shirt,
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-50',
      link: '/category/fashion',
    },
    {
      id: 4,
      name: 'Gaming',
      icon: Gamepad2,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-50',
      link: '/category/gaming',
    },
    {
      id: 5,
      name: 'Health & Beauty',
      icon: Sparkles,
      color: 'bg-rose-500',
      hoverColor: 'hover:bg-rose-50',
      link: '/category/health-beauty',
    },
    {
      id: 6,
      name: 'Home & Office',
      icon: Home,
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-50',
      link: '/category/home-office',
    },
    {
      id: 7,
      name: 'Phones & Tablets',
      icon: Smartphone,
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-50',
      link: '/category/phones-tablets',
    },
    {
      id: 8,
      name: 'TVs & Audio',
      icon: Tv,
      color: 'bg-cyan-500',
      hoverColor: 'hover:bg-cyan-50',
      link: '/category/tvs-audio',
    },
  ];

  const handleCategoryClick = (link) => {
    // Navigate to category
    window.location.href = link;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
            {/* User Info Header */}
            
    </>
  );
};

export default CategoriesModal;