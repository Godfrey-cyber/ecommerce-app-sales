import React from "react"
import { Plus } from 'lucide-react';

const DeliveryOption = ({
  title,
  description,
  price,
  selected,
  onSelect,
}) => {
  console.log(selected)
  return (
    <div
      
      className={`col-span-12 cursor-pointer border-2 rounded-md my-4 p-4 transition
      ${selected ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}
    >

      <div className="flex items-start justify-between">

        <div className="space-y-1">
          <h4 className="font-semibold text-gray-800">
            {title}
          </h4>

          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>

        <div className="text-sm font-semibold text-gray-700">
          {price === 0 ? "Free" : `KES ${price.toLocaleString()}`}
        </div>

      </div>

      {/* Selection indicator */}
      <div className="flex items-center justify-between space-y-3">
        <div onClick={onSelect} className="mt-3 flex justify-end">
          <div
            className={`w-4 h-4 rounded-full border-2
            ${selected ? "border-orange-500 bg-orange-500" : "border-gray-300"}`}
          />
        </div>
        <div className="flex flex-row items-center space-x-1">
          <p className="text-sm font-bold text-blue-800 hover:text-blue-600">Select Pick-up Location</p>
          <Plus className="w-3 h-3" />
        </div>
      </div>

    </div>  
  );
};

export default DeliveryOption;