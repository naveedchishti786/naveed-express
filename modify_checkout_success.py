import re

def process_checkout(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add orderId state
    content = content.replace('const [paymentMethod, setPaymentMethod] = useState("card");', 'const [paymentMethod, setPaymentMethod] = useState("card");\n  const [orderId, setOrderId] = useState("");')

    # 2. Update onSubmit to generate orderId
    old_submit = """  const onSubmit = (data) => {
    console.log(data);
    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'cart/clearCart' }); // Or import clearCart action
      setStep(3); // Go to success page
    }, 1000);
  };"""
    new_submit = """  const onSubmit = (data) => {
    console.log(data);
    // Simulate API call
    setTimeout(() => {
      setOrderId(`ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
      dispatch({ type: 'cart/clearCart' }); // Or import clearCart action
      setStep(3); // Go to success page
    }, 1000);
  };"""
    content = content.replace(old_submit, new_submit)

    # 3. Update the Success Page UI
    old_success_block_regex = r'if \(step === 3\) \{[\s\S]*?Continue Shopping\n          </Link>\n        </div>\n      \);\n    \}'
    
    new_success_block = """if (step === 3) {
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
              <span className="font-bold">${finalTotal.toFixed(2)}</span>
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
    }"""
    
    if re.search(old_success_block_regex, content):
        content = re.sub(old_success_block_regex, new_success_block, content)
    else:
        print("Success block not found.")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Checkout modified.")

process_checkout('src/pages/Checkout.jsx')
