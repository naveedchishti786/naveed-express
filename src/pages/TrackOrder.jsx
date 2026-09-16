import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, Truck, CheckCircle, MapPin, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const defaultOrder = searchParams.get('order') || '';
  const [orderId, setOrderId] = useState(defaultOrder);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.order.orders);
  
  const isValidOrderFormat = (id) => /^ORD-[A-Z0-9]{5,10}$/.test(id.trim());
  const checkOrderExists = (id) => orders.some(o => o.orderId === id.trim());
  
  const [isTracking, setIsTracking] = useState(() => {
    if (defaultOrder && isValidOrderFormat(defaultOrder) && checkOrderExists(defaultOrder)) return true;
    return false;
  });

  const handleTrack = (e) => {
    e.preventDefault();
    const id = orderId.trim();
    if (!id) {
      setError('Please enter an Order ID');
      setIsTracking(false);
      return;
    }
    
    if (!isValidOrderFormat(id)) {
      setError('Invalid Order ID format. Must be like ORD-XXXXXXXX');
      setIsTracking(false);
      return;
    }

    setIsLoading(true);
    setIsTracking(false);
    setError('');

    // Simulate API call to check tracking ID
    setTimeout(() => {
      setIsLoading(false);
      if (checkOrderExists(id)) {
        setIsTracking(true);
      } else {
        setError('Order not found. Please check your tracking ID.');
      }
    }, 800);
  };

  const steps = [
    { id: 1, title: 'Order Placed', desc: 'We have received your order', icon: Package, completed: true },
    { id: 2, title: 'Processing', desc: 'Your order is being prepared', icon: CheckCircle, completed: true },
    { id: 3, title: 'Shipped', desc: 'Your order is on the way', icon: Truck, completed: true },
    { id: 4, title: 'Out for Delivery', desc: 'Order is out for delivery', icon: MapPin, completed: false },
    { id: 5, title: 'Delivered', desc: 'Order has been delivered', icon: CheckCircle, completed: false },
  ];

  return (
    <div className="py-12 px-4 container mx-auto max-w-4xl min-h-[70vh]">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Track Your Order</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-12">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Enter your Order ID (e.g. ORD-12345)" 
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value.toUpperCase());
                if (error) setError('');
              }}
              className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl focus:bg-white transition-all font-medium ${error ? 'border-red-500 focus:outline-red-500' : 'border-gray-200 focus:outline-blue-500'}`}
            />
          </div>
          <button disabled={isLoading} type="submit" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors shrink-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Track'}
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-3 font-medium">{error}</p>}
      </div>

      {isTracking && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order <span className="text-blue-600">#{orderId}</span></h2>
              <p className="text-gray-500 mt-1">Expected Delivery: <span className="font-medium text-gray-800">3-5 Business Days</span></p>
            </div>
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-bold border border-blue-100">
              Status: Shipped
            </div>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0"></div>
            <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-[55%] h-1 bg-blue-600 rounded-full z-0 transition-all duration-1000"></div>

            <div className="flex flex-col sm:flex-row justify-between gap-8 relative z-10">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex sm:flex-col items-center gap-4 sm:gap-2 text-left sm:text-center relative">
                    {/* Mobile vertical line */}
                    {step.id !== steps.length && (
                      <div className={`sm:hidden absolute left-6 top-14 w-0.5 h-12 ${step.completed ? 'bg-blue-600' : 'bg-gray-100'}`}></div>
                    )}
                    
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors duration-500 ${step.completed ? 'bg-blue-600 border-blue-100 text-white' : 'bg-white border-gray-100 text-gray-300'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div>
                      <h4 className={`font-bold text-sm ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 hidden sm:block max-w-[100px] mx-auto">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
             <Link to="/" className="text-blue-600 font-medium hover:underline flex items-center gap-2">
               &larr; Back to Shopping
             </Link>
          </div>
        </div>
      )}
    </div>
  );
}
