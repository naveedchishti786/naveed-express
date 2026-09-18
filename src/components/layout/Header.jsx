import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Truck, HelpCircle, Shield, Smartphone } from 'lucide-react';
import { useSelector } from 'react-redux';
import SearchBox from './SearchBox';

export default function Header() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const wishlistItems = useSelector((state) => state.wishlist.items.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-y-3">
        <div className="flex items-center gap-2 md:gap-4 order-1">
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="text-2xl font-bold text-primary-600 tracking-tight">
            Naveed<span className="text-orange-500">Express</span>
          </Link>
        </div>

        <div className="w-full lg:w-auto lg:flex-1 order-3 lg:order-2">
          <SearchBox />
        </div>

        <div className="flex items-center gap-2 sm:gap-6 order-2 lg:order-3">
          <Link to="/account" className="flex flex-col items-center text-gray-600 hover:text-primary-600 transition-colors">
            <User className="w-6 h-6" />
            <span className="text-xs hidden sm:block mt-1 font-medium">Account</span>
          </Link>
          
          <Link to="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-primary-600 transition-colors relative">
            <div className="relative">
              <Heart className="w-6 h-6" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistItems}
                </span>
              )}
            </div>
            <span className="text-xs hidden sm:block mt-1 font-medium">Wishlist</span>
          </Link>
          
          <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors bg-gray-50 hover:bg-primary-50 px-3 py-2 rounded-lg border border-gray-100">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {cartQuantity}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none ml-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Total</span>
              <span className="text-sm font-bold text-gray-900">${(totalAmount || 0).toFixed(2)}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col animate-in slide-in-from-left-full duration-300">
            <div className="p-4 border-b flex items-center justify-between">
              <span className="font-bold text-lg text-primary-600">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="flex flex-col gap-2 px-4">
                <Link to="/track" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 text-gray-700 hover:text-primary-600 border-b border-gray-50">
                  <Truck className="w-5 h-5 text-gray-400" /> Track Order
                </Link>
                <Link to="/help" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 text-gray-700 hover:text-primary-600 border-b border-gray-50">
                  <HelpCircle className="w-5 h-5 text-gray-400" /> Help Center
                </Link>
                <Link to="/buyer-protection" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 text-gray-700 hover:text-primary-600 border-b border-gray-50">
                  <Shield className="w-5 h-5 text-gray-400" /> Buyer Protection
                </Link>
                <Link to="/app" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 text-orange-500 hover:text-orange-600">
                  <Smartphone className="w-5 h-5" /> Download App
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
