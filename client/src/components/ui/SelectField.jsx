import React from "react"

const SelectField = ({
  label,
  value,
  options = [],
  onChange,
  name,
  required = false
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="px-4 py-3 border-2 border-gray-200 rounded-xl
        focus:outline-none focus:border-orange-500"
      >
        <option value="">Select option</option>

        {options.map((option, index) => (
          <option
            key={index}
            value={typeof option === "string" ? option : option.value}
          >
            {typeof option === "string" ? option : option.label}
          </option>
        ))}

      </select>
    </div>
  );
};

export default SelectField;