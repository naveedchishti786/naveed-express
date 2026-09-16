import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, Tag, Plus, Sparkles, Award, Home, Tv, Activity, Shield, Smartphone, HelpCircle, Truck } from 'lucide-react';

export default function Navbar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { name: "SuperDeals", path: "/category/deals", icon: <Tag className="w-4 h-4 text-orange-500" /> },
    { name: "Plus", path: "/category/plus", icon: <Plus className="w-4 h-4 text-blue-500" /> },
    { name: "New Arrivals", path: "/category/new", icon: <Sparkles className="w-4 h-4 text-purple-500" /> },
    { name: "Top Brands", path: "/category/brands", icon: <Award className="w-4 h-4 text-yellow-500" /> },
    { name: "Home & Garden", path: "/category/home", icon: <Home className="w-4 h-4 text-green-500" /> },
    { name: "Electronics", path: "/category/electronics", icon: <Tv className="w-4 h-4 text-gray-500" /> },
    { name: "Sports", path: "/category/sports", icon: <Activity className="w-4 h-4 text-red-500" /> },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 block shadow-md relative z-40">
      <div className="container mx-auto px-4 h-14 flex items-center gap-4 lg:gap-8">
        
        {/* Category Dropdown */}
        <div className="relative h-full hidden lg:flex items-center" ref={dropdownRef}>
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className={`flex items-center gap-2 font-bold text-white hover:text-orange-400 transition-colors px-4 py-2 rounded-lg cursor-pointer ${isCategoryOpen ? 'bg-slate-700 text-orange-400' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            <Menu className="w-5 h-5" />
            <span>All Categories</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isCategoryOpen && (
            <div className="absolute top-[calc(100%-4px)] left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  to={category.path}
                  onClick={() => setIsCategoryOpen(false)}
                  className="flex items-center gap-4 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                >
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                    {category.icon}
                  </div>
                  {category.name}
                </Link>
              ))}
              <div className="px-6 py-4 mt-2 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
                <Link to="/categories" onClick={() => setIsCategoryOpen(false)} className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1">
                  View All Categories <ChevronDown className="w-4 h-4 -rotate-90" />
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Quick Links (Desktop only) */}
        <ul className="hidden lg:flex items-center gap-6 flex-1 h-full">
          {categories.slice(0, 5).map((category) => (
            <li key={category.name} className="h-full flex items-center">
              <Link 
                to={category.path}
                className="relative text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-2 py-4 group transition-all"
              >
                {category.name}
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out rounded-t-sm"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile categories (visible on mobile only, allows scrolling) */}
        <div className="flex lg:hidden items-center gap-6 flex-1 h-full overflow-x-auto no-scrollbar whitespace-nowrap">
          {categories.slice(0, 5).map(cat => (
            <Link key={cat.name} to={cat.path} className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white shrink-0">
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {/* Right side links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/track" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Truck className="w-4 h-4" /> Track Order
          </Link>
          <div className="h-4 w-px bg-slate-700 hidden xl:block"></div>
          <Link to="/help" className="flex items-center gap-1.5 hover:text-white transition-colors hidden xl:flex">
            <HelpCircle className="w-4 h-4" /> Help
          </Link>
          <Link to="/buyer-protection" className="flex items-center gap-1.5 hover:text-white transition-colors hidden xl:flex">
            <Shield className="w-4 h-4" /> Buyer Protection
          </Link>
          <div className="h-4 w-px bg-slate-700"></div>
          <Link to="/app" className="flex items-center gap-1.5 hover:text-white transition-colors text-orange-400 hover:text-orange-300">
            <Smartphone className="w-4 h-4" /> Download App
          </Link>
        </div>
      </div>
    </nav>
  );
}
