import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

export default function Wishlist() {
  const { items } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-red-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Save items you love here to keep track of them or buy them later.</p>
        <Link to="/" className="bg-primary-600 text-white font-bold px-8 py-3 rounded-full hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20">
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 container mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        My Wishlist <Heart className="w-6 h-6 text-red-500 fill-red-500" />
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow relative flex flex-col">
            <button 
              onClick={() => handleRemove(item.id)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 hover:bg-red-50 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <div className="relative h-48 w-full bg-gray-50 p-4">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            </div>
            
            <div className="p-4 flex flex-col flex-1 border-t border-gray-50">
              <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 leading-tight mb-2 hover:text-primary-600 line-clamp-2">
                {item.name}
              </Link>
              <div className="font-bold text-lg text-gray-900 mb-4">${item.price.toFixed(2)}</div>
              
              <button 
                onClick={() => handleMoveToCart(item)}
                className="mt-auto w-full border border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
