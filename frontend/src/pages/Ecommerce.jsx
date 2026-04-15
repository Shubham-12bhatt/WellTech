import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { Search, SlidersHorizontal, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Premium Whey Protein Isolate",
    price: 49.99,
    discount: 10,
    category: "Nutrition",
    image: "/ecommerce/images/71XWCuCvlEL.jpg",
    description: "High-quality protein powder for muscle recovery and growth. Contains 25g of protein per serving with zero sugar."
  },
  {
    id: 2,
    name: "Advanced Multivitamin Complex",
    price: 24.99,
    discount: 0,
    category: "Supplements",
    image: "/ecommerce/images/5-3-1.jpg",
    description: "Daily multivitamin to support overall health, immunity, and energy levels. Formulated with 22 essential vitamins and minerals."
  },
  {
    id: 3,
    name: "Organic Matcha Green Tea",
    price: 19.99,
    discount: 15,
    category: "Nutrition",
    image: "/ecommerce/images/80421520.jpg",
    description: "Ceremonial grade organic matcha powder rich in antioxidants. Perfect for tea, lattes, or smoothies."
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: 129.99,
    discount: 0,
    category: "Gadgets",
    image: "/ecommerce/images/360_F_245776292_KjTmy7E9bYhpZxfikW1YLbZrG2EPoRay.jpg",
    description: "Track your heart rate, sleep patterns, and daily activities with this advanced smart fitness tracker."
  },
  {
    id: 5,
    name: "Aromatherapy Essential Oil Set",
    price: 34.99,
    discount: 20,
    category: "Wellness",
    image: "/ecommerce/images/essential-oils-2738555_640.jpg",
    description: "Set of 6 pure therapeutic grade essential oils including lavender, peppermint, eucalyptus, and tea tree."
  },
  {
    id: 6,
    name: "Ergonomic Massage Gun",
    price: 89.99,
    discount: 0,
    category: "Gadgets",
    image: "/ecommerce/images/360_F_1203664946_yxinVuXQJ1s0Dk5g2q3zBWqRNy45dysy.jpg",
    description: "Deep tissue muscle massager for pain relief and recovery. Includes 4 massage heads and 6 speed levels."
  },
  {
    id: 7,
    name: "Herbal Sleep Support",
    price: 22.99,
    discount: 0,
    category: "Supplements",
    image: "/ecommerce/images/herbal-supplements-assortment-stockcake.jpg",
    description: "Natural sleep aid formulated with melatonin, chamomile, and valerian root for restful nights."
  },
  {
    id: 8,
    name: "Yoga Mat with Alignment Lines",
    price: 39.99,
    discount: 5,
    category: "Fitness",
    image: "/ecommerce/images/istockphoto-1423117189-612x612.jpg",
    description: "Eco-friendly, non-slip yoga mat with helpful alignment markers. Extra thick for joint comfort."
  }
];

const categories = ["All", "Nutrition", "Supplements", "Wellness", "Fitness", "Gadgets"];

const Ecommerce = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#f9fbfc] min-h-screen pt-10">
      
      {/* Header section with search and cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#4CAF50]">Wellness Shop</h1>
            <p className="text-gray-600 mt-2">Curated products for your health journey</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 lg:w-80">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-white rounded-full shadow-sm border border-gray-100 text-[#4CAF50] hover:bg-[#e8f5e9] transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff8c42] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-4 mt-8 pb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 text-gray-500 mr-4 font-medium shrink-0">
            <SlidersHorizontal size={18} />
            <span>Filters:</span>
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === category 
                    ? 'bg-[#4CAF50] text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-gray-300 mb-4 flex justify-center"><Search size={48} /></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-6 text-[#4CAF50] font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        )}
      </div>

      <Cart 
        isOpen={isCartOpen} 
        setIsOpen={setIsCartOpen} 
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
};

export default Ecommerce;
