import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../lib/mockData';
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { useState, useEffect } from 'react';

const BRANDS = [
  { name: 'Nike', logo: 'https://cdn.simpleicons.org/nike/000000' },
  { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/000000' },
  { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000000' },
  { name: 'Adidas', logo: 'https://cdn.simpleicons.org/adidas/000000' },
  { name: 'Sony', logo: 'https://cdn.simpleicons.org/sony/000000' },
  { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/000000' }
];

export default function Home() {
  const trendingProducts = MOCK_PRODUCTS.slice(0, 8);
  const flashSaleProducts = MOCK_PRODUCTS.filter(p => p.badges?.includes('Sale')).slice(0, 4);
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { bg: 'from-blue-600 to-purple-600', title: 'Summer Tech Deals', sub: 'Up to 70% off on premium electronics and accessories.', btn: 'Shop Now' },
    { bg: 'from-orange-500 to-red-500', title: 'Flash Sale Is On!', sub: 'Grab the best deals before they run out.', btn: 'View Deals' },
    { bg: 'from-green-500 to-teal-600', title: 'New Arrivals', sub: 'Check out the latest fashion trends.', btn: 'Explore' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Hero Slider */}
      <section className="px-4 relative group">
        <div className={`relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-r ${slides[currentSlide].bg} flex items-center justify-between px-8 md:px-16 shadow-lg transition-colors duration-1000`}>
          <div className="z-10 text-white max-w-lg">
            <span className="bg-white/20 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-4 inline-block">Special Offer</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{slides[currentSlide].title}</h1>
            <p className="text-white/90 mb-6 text-lg">{slides[currentSlide].sub}</p>
            <Link to="/category/deals" className="bg-white text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-md">
              {slides[currentSlide].btn}
            </Link>
          </div>
          <div className="hidden md:block absolute right-10 -bottom-10 opacity-80">
             <div className="w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        {/* Slider Controls */}
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
      </section>

      {/* Brand Strip */}
      <section className="px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 py-6 px-8 flex items-center justify-between gap-8 overflow-x-auto no-scrollbar">
          {BRANDS.map((brand, idx) => (
            <Link to={`/search?brand=${brand.name.toLowerCase()}`} key={idx} className="block min-w-[80px]">
              <img src={brand.logo} alt={brand.name} className="h-8 md:h-12 w-full object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="px-4">
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                <Clock className="w-6 h-6" /> Flash Sale
              </h2>
              <div className="flex items-center gap-1 text-white text-sm font-bold">
                <span className="bg-orange-600 px-2 py-1 rounded">03</span><span className="text-orange-600">:</span>
                <span className="bg-orange-600 px-2 py-1 rounded">45</span><span className="text-orange-600">:</span>
                <span className="bg-orange-600 px-2 py-1 rounded">12</span>
              </div>
            </div>
            <Link to="/category/deals" className="text-orange-600 hover:underline font-medium text-sm">View All Deals</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-lg transition-all group relative flex flex-col">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">-30%</span>
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
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="font-semibold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 line-clamp-2">{product.name}</span>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="font-bold text-xl text-red-600">${product.price.toFixed(2)}</div>
                      <div className="text-sm text-gray-400 line-through">${product.originalPrice?.toFixed(2) || (product.price * 1.3).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Explore Categories</h2>
          <Link to="/categories" className="text-blue-600 hover:underline font-medium text-sm">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_CATEGORIES.map((category) => (
            <Link to={`/category/${category.name.toLowerCase()}`} key={category.id} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white pb-3 flex flex-col items-center">
              <div className="w-full h-40 relative mb-3 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-medium text-gray-800 text-base">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
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
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                <span className="font-semibold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 line-clamp-2">
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
                    className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-4">
        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get the latest updates on new products and upcoming sales. Plus, get 10% off your first order!</p>
          <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button className="px-6 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition-colors whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
