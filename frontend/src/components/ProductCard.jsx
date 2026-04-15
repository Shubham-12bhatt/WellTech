import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80';
          }}
        />
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-[#ff8c42] text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm font-medium text-[#4CAF50] mb-1">{product.category}</p>
            <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{product.name}</h3>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 flex-1 line-clamp-3">{product.description}</p>
        
        <div className="mt-6 flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#4CAF50]">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-[#4CAF50]">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="w-12 h-12 rounded-full bg-[#e8f5e9] text-[#4CAF50] flex items-center justify-center hover:bg-[#4CAF50] hover:text-white transition-colors duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
