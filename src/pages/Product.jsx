import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../lib/mockData';
import { Star, Minus, Plus, ShoppingCart, Heart, Shield, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';

export default function Product() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(product.image);
  
  // Variants state
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  // Re-sync main image if product changes
  useMemo(() => {
    setMainImage(product.image);
    setQuantity(1);
    setSelectedColor(product.colors?.[0] || '');
    setSelectedSize(product.sizes?.[0] || '');
  }, [product]);

  const relatedProducts = useMemo(() => {
    return MOCK_PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize
    }));
  };

  const handleWishlist = () => {
    if (!isWishlisted) {
      dispatch(toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      }));
    }
  };

  // Mocking multiple images for the gallery
  const galleryImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="py-8 px-4 container mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-blue-600 transition-colors">{product.category}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
        <div className="flex flex-col lg:flex-row">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-4">
              <img src={mainImage} alt={product.name} className="w-full h-full object-contain p-8" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {galleryImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img && i === 0 ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{product.brand}</span>
              {product.badges?.map(badge => (
                <span key={badge} className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">{badge}</span>
              ))}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold ml-1">{product.rating}</span>
                <button onClick={() => setActiveTab('reviews')} className="text-gray-500 text-sm ml-2 hover:underline cursor-pointer">
                  {product.reviews} Reviews
                </button>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 font-medium text-sm">In Stock</span>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-extrabold text-red-600">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <p className="text-sm text-gray-500">Prices include VAT where applicable.</p>
            </div>

            {/* Variants */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                        selectedColor === color 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-3">Size: <span className="text-gray-500 font-normal">{selectedSize}</span></h3>
                <div className="flex gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center border rounded-md text-sm font-medium transition-all ${
                        selectedSize === size 
                          ? 'border-blue-600 bg-blue-50 text-blue-600' 
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  ><Minus className="w-4 h-4"/></button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  ><Plus className="w-4 h-4"/></button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.inStock ? 'Available' : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:shadow-none"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button 
                onClick={handleWishlist}
                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-colors shrink-0 ${isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-500'}`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500">Buyer Protection</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500">Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {['Description', 'Specifications', 'Reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`flex-1 py-4 px-6 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.toLowerCase() 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-8 min-h-[300px]">
          {activeTab === 'description' && (
            <div className="max-w-3xl text-gray-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Product Overview</h3>
              <p className="mb-4">{product.description || 'Experience premium quality with this top-tier product. Designed with precision and built to last, it delivers exceptional performance for all your needs.'}</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>High-quality materials ensure durability</li>
                <li>Ergonomic design for maximum comfort</li>
                <li>Advanced features for superior performance</li>
                <li>1-year manufacturer warranty included</li>
              </ul>
            </div>
          )}
          {activeTab === 'specifications' && (
            <table className="w-full text-left text-sm text-gray-600 max-w-2xl">
              <tbody>
                <tr className="border-b border-gray-100"><th className="py-4 font-medium text-gray-900 w-1/3">Brand</th><td className="py-4">{product.brand}</td></tr>
                <tr className="border-b border-gray-100"><th className="py-4 font-medium text-gray-900 w-1/3">Category</th><td className="py-4">{product.category}</td></tr>
                <tr className="border-b border-gray-100"><th className="py-4 font-medium text-gray-900 w-1/3">Weight</th><td className="py-4">1.2 kg</td></tr>
                <tr className="border-b border-gray-100"><th className="py-4 font-medium text-gray-900 w-1/3">Dimensions</th><td className="py-4">10 x 5 x 2 inches</td></tr>
              </tbody>
            </table>
          )}
          {activeTab === 'reviews' && (
            <div className="max-w-2xl">
              <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-100">
                <div className="text-center bg-gray-50 p-6 rounded-2xl w-48 shrink-0">
                  <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                  <div className="flex justify-center mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
                  </div>
                  <div className="text-sm text-gray-500">{product.reviews} reviews</div>
                </div>
                <div className="flex-1 space-y-3">
                  {[5,4,3,2,1].map(star => (
                    <div key={star} className="flex items-center gap-4">
                      <span className="text-sm font-medium w-12 text-right">{star} Star</span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star * 2}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <Link to={`/product/${relProduct.id}`} key={relProduct.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group relative flex flex-col">
                
              <div className="absolute top-3 right-3 z-20">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(toggleWishlist({
                      id: relProduct.id,
                      name: relProduct.name,
                      price: relProduct.price,
                      image: relProduct.image
                    }));
                  }}
                  className="w-8 h-8 bg-white/90 shadow-sm text-gray-400 rounded-full flex items-center justify-center hover:text-red-500 hover:bg-white transition-all"
                >
                  <Heart className={`w-[18px] h-[18px] ${wishlistItems.some(i => i.id === relProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
                <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                  <img 
                    src={relProduct.image} 
                    alt={relProduct.name} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1 border-t border-gray-50">
                  <span className="font-medium text-gray-900 leading-tight mb-2 group-hover:text-blue-600 line-clamp-2">
                    {relProduct.name}
                  </span>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{relProduct.rating}</span>
                  </div>
                  <div className="mt-auto">
                    <div className="font-bold text-lg text-red-600">${relProduct.price.toFixed(2)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
