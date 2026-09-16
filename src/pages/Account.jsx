import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { LogOut, Package, Heart, MapPin, User, Settings } from 'lucide-react';
import { logout } from '../store/slices/authSlice';

export default function Account() {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { items: wishlistItems } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('orders');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const dummyOrders = [
    { id: 'ORD-10293', date: '2026-08-15', total: 125.50, status: 'Delivered', items: 2 },
    { id: 'ORD-98341', date: '2026-07-22', total: 49.99, status: 'Processing', items: 1 }
  ];

  return (
    <div className="py-8 px-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500 truncate w-32">{user.email}</p>
              </div>
            </div>
            <nav className="p-2">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Package className="w-5 h-5" /> Order History
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === 'wishlist' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Heart className="w-5 h-5" /> Wishlist ({wishlistItems.length})
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <MapPin className="w-5 h-5" /> Saved Addresses
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <User className="w-5 h-5" /> Profile Settings
              </button>
              <div className="border-t border-gray-100 my-2 pt-2"></div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" /> Log Out
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Order History</h2>
                <div className="space-y-4">
                  {dummyOrders.map(order => (
                    <div key={order.id} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-blue-100 transition-colors">
                      <div>
                        <div className="font-bold text-gray-900 mb-1">{order.id}</div>
                        <div className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-sm text-gray-500 mb-1">Status</div>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">${order.total.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">{order.items} items</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-bold mb-6 flex justify-between items-center">
                  My Wishlist
                  <Link to="/wishlist" className="text-sm text-blue-600 font-medium hover:underline">View Full Page</Link>
                </h2>
                {wishlistItems.length === 0 ? (
                  <p className="text-gray-500">Your wishlist is empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistItems.slice(0, 4).map(item => (
                      <Link to={`/product/${item.id}`} key={item.id} className="flex gap-4 border border-gray-100 rounded-lg p-3 hover:border-blue-200">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{item.name}</p>
                          <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-xl font-bold mb-6 flex justify-between items-center">
                  Saved Addresses
                  <button className="text-sm bg-gray-100 hover:bg-gray-200 font-medium px-3 py-1.5 rounded transition-colors">Add New</button>
                </h2>
                <div className="border border-blue-100 bg-blue-50/30 rounded-xl p-4 relative">
                  <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">Default</span>
                  <div className="font-bold mb-2">{user.name}</div>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>123 Main Street</p>
                    <p>Apt 4B</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                    <p className="pt-2 text-gray-500">Phone: (555) 123-4567</p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button className="text-sm font-medium text-blue-600 hover:underline">Edit</button>
                    <button className="text-sm font-medium text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                <form className="max-w-md space-y-4" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue={user.name} className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue={user.email} disabled className="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-500" />
                  </div>
                  <div className="pt-4 border-t border-gray-100 mt-6">
                    <h3 className="font-bold mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <input type="password" placeholder="Current Password" className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500" />
                      <input type="password" placeholder="New Password" className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500" />
                    </div>
                  </div>
                  <button className="mt-6 bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
