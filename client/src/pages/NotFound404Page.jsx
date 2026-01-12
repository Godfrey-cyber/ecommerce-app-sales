import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, Search, Mail, MapPin, Compass } from 'lucide-react';

const NotFound404Page = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Search', path: '/search', icon: Search },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      window.location.href = `/search?q=${searchQuery}`;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"
          style={{
            transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        <div 
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Animated 404 with parallax effect */}
        <div 
          className="mb-8 relative"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <h1 className="text-[200px] md:text-[280px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 text-[200px] md:text-[280px] font-black text-indigo-600 opacity-5 blur-2xl leading-none select-none">
            404
          </div>
        </div>

        {/* Lost location illustration */}
        <div className="mb-8 relative h-32 flex items-center justify-center">
          <div 
            className="relative"
            style={{
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <MapPin className="w-16 h-16 text-indigo-600 animate-bounce" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best explorers get lost sometimes!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for what you're looking for..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition text-gray-800 text-lg shadow-lg"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-6 font-medium">
            Or try one of these helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="group flex items-center gap-2 px-6 py-3 bg-white hover:bg-indigo-600 text-gray-700 hover:text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-indigo-600"
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 hover:border-indigo-600"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Go Back</span>
          </button>
          
          <a
            href="/"
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 text-gray-500 text-sm">
          <p>
            Need help? <a href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound404Page