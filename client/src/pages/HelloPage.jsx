import React, { useState, useEffect } from 'react';
import { ChevronDown, ShoppingCart, Search, Star, Menu, X, Home } from 'lucide-react';

// Dummy Data
const categoriesData = [
  {
    _id: '1',
    name: 'Computing',
    slug: 'computing',
    subcategories: [
      { _id: '1a', name: 'Laptops', slug: 'laptops', parent: '1' },
      { _id: '1b', name: 'Networking', slug: 'networking', parent: '1' },
      { _id: '1c', name: 'Monitors', slug: 'monitors', parent: '1' },
      { _id: '1d', name: 'Printers', slug: 'printers', parent: '1' },
      { _id: '1e', name: 'Memory Cards & Flash Drives', slug: 'memory-cards', parent: '1' }
    ]
  },
  {
    _id: '2',
    name: 'Appliances',
    slug: 'appliances',
    subcategories: [
      { _id: '2a', name: 'Refrigerators', slug: 'refrigerators', parent: '2' },
      { _id: '2b', name: 'Washing Machines', slug: 'washing-machines', parent: '2' },
      { _id: '2c', name: 'Microwaves', slug: 'microwaves', parent: '2' },
      { _id: '2d', name: 'Air Conditioners', slug: 'air-conditioners', parent: '2' }
    ]
  },
  {
    _id: '3',
    name: 'Phones & Tablets',
    slug: 'phones-tablets',
    subcategories: [
      { _id: '3a', name: 'Smartphones', slug: 'smartphones', parent: '3' },
      { _id: '3b', name: 'Tablets', slug: 'tablets', parent: '3' },
      { _id: '3c', name: 'Phone Accessories', slug: 'phone-accessories', parent: '3' }
    ]
  },
  {
    _id: '4',
    name: 'Gaming',
    slug: 'gaming',
    subcategories: [
      { _id: '4a', name: 'Consoles', slug: 'consoles', parent: '4' },
      { _id: '4b', name: 'Video Games', slug: 'video-games', parent: '4' },
      { _id: '4c', name: 'Controllers', slug: 'controllers', parent: '4' },
      { _id: '4d', name: 'Gaming Chairs', slug: 'gaming-chairs', parent: '4' }
    ]
  },
  {
    _id: '5',
    name: 'Fashion',
    slug: 'fashion',
    subcategories: [
      { _id: '5a', name: "Men's Clothing", slug: 'mens-clothing', parent: '5' },
      { _id: '5b', name: "Women's Clothing", slug: 'womens-clothing', parent: '5' },
      { _id: '5c', name: 'Shoes', slug: 'shoes', parent: '5' },
      { _id: '5d', name: 'Bags & Accessories', slug: 'bags-accessories', parent: '5' }
    ]
  },
  {
    _id: '6',
    name: 'Health & Beauty',
    slug: 'health-beauty',
    subcategories: [
      { _id: '6a', name: 'Skincare', slug: 'skincare', parent: '6' },
      { _id: '6b', name: 'Hair Care', slug: 'hair-care', parent: '6' },
      { _id: '6c', name: 'Makeup', slug: 'makeup', parent: '6' },
      { _id: '6d', name: 'Supplements', slug: 'supplements', parent: '6' }
    ]
  }
];

const productsData = [
  {
    _id: 'p1',
    name: 'Dell XPS 15 Laptop',
    price: 1299.99,
    category: '1a',
    parentCategory: '1',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 234,
    brand: 'Dell'
  },
  {
    _id: 'p2',
    name: 'MacBook Pro 14"',
    price: 1999.99,
    category: '1a',
    parentCategory: '1',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 567,
    brand: 'Apple'
  },
  {
    _id: 'p3',
    name: 'HP Gaming Laptop',
    price: 1099.99,
    category: '1a',
    parentCategory: '1',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop',
    rating: 4.5,
    numReviews: 189,
    brand: 'HP'
  },
  {
    _id: 'p4',
    name: 'Samsung 27" 4K Monitor',
    price: 399.99,
    category: '1c',
    parentCategory: '1',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    rating: 4.6,
    numReviews: 312,
    brand: 'Samsung'
  },
  {
    _id: 'p5',
    name: 'LG UltraWide 34"',
    price: 599.99,
    category: '1c',
    parentCategory: '1',
    image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 245,
    brand: 'LG'
  },
  {
    _id: 'p6',
    name: 'iPhone 15 Pro',
    price: 1199.99,
    category: '3a',
    parentCategory: '3',
    image: 'https://images.unsplash.com/photo-1592286927505-2fd0d113e9f7?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 892,
    brand: 'Apple'
  },
  {
    _id: 'p7',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1299.99,
    category: '3a',
    parentCategory: '3',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 634,
    brand: 'Samsung'
  },
  {
    _id: 'p8',
    name: 'Google Pixel 8 Pro',
    price: 999.99,
    category: '3a',
    parentCategory: '3',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 421,
    brand: 'Google'
  },
  {
    _id: 'p9',
    name: 'PlayStation 5',
    price: 499.99,
    category: '4a',
    parentCategory: '4',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
    rating: 4.9,
    numReviews: 1234,
    brand: 'Sony'
  },
  {
    _id: 'p10',
    name: 'Xbox Series X',
    price: 499.99,
    category: '4a',
    parentCategory: '4',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop',
    rating: 4.8,
    numReviews: 987,
    brand: 'Microsoft'
  },
  {
    _id: 'p11',
    name: 'Nike Air Max 270',
    price: 159.99,
    category: '5c',
    parentCategory: '5',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    rating: 4.6,
    numReviews: 523,
    brand: 'Nike'
  },
  {
    _id: 'p12',
    name: 'Adidas Ultraboost',
    price: 189.99,
    category: '5c',
    parentCategory: '5',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop',
    rating: 4.7,
    numReviews: 412,
    brand: 'Adidas'
  }
];

const HelloPage = () => {
  const [activeParent, setActiveParent] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    let filtered = [...productsData];
    const crumbs = [{ name: 'Home', slug: null }];

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory._id);
      const parent = categoriesData.find(c => c._id === selectedCategory.parent);
      if (parent) {
        crumbs.push({ name: parent.name, slug: parent.slug, isParent: true });
      }
      crumbs.push({ name: selectedCategory.name, slug: selectedCategory.slug });
    } else if (selectedParent) {
      const subIds = selectedParent.subcategories.map(s => s._id);
      filtered = filtered.filter(p => subIds.includes(p.category));
      crumbs.push({ name: selectedParent.name, slug: selectedParent.slug, isParent: true });
    }

    setFilteredProducts(filtered);
    setBreadcrumb(crumbs);
  }, [selectedParent, selectedCategory]);

  const handleParentClick = (parent) => {
    setSelectedParent(parent);
    setSelectedCategory(null);
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedParent(null);
    setMobileMenuOpen(false);
  };

  const handleHome = () => {
    setSelectedParent(null);
    setSelectedCategory(null);
    setFilteredProducts(productsData);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const currentParentForSidebar = selectedCategory 
    ? categoriesData.find(c => c._id === selectedCategory.parent)
    : selectedParent;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 
                className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition"
                onClick={handleHome}
              >
                ShopHub
              </h1>
            </div>
            
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button className="relative hover:text-blue-400 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:block border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-6 py-3">
              {categoriesData.map((parent) => (
                <div
                  key={parent._id}
                  className="relative group"
                  onMouseEnter={() => setActiveParent(parent._id)}
                  onMouseLeave={() => setActiveParent(null)}
                >
                  <button
                    onClick={() => handleParentClick(parent)}
                    className={`font-semibold hover:text-blue-400 transition flex items-center gap-1 ${
                      selectedParent?._id === parent._id ? 'text-blue-400' : ''
                    }`}
                  >
                    {parent.name}
                    <ChevronDown size={16} />
                  </button>

                  {/* Dropdown */}
                  {activeParent === parent._id && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white text-slate-900 shadow-xl rounded-lg py-2 z-50">
                      <button
                        onClick={() => handleParentClick(parent)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 font-semibold"
                      >
                        All {parent.name}
                      </button>
                      <div className="border-t border-slate-200 my-2"></div>
                      {parent.subcategories.map((sub) => (
                        <button
                          key={sub._id}
                          onClick={() => handleCategoryClick(sub)}
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-800 border-t border-slate-700">
            <div className="max-w-7xl mx-auto px-4 py-4 max-h-96 overflow-y-auto">
              {categoriesData.map((parent) => (
                <div key={parent._id} className="mb-4">
                  <button
                    onClick={() => handleParentClick(parent)}
                    className="font-semibold text-lg mb-2 hover:text-blue-400 transition"
                  >
                    {parent.name}
                  </button>
                  <div className="pl-4 space-y-1">
                    {parent.subcategories.map((sub) => (
                      <button
                        key={sub._id}
                        onClick={() => handleCategoryClick(sub)}
                        className="block text-slate-300 hover:text-blue-400 transition py-1"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {breadcrumb.length > 1 && (
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
            {breadcrumb.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>/</span>}
                <button
                  onClick={() => {
                    if (crumb.slug === null) handleHome();
                    else if (crumb.isParent) {
                      const parent = categoriesData.find(c => c.slug === crumb.slug);
                      handleParentClick(parent);
                    }
                  }}
                  className={`hover:text-blue-600 ${
                    index === breadcrumb.length - 1 ? 'font-semibold text-slate-900' : ''
                  }`}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          {currentParentForSidebar && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="font-bold text-xl mb-4 text-slate-900">
                  {currentParentForSidebar.name}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleParentClick(currentParentForSidebar)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedParent?._id === currentParentForSidebar._id && !selectedCategory
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    All {currentParentForSidebar.name}
                  </button>
                  {currentParentForSidebar.subcategories.map((sub) => (
                    <button
                      key={sub._id}
                      onClick={() => handleCategoryClick(sub)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory?._id === sub._id
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className={currentParentForSidebar ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedCategory
                  ? selectedCategory.name
                  : selectedParent
                  ? selectedParent.name
                  : 'All Products'}
              </h2>
              <span className="text-slate-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="h-48 bg-slate-200 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-slate-500 mb-1">{product.brand}</p>
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={product.rating} />
                      <span className="text-sm text-slate-600">
                        ({product.numReviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        ${product.price}
                      </span>
                      <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition text-sm font-semibold">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelloPage;