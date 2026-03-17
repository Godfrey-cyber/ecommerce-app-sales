import React from "react"

const SectionCard = ({
  number,
  title,
  completed,
  active,
  onToggle,
  children
}) => {
  return (
    <div className="w-full bg-white border rounded-sm shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">

          {/* Step indicator */}
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
            ${completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {completed ? "✓" : number}
          </div>

          {/* Title */}
          <h3 className="text-md font-semibold text-gray-800">
            {title}
          </h3>
        </div>

        {/* Status */}
        {completed && (
          <span className="text-sm text-green-600 font-medium">
            Completed
          </span>
        )}
      </div>

      {/* Content */}
      {active && (
        <div className="px-6 pb-6 border-t">
          {children}
        </div>
      )}

    </div>
  );
};

export default SectionCard;