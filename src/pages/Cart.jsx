import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Heart, Lock, Truck } from 'lucide-react';
import { removeFromCart, updateQuantity, saveForLater, moveToCartFromSaved, removeFromSaved } from '../store/slices/cartSlice';
import { useState } from 'react';

export default function Cart() {
  const { items, savedForLater, totalAmount, totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'SAVE20') {
      setDiscount(totalAmount * 0.20);
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleUpdateQuantity = (item, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ ...item, quantity }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const FREE_SHIPPING_THRESHOLD = 59.99;
  const shipping = totalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : 10.00;
  const tax = (totalAmount - discount) * 0.08; 
  const finalTotal = (totalAmount - discount) + shipping + tax;

  if (items.length === 0 && savedForLater.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Explore our top categories to find something you'll love.</p>
        <Link to="/" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 container mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart <span className="text-gray-500 font-normal text-lg ml-2">({totalQuantity} items)</span></h1>
      
      {/* Free Shipping Banner */}
      {items.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center gap-4">
          <Truck className="w-8 h-8 text-blue-600" />
          <div className="flex-1">
            {totalAmount >= FREE_SHIPPING_THRESHOLD ? (
              <p className="text-blue-800 font-medium">Congratulations! You qualify for <span className="font-bold">Free Shipping</span>.</p>
            ) : (
              <div>
                <p className="text-blue-800 font-medium mb-1">Add <span className="font-bold">${(FREE_SHIPPING_THRESHOLD - totalAmount).toFixed(2)}</span> more to your cart for <span className="font-bold">Free Shipping</span>!</p>
                <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totalAmount / FREE_SHIPPING_THRESHOLD) * 100)}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="lg:w-2/3 flex flex-col gap-8">
          {items.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className={`p-6 flex flex-col sm:flex-row gap-6 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border border-gray-100 overflow-hidden shrink-0 bg-gray-50 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4">
                      <Link to={`/product/${item.id}`} className="font-semibold text-gray-900 hover:text-blue-600 text-lg leading-tight line-clamp-2">
                        {item.name}
                      </Link>
                      <div className="font-bold text-xl">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    
                    {(item.color || item.size) && (
                      <div className="text-sm text-gray-500 mt-1 mb-2 flex gap-4">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                    )}
                    
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-1">
                        <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50" disabled={item.quantity <= 1}>
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-900">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-blue-600 transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex gap-2">
                        <button onClick={() => dispatch(saveForLater(item))} className="text-sm font-medium text-gray-500 hover:text-blue-600 px-3 py-2 flex items-center gap-2 rounded-md hover:bg-gray-50 transition-colors">
                          <Heart className="w-4 h-4" /> Save for later
                        </button>
                        <button onClick={() => handleRemove(item)} className="text-sm font-medium text-red-500 hover:text-red-700 px-3 py-2 flex items-center gap-2 rounded-md hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Saved for Later */}
          {savedForLater.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-orange-500"/> Saved for Later ({savedForLater.length})</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {savedForLater.map((item, index) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className={`p-4 flex gap-4 ${index !== savedForLater.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-gray-50 rounded" />
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`} className="font-semibold hover:text-blue-600 line-clamp-1">{item.name}</Link>
                      <div className="text-sm font-bold text-gray-900 my-1">${item.price.toFixed(2)}</div>
                      <div className="flex gap-3 mt-2">
                        <button onClick={() => dispatch(moveToCartFromSaved(item))} className="text-sm text-blue-600 font-medium hover:underline">Move to Cart</button>
                        <button onClick={() => dispatch(removeFromSaved(item))} className="text-sm text-gray-500 hover:text-red-500">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({totalQuantity})</span>
                <span className="font-medium text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (8%)</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="mb-6 flex gap-2">
              <input 
                type="text" 
                placeholder="Coupon code (try SAVE20)" 
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-blue-500"
              />
              <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Apply</button>
            </form>
            
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-extrabold text-3xl text-gray-900">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Link to="/checkout" className={`w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 ${items.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Link>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Lock className="w-3 h-3" /> Secure checkout powered by Stripe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
