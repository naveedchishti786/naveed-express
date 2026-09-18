import { useSearchParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../lib/mockData';
import { Star, ShoppingCart, Frown, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const brandQuery = searchParams.get('brand') || '';
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);

  const results = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = query ? (p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())) : true;
    const matchesBrand = brandQuery ? (p.brand?.toLowerCase() === brandQuery.toLowerCase()) : true;
    return matchesSearch && matchesBrand;
  });

  const headingText = brandQuery && query 
    ? `Search Results for "${query}" in ${brandQuery}`
    : brandQuery 
      ? `Products by ${brandQuery.charAt(0).toUpperCase() + brandQuery.slice(1)}`
      : `Search Results for "${query}"`;

  return (
    <div className="py-8 px-4 container mx-auto">
      <h1 className="text-2xl font-bold mb-6">{headingText}</h1>
      
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <Frown className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-medium text-gray-600 mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">Try checking your spelling or use more general terms</p>
          <Link to="/" className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
            Go Back Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group relative flex flex-col">
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                {product.badges?.map(badge => (
                  <span key={badge} className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
              
              <div className="absolute top-3 right-3 z-20">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image
                    }));
                  }}
                  className="w-8 h-8 bg-white/90 shadow-sm text-gray-400 rounded-full flex items-center justify-center hover:text-red-500 hover:bg-white transition-all"
                >
                  <Heart className={`w-[18px] h-[18px] ${wishlistItems.some(i => i.id === product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
                <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                <span className="font-semibold text-gray-900 leading-tight mb-2 group-hover:text-primary-600 line-clamp-2">
                  {product.name}
                </span>
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
                  <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                </div>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <div className="font-bold text-xl text-gray-900">${product.price.toFixed(2)}</div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</div>
                    )}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                        color: product.colors?.[0],
                        size: product.sizes?.[0]
                      }));
                    }}
                    className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors disabled:opacity-50"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
