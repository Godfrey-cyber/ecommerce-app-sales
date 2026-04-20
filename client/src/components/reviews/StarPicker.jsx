import React from 'react'
import { Star } from 'lucide-react';

const StarPicker = ({ value, onChange }) => {
	const [hovered, setHovered] = useState(0);
  	const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  	const active = hovered || value;
	return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
            className="p-0.5 transition-transform duration-100 hover:scale-110 active:scale-95"
          >
            <Star
              className={`w-7 h-7 transition-colors duration-150 ${
                star <= active
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300 fill-gray-100'
              }`}
            />
          </button>
        ))}
      </div>
      {active > 0 && (
        <span className="text-xs font-semibold text-amber-600 ml-1">
          {labels[active]}
        </span>
      )}
    </div>
  );
};

export default StarPickers