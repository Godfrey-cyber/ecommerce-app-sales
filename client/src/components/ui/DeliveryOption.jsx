import React from "react"

const DeliveryOption = ({
  title,
  description,
  price,
  selected,
  onSelect
}) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer border-2 rounded-xl my-4 p-4 transition
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
      <div className="mt-3 flex justify-end">
        <div
          className={`w-4 h-4 rounded-full border-2
          ${selected ? "border-orange-500 bg-orange-500" : "border-gray-300"}`}
        />
      </div>

    </div>
  );
};

export default DeliveryOption;