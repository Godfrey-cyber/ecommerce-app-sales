import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Utensils, Users, Waves, Camera, Clock, MapPin, Phone, Award, Calendar, Mail, User, MessageSquare, Star } from 'lucide-react';

const ShepherdsFieldHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    guests: '',
    message: ''
  });

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=600&fit=crop',
      title: 'Exquisite Dining Experience',
      subtitle: 'Savor our premium buffet and food packages'
    },
    {
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=600&fit=crop',
      title: 'Perfect Event Venues',
      subtitle: 'Host your conferences and meetings in style'
    },
    {
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=600&fit=crop',
      title: 'Luxury & Relaxation',
      subtitle: 'Unwind at our pristine swimming pool'
    }
  ];

  const services = [
    {
      icon: <Utensils className="w-12 h-12" />,
      title: 'Food Packages & Buffet',
      description: 'Indulge in our carefully curated menu featuring local and international cuisine. From intimate gatherings to grand celebrations, our buffet offerings cater to every palate.',
      image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=400&fit=crop',
      details: [
        'Continental & Local Dishes',
        'Customizable Menu Options',
        'Vegetarian & Non-Vegetarian Selections',
        'Special Dietary Accommodations',
        'Live Cooking Stations Available'
      ]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Conference & Meeting Halls',
      description: 'State-of-the-art facilities equipped with modern technology. Perfect for corporate events, seminars, weddings, and private functions with flexible seating arrangements.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
      details: [
        'Capacity: 50-500 Guests',
        'Audio-Visual Equipment',
        'High-Speed WiFi',
        'Professional Sound System',
        'Customizable Seating Layouts'
      ]
    },
    {
      icon: <Waves className="w-12 h-12" />,
      title: 'Swimming Pool',
      description: 'Dive into luxury at our sparkling swimming pool. A perfect retreat for relaxation, family fun, or poolside events in a serene atmosphere.',
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&h=400&fit=crop',
      details: [
        'Olympic-Size Pool',
        'Kids Splash Area',
        'Poolside Cabanas',
        'Changing Rooms & Showers',
        'Lifeguard on Duty'
      ]
    },
    {
      icon: <Camera className="w-12 h-12" />,
      title: 'Photo Shoot Locations',
      description: 'Capture your special moments against stunning backdrops. Our picturesque grounds provide the perfect setting for professional photography and memorable portraits.',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
      details: [
        'Garden & Landscape Settings',
        'Indoor Studio Spaces',
        'Natural Lighting Options',
        'Privacy & Exclusivity',
        'Flexible Booking Hours'
      ]
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Flexible Hours',
      description: 'Open daily to serve you better'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Prime Location',
      description: 'Easy access with ample parking'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Excellence in every detail'
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Always here to assist you'
    }
  ];

  const galleryItems = [
    { id: 1, category: 'food', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop', title: 'Gourmet Dishes' },
    { id: 2, category: 'events', image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c7b1?w=600&h=400&fit=crop', title: 'Wedding Reception' },
    { id: 3, category: 'pool', image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=600&h=400&fit=crop', title: 'Pool Area' },
    { id: 4, category: 'food', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop', title: 'Buffet Spread' },
    { id: 5, category: 'venue', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop', title: 'Conference Hall' },
    { id: 6, category: 'events', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop', title: 'Corporate Event' },
    { id: 7, category: 'pool', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop', title: 'Poolside Relaxation' },
    { id: 8, category: 'venue', image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=400&fit=crop', title: 'Garden Views' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Corporate Event Manager',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      rating: 5,
      text: 'Shepherds Field exceeded our expectations for our annual company retreat. The conference facilities were top-notch, and the catering was absolutely divine. Our team is still raving about the experience!'
    },
    {
      name: 'Michael Adeyemi',
      role: 'Wedding Planner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      rating: 5,
      text: 'I\'ve organized countless weddings, and Shepherds Field stands out as one of the finest venues. The attention to detail, beautiful ambiance, and exceptional service made our couple\'s special day unforgettable.'
    },
    {
      name: 'Chioma Okafor',
      role: 'Birthday Celebrant',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      rating: 5,
      text: 'My 40th birthday celebration at Shepherds Field was magical! The pool area was perfect for our afternoon party, and the food was incredible. Thank you for making my day so special!'
    },
    {
      name: 'David Osei',
      role: 'Photographer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      rating: 5,
      text: 'As a professional photographer, I\'m always looking for stunning locations. Shepherds Field offers beautiful backdrops and the staff is incredibly accommodating. Highly recommend for photo shoots!'
    }
  ];

  const filteredGallery = selectedGalleryCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedGalleryCategory);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your booking request! We will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      service: '',
      guests: '',
      message: ''
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-white font-serif">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white tracking-wider">Shepherds Field</h1>
            <div className="hidden md:flex space-x-8 text-white font-sans text-sm tracking-wide">
              <a href="#home" className="hover:text-amber-400 transition">HOME</a>
              <a href="#services" className="hover:text-amber-400 transition">SERVICES</a>
              <a href="#gallery" className="hover:text-amber-400 transition">GALLERY</a>
              <a href="#testimonials" className="hover:text-amber-400 transition">TESTIMONIALS</a>
              <a href="#booking" className="hover:text-amber-400 transition">BOOK NOW</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <div className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-4xl px-6">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-white/90 animate-fade-in">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition z-40"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition z-40"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-40">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif italic">
              Welcome to Shepherds Field
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 leading-relaxed font-light">
              Your premier destination for unforgettable experiences. Whether you're planning a corporate event, 
              celebrating a special occasion, or simply seeking a place to relax and create memories, 
              Shepherds Field offers exceptional facilities and services tailored to your every need.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
                <div className="text-amber-600 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sans">{feature.title}</h3>
                <p className="text-gray-600 text-sm font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-serif italic">
              Our Signature Services
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>
          
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-12 lg:gap-16`}
              >
                {/* Image Side */}
                <div className="flex-1 relative group">
                  <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-4 rounded-lg shadow-lg">
                    {service.icon}
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
                      {service.title}
                    </h3>
                    <div className="w-16 h-1 bg-amber-600 mb-6"></div>
                    <p className="text-lg text-gray-700 leading-relaxed font-light mb-8">
                      {service.description}
                    </p>
                  </div>

                  {/* Details List */}
                  <div className="bg-amber-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sans tracking-wide">
                      WHAT WE OFFER
                    </h4>
                    <ul className="space-y-3">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700 font-light">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-6 bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition font-sans tracking-wide text-sm">
                    LEARN MORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif italic">
            Ready to Experience Excellence?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
            Book your event or visit us today. Let us make your occasion truly memorable.
          </p>
          <a href="#booking" className="inline-block bg-white text-amber-700 px-10 py-4 rounded-full text-lg font-semibold hover:bg-amber-50 transition shadow-lg font-sans tracking-wide">
            CONTACT US NOW
          </a>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-serif italic">
              Our Gallery
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Explore our beautiful venue, exquisite cuisine, and memorable events
            </p>
          </div>

          {/* Gallery Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'food', 'events', 'venue', 'pool'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedGalleryCategory(category)}
                className={`px-6 py-2 rounded-full font-sans text-sm tracking-wide transition ${
                  selectedGalleryCategory === category
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-100'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-serif italic">
              What Our Clients Say
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Don't just take our word for it - hear from those who've experienced Shepherds Field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-amber-50 p-8 rounded-xl shadow-md hover:shadow-xl transition">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 font-light">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 font-light leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-serif italic">
                Book Your Event
              </h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 font-light">
                Fill out the form below and our team will get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-sans text-sm tracking-wide">
                    FULL NAME *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-sans text-sm tracking-wide">
                    EMAIL ADDRESS *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-sans text-sm tracking-wide">
                    PHONE NUMBER *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-sans text-sm tracking-wide">
                    EVENT DATE *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-sans text-sm tracking-wide">
                    SERVICE TYPE *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light"
                  >
                    <option value="">Select a service</option>
                    <option value="buffet">Food Packages & Buffet</option>
                    <option value="conference">Conference Hall</option>
                    <option value="pool">Swimming Pool</option>
                    <option value="photoshoot">Photo Shoot</option>
                    <option value="multiple">Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-sans text-sm tracking-wide">
                    NUMBER OF GUESTS *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light"
                      placeholder="50"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2 font-sans text-sm tracking-wide">
                  ADDITIONAL DETAILS
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light"
                    placeholder="Tell us more about your event, special requirements, or any questions you have..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition shadow-lg font-sans tracking-wide text-lg"
              >
                SUBMIT BOOKING REQUEST
              </button>

              <p className="text-center text-gray-600 text-sm mt-6 font-light">
                By submitting this form, you agree to our terms and conditions
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4 font-serif tracking-wider">Shepherds Field</h3>
          <p className="text-gray-400 mb-6 font-light italic">
            Creating memorable experiences, one event at a time.
          </p>
          <p className="text-gray-500 text-sm font-sans">
            © 2024 Shepherds Field. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ShepherdsFieldHomepage;