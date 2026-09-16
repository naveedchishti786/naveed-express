import { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../lib/mockData';
import { Star, ShoppingCart, Filter, ChevronDown, LayoutGrid, List, Heart } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';

export default function Category() {
  const { id } = useParams();
  const categoryName = id ? id.charAt(0).toUpperCase() + id.slice(1) : 'All';
    const baseProducts = useMemo(() => {
    if (!id || id === 'all') return MOCK_PRODUCTS;
    const lowerId = id.toLowerCase();
    
    // Special Navigation Categories
    if (lowerId === 'deals') return MOCK_PRODUCTS.filter(p => p.badges?.includes('Sale') || p.originalPrice);
    if (lowerId === 'plus') return MOCK_PRODUCTS.filter(p => p.rating >= 4.7);
    if (lowerId === 'new') return MOCK_PRODUCTS.filter(p => p.badges?.includes('New Arrival') || p.name.includes('New'));
    if (lowerId === 'brands') return MOCK_PRODUCTS.filter(p => p.brand);
    
    // Exact category match or partial match (for "home" -> "Home & Garden")
    return MOCK_PRODUCTS.filter(p => {
      const cat = p.category.toLowerCase();
      return cat === lowerId || (lowerId === 'home' && cat.includes('home'));
    });
  }, [id]);
    
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);

  // Filters state
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [appliedPrice, setAppliedPrice] = useState({ min: '', max: '' });
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('Best Match');
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(12);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const allBrands = useMemo(() => {
    const brands = baseProducts.map(p => p.brand).filter(Boolean);
    return [...new Set(brands)];
  }, [baseProducts]);

  const handleApplyPrice = () => {
    setAppliedPrice({ min: priceMin, max: priceMax });
    setVisibleCount(12); // reset pagination on filter change
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
    setVisibleCount(12);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setVisibleCount(12);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...baseProducts];

    // Price
    if (appliedPrice.min !== '') {
      result = result.filter(p => p.price >= Number(appliedPrice.min));
    }
    if (appliedPrice.max !== '') {
      result = result.filter(p => p.price <= Number(appliedPrice.max));
    }

    // Rating
    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);
      result = result.filter(p => p.rating >= minRating);
    }

    // Brands
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Sorting
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Top Rated') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [baseProducts, appliedPrice, selectedRatings, selectedBrands, sortBy]);

  const visibleProducts = filteredAndSortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedProducts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };

  return (
    <div className="py-8 px-4 container mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 rounded-xl font-bold text-gray-700 shadow-sm"
          >
            <Filter className="w-5 h-5" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center justify-between gap-2 mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">Filters</h2>
            </div>
            <button className="md:hidden text-gray-400" onClick={() => setShowMobileFilters(false)}>✕</button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center justify-between">Price Range <ChevronDown className="w-4 h-4"/></h3>
            <div className="flex gap-2 items-center">
              <input 
                type="number" 
                placeholder="Min" 
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full border rounded p-2 text-sm focus:outline-blue-500" 
              />
              <span>-</span>
              <input 
                type="number" 
                placeholder="Max" 
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full border rounded p-2 text-sm focus:outline-blue-500" 
              />
            </div>
            <button 
              onClick={handleApplyPrice}
              className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-sm font-medium py-2 rounded transition-colors"
            >
              Apply
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Rating</h3>
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center gap-2 mb-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                  className="rounded text-blue-600 focus:ring-blue-500" 
                />
                <div className="flex items-center">
                  {Array.from({length: rating}).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">& Up</span>
                </div>
              </label>
            ))}
          </div>

          {allBrands.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Brand</h3>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {allBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">{categoryName} Products <span className="text-sm text-gray-500 font-normal ml-2">({filteredAndSortedProducts.length} items)</span></h1>
          
          <div className="flex items-center gap-4">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option>Best Match</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {visibleProducts.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id} 
                className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group relative ${viewMode === 'list' ? 'flex flex-row h-48' : 'flex flex-col'}`}
              >
                {product.badges && (
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.badges.map(badge => (
                      <span key={badge} className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                
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
                <div className={`relative overflow-hidden bg-gray-50 shrink-0 ${viewMode === 'list' ? 'w-48 h-full' : 'w-full h-48'}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className={`p-4 flex flex-col flex-1 ${viewMode === 'list' ? 'border-l border-gray-50' : 'border-t border-gray-50'}`}>
                  <span className="font-medium text-gray-900 leading-tight mb-2 group-hover:text-blue-600 line-clamp-2">
                    {product.name}
                  </span>
                  
                  {viewMode === 'list' && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description || 'Premium quality product.'}</p>
                  )}

                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                  
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="font-bold text-xl text-red-600">${product.price.toFixed(2)}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</div>
                      )}
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="px-6 py-3 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
