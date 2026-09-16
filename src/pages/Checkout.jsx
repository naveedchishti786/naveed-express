import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, CreditCard, MapPin, Truck } from 'lucide-react';

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(4, "Zip code is required"),
  cardNumber: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
});

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderId, setOrderId] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const { totalAmount, totalQuantity } = useSelector(state => state.cart);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur"
  });

  const FREE_SHIPPING_THRESHOLD = 59.99;
  const shipping = totalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : 10.00;
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + shipping + tax;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    // Simulate API call
    setTimeout(() => {
      const generatedOrderId = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setOrderId(generatedOrderId);
      setOrderTotal(finalTotal);
      dispatch({ type: 'cart/clearCart' }); // Or import clearCart action
      dispatch({ 
        type: 'order/addOrder', 
        payload: { 
          orderId: generatedOrderId, 
          total: finalTotal, 
          date: new Date().toISOString(),
          status: 'Shipped' 
        } 
      });
      setStep(3); // Go to success page
    }, 1000);
  };

  if (totalQuantity === 0 && step !== 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">Go back to shopping</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="py-16 px-4 container mx-auto max-w-2xl text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{paymentMethod === 'cod' ? 'Order Placed!' : 'Payment Successful!'}</h1>
        <p className="text-gray-600 mb-8 text-lg">Your order <span className="font-bold text-gray-900">#{orderId}</span> has been placed successfully and is being processed.</p>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left mb-8">
          <h3 className="font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="text-gray-600">Total Amount {paymentMethod === 'cod' ? 'Due on Delivery' : 'Paid'}</span>
            <span className="font-bold">${(step === 3 && orderTotal > 0 ? orderTotal : finalTotal).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Delivery</span>
            <span className="font-medium text-blue-600">3-5 Business Days</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={`/track?order=${orderId}`} className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors inline-block">
            Track Order
          </Link>
          <Link to="/" className="bg-gray-100 text-gray-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 container mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Step 1: Shipping Address */}
            <div className={`bg-white rounded-2xl shadow-sm border ${step === 1 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-100'} p-6 transition-all`}>
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <MapPin className={`w-6 h-6 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`} />
                <h2 className="text-lg font-bold">1. Shipping Address</h2>
                {step > 1 && <button type="button" onClick={() => setStep(1)} className="ml-auto text-sm text-blue-600 font-medium">Edit</button>}
              </div>
              
              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input {...register("firstName")} className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-blue-500 ${errors.firstName ? 'border-red-500 focus:outline-red-500' : ''}`} />
                    {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input {...register("lastName")} className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-blue-500 ${errors.lastName ? 'border-red-500 focus:outline-red-500' : ''}`} />
                    {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input {...register("email")} className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-blue-500 ${errors.email ? 'border-red-500 focus:outline-red-500' : ''}`} />
                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-700">Street Address</label>
                    <input {...register("address")} className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-blue-500 ${errors.address ? 'border-red-500 focus:outline-red-500' : ''}`} />
                    {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <input {...register("city")} className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-blue-500 ${errors.city ? 'border-red-500 focus:outline-red-500' : ''}`} />
                    {errors.city && <span className="text-xs text-red-500">{errors.city.message}</span>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Zip Code</label>
                    <input {...register("zipCode")} className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-blue-500 ${errors.zipCode ? 'border-red-500 focus:outline-red-500' : ''}`} />
                    {errors.zipCode && <span className="text-xs text-red-500">{errors.zipCode.message}</span>}
                  </div>
                  <div className="sm:col-span-2 mt-4">
                    <button type="button" onClick={() => setStep(2)} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors w-full sm:w-auto">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Payment Details */}
            <div className={`bg-white rounded-2xl shadow-sm border ${step === 2 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-100'} p-6 opacity-${step < 2 ? '50' : '100'} transition-all`}>
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <CreditCard className={`w-6 h-6 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`} />
                <h2 className="text-lg font-bold">2. Payment Method</h2>
              </div>
              
              {step === 2 && (
                <div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:border-blue-300'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium flex items-center gap-2"><CreditCard className="w-5 h-5" /> Credit Card</span>
                        <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-blue-600" />
                      </div>
                    </label>
                    <label className={`flex-1 border rounded-xl p-4 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:border-blue-300'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium flex items-center gap-2"><Truck className="w-5 h-5" /> Cash on Delivery</span>
                        <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-4 h-4 text-blue-600" />
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-sm font-medium text-gray-700">Card Number</label>
                        <input {...register("cardNumber")} placeholder="0000 0000 0000 0000" className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-blue-500 ${errors.cardNumber ? 'border-red-500 focus:outline-red-500' : ''}`} />
                        {errors.cardNumber && <span className="text-xs text-red-500">{errors.cardNumber.message}</span>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Expiry Date (MM/YY)</label>
                        <input {...register("expiry")} placeholder="MM/YY" className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-blue-500 ${errors.expiry ? 'border-red-500 focus:outline-red-500' : ''}`} />
                        {errors.expiry && <span className="text-xs text-red-500">{errors.expiry.message}</span>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">CVV</label>
                        <input {...register("cvv")} placeholder="123" type="password" maxLength={4} className={`w-full border rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-blue-500 ${errors.cvv ? 'border-red-500 focus:outline-red-500' : ''}`} />
                        {errors.cvv && <span className="text-xs text-red-500">{errors.cvv.message}</span>}
                      </div>
                    </div>
                  )}
                  
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30">
                    {paymentMethod === 'card' ? `Pay $${finalTotal.toFixed(2)} Securely` : `Confirm Order (Pay $${finalTotal.toFixed(2)} on Delivery)`}
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-3 mb-4">Your payment information is encrypted and secure.</p>
                  
                  <div className="flex gap-3 justify-center items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg" alt="Visa" className="h-6 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 object-contain" />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Order Summary (Sidebar) */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items ({totalQuantity})</span>
                <span className="font-medium text-gray-900">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax</span>
                <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-extrabold text-2xl text-gray-900">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
