import React from "react"
const SummaryRow = ({
  label,
  value,
  labelClass = 'text-gray-600',
  valueClass = 'text-gray-900 font-semibold'
}) => {
  return (
    <div className="flex justify-between items-center">
      <span className={labelClass}>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
};

export default SummaryRow;