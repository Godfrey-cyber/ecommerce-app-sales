import React from 'react'
import SectionCard from "./ui/SectionCard";
import InputField from "./ui/InputField";
import SelectField from "./ui/SelectField";

const CustomerSection = ({
  completed,
  toggle,
  customerData,
  setCustomerData
}) => {

  return (
    <SectionCard
      number="1"
      title="Customer Details"
      completed={completed}
      onToggle={toggle}
      active={completed}
    >
      <div className="flex justify-between gap-4 w-full">
        <div className="flex flex-col space-y-4 w-full">
            <div className="grid grid-cols-12 w-full my-4">
              <span className="flex flex-col col-span-6 md:col-span-4 lg:col-span-2">
                <p className="text-sm font-bold text-gray-800">Name:</p>
                <p className="text-xs font-semibold text-gray-600"> {customerData.name}</p>
              </span>
              <span className="flex flex-col col-span-6 md:col-span-4 lg:col-span-2">
                <p className="text-sm font-bold text-gray-800">Email:</p>
                <p className="text-xs font-semibold text-gray-600"> {customerData.email}</p>
              </span>
              <span className="flex flex-col col-span-6 md:col-span-4 lg:col-span-2">
                <p className="text-sm font-bold text-gray-800">Phone:</p>
                <p className="text-xs font-semibold text-gray-600"> {customerData.phone}</p>
              </span>
              <span className="flex flex-col col-span-6 md:col-span-4 lg:col-span-2">
                <p className="text-sm font-bold text-gray-800">County:</p>
                <p className="text-xs font-semibold text-gray-600"> {customerData.county}</p>
              </span>
              <span className="flex flex-col col-span-6 md:col-span-4 lg:col-span-2">
                <p className="text-sm font-bold text-gray-800">Sub County:</p>
                <p className="text-xs font-semibold text-gray-600"> {customerData.subCounty}</p>
              </span>
              <span className="flex flex-col col-span-6 md:col-span-4 lg:col-span-2">
                <p className="text-sm font-bold text-gray-800">Station:</p>
                <p className="text-xs font-semibold text-gray-600"> {customerData.station}</p>
              </span>
            </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default CustomerSection;
