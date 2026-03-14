const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white border hover:shadow-sm transition">

      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 text-lg">
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800">
          {title}
        </span>

        {description && (
          <span className="text-xs text-gray-500">
            {description}
          </span>
        )}
      </div>

    </div>
  );
};

export default FeatureItem;