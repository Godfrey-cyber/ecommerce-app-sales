import React, { useState } from "react";

const InputField = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="flex flex-col gap-2 my-3">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-3 border-2 border-gray-200 rounded-xl
        focus:outline-none focus:border-orange-500"
      />
    </div>
  );
};

export default InputField;