const PaymentOption = ({
  title,
  description,
  icon,
  selected,
  onSelect
}) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer border-2 rounded-xl my-4 p-4 transition
      ${selected
        ? "border-orange-500 bg-orange-50"
        : "border-gray-200 hover:border-orange-300"}`}
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-xl text-gray-700">
              {icon}
            </div>
          )}

          <div>
            <h4 className="font-semibold text-gray-800">
              {title}
            </h4>

            {description && (
              <p className="text-sm text-gray-500">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Radio indicator */}
        <div
          className={`w-4 h-4 rounded-full border-2
          ${selected
            ? "border-orange-500 bg-orange-500"
            : "border-gray-300"}`}
        />
      </div>
    </div>
  );
};

export default PaymentOption;