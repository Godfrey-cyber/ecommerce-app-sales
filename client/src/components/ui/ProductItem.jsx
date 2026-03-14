import React from "react"
const ProductItem = ({ title, quantity, finalPrice, image }) => {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
      {/* Icon */}
     {/* <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
        {image}
      </div>*/}

      <div className="w-16 h-16 rounded-sm overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover rounded-sm"
        />
      </div>

      {/* Product details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-normal text-gray-700 truncate">
          {title}
        </h4>
        <p className="text-xs text-gray-600">Qty: {quantity}</p>
      </div>

      {/* Price */}
      <div className="font-normal text-sm text-gray-700">
        Ksh. {finalPrice.toLocaleString()}
      </div>
    </div>
  );
};

export default ProductItem;