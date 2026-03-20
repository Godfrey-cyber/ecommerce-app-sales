import React, { useState } from 'react'
import { X, MapPin, ChevronDown } from 'lucide-react';

const LocationModal = ({ setShowUserMenu, onConfirm, selectedDeliveryMethod }) => {
    const [location, setLocation] = useState({
        county: 'Nairobi',
        subCounty: 'Westlands',
        station: 'Sarit Centre'
    });

    const counties = [
        'Nairobi',
        'Mombasa',
        'Kisumu',
        'Nakuru',
        'Eldoret',
        'Kiambu',
        'Machakos',
    ];

  const subCounties = {
    'Nairobi': ['Westlands', 'Langata', 'Dagoretti', 'Kasarani', 'Embakasi', 'Makadara', 'Starehe'],
    'Mombasa': ['Mvita', 'Likoni', 'Changamwe', 'Jomvu', 'Kisauni', 'Nyali'],
    'Kisumu': ['Kisumu East', 'Kisumu West', 'Kisumu Central', 'Seme', 'Nyando'],
    'Nakuru': ['Nakuru Town', 'Naivasha', 'Gilgil', 'Molo', 'Njoro'],
    'Eldoret': ['Ainabkoi', 'Kapseret', 'Kesses', 'Moiben', 'Soy', 'Turbo'],
    'Kiambu': ['Thika Town', 'Juja', 'Gatundu', 'Ruiru'],
    'Machakos': ['Machakos Town', 'Kangundo', 'Matungulu', 'Yatta', 'Mwala']
  };

  const stations = {
    'Westlands': ['Sarit Centre', 'Westgate Mall', 'The Mall Westlands', 'ABC Place'],
    'Langata': ['Prestige Plaza', 'T-Mall', 'Karen Hub'],
    'Dagoretti': ['Junction Mall', 'Ngong Road Mall'],
    'Kasarani': ['Thika Road Mall', 'Garden City Mall', 'Nextgen Mall'],
    'Embakasi': ['Gateway Mall', 'Fedha Plaza'],
    'Makadara': ['City Stadium', 'Machakos Bus Station'],
    'Starehe': ['Times Tower', 'GPO Nairobi'],
    // Mombasa
    'Mvita': ['Nkrumah Road Station', 'Moi Avenue Station'],
    'Likoni': ['Likoni Ferry Station', 'Shelly Beach'],
    'Changamwe': ['Port Reitz Station', 'Airport Road'],
    'Jomvu': ['Miritini Station'],
    'Kisauni': ['Bamburi Station', 'Nyali Centre'],
    'Nyali': ['Nyali City Mall', 'Mamba Village'],
    // Kisumu
    'Kisumu East': ['Mega Plaza', 'Kisumu Bus Station'],
    'Kisumu West': ['West End Mall', 'Kondele Market'],
    'Kisumu Central': ['Simba Club', 'Jubilee Market'],
    // Kiambu
    'Makongeni': ['Ananas Mall', 'Naivas Makongeni'],
    'Thika Town': ['Thika Poster', 'Near KCB'],
    'Makongeni': ['Cerials', 'Engen Garissa Road'],
    // Default fallback
    'default': ['Main Collection Point', 'Town Centre', 'Market Station']
  };

  const handleCountyChange = (e) => {
    const newCounty = e.target.value;
    const firstSubCounty = subCounties[newCounty]?.[0] || 'Main Area';
    const firstStation = stations[firstSubCounty]?.[0] || 'Main Collection Point';
    
    setLocation({
      county: newCounty,
      subCounty: firstSubCounty,
      station: firstStation
    });
  };

  const handleSubCountyChange = (e) => {
    const newSubCounty = e.target.value;
    const firstStation = stations[newSubCounty]?.[0] || stations['default'][0];
    
    setLocation({
      ...location,
      subCounty: newSubCounty,
      station: firstStation
    });
  };

  const handleStationChange = (e) => {
    setLocation({
      ...location,
      station: e.target.value
    });
  };

  const handleConfirm = () => {
    onConfirm(location);
    setShowUserMenu();
  };
  console.log(location)
	return (
		<>
      {/* Backdrop */}
      <div 
        onClick={() => setShowUserMenu(false)}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        // onClick={setShowUserMenu}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full pointer-events-auto transform transition-all duration-300 scale-100 opacity-100 animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Select Delivery Location
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  {selectedDeliveryMethod === 'door-delivery' 
                    ? 'Choose your delivery county and nearest collection station'
                    : 'Choose your preferred pick-up station'}
                </p>
              </div>
            </div>
            
            <button
              onClick={setShowUserMenu}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Location Selection - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* County */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  County
                </label>
                <div className="relative">
                  <select
                    value={location.county}
                    onChange={handleCountyChange}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl text-sm
                      appearance-none cursor-pointer
                      focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500 focus:ring-opacity-10
                      transition-all duration-200 bg-white font-medium"
                  >
                    {counties.map(county => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sub-County */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Sub-County
                </label>
                <div className="relative">
                  <select
                    value={location.subCounty}
                    onChange={handleSubCountyChange}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl text-sm
                      appearance-none cursor-pointer
                      focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500 focus:ring-opacity-10
                      transition-all duration-200 bg-white font-medium"
                  >
                    {(subCounties[location.county] || []).map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Collection Station */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Collection Station
                </label>
                <div className="relative">
                  <select
                    value={location.station}
                    onChange={handleStationChange}
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl text-sm
                      appearance-none cursor-pointer
                      focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500 focus:ring-opacity-10
                      transition-all duration-200 bg-white font-medium"
                  >
                    {(stations[location.subCounty] || stations['default']).map(station => (
                      <option key={station} value={station}>{station}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Selected Location Preview */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-orange-900 uppercase tracking-wide mb-1">
                    Selected Location
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {location.station}
                  </p>
                  <p className="text-xs text-gray-700 mt-0.5">
                    {location.subCounty}, {location.county}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <button
              onClick={setShowUserMenu}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700
                hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            
            <button
              onClick={handleConfirm}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                text-white font-semibold rounded-xl
                hover:from-orange-600 hover:to-orange-700
                transform hover:-translate-y-0.5 hover:shadow-lg
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </>
	)
}

export default LocationModal