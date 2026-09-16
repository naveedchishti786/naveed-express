import re

def process_checkout(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('cardNumber: z.string().min(16, "Invalid card number"),', 'cardNumber: z.string().optional(),')
    content = content.replace('expiry: z.string().regex(/^(0[1-9]|1[0-2])\\/?([0-9]{2})$/, "MM/YY required"),', 'expiry: z.string().optional(),')
    content = content.replace('cvv: z.string().min(3, "Invalid CVV"),', 'cvv: z.string().optional(),')

    content = content.replace('const [step, setStep] = useState(1);', 'const [step, setStep] = useState(1);\n  const [paymentMethod, setPaymentMethod] = useState("card");')

    content = content.replace('const shipping = 10.00;', 'const FREE_SHIPPING_THRESHOLD = 59.99;\n  const shipping = totalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : 10.00;')

    start_str = '{step === 2 && (\n                  <div>\n                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">'
    
    new_payment_section = """{step === 2 && (
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">"""

    content = content.replace(start_str, new_payment_section)

    old_button_regex = r'</div>\s*<button type="submit"[\s\S]*?</button>'
    new_button_replacement = """</div>
                    )}
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30">
                      {paymentMethod === 'card' ? `Pay $${finalTotal.toFixed(2)} Securely` : `Confirm Order (Pay $${finalTotal.toFixed(2)} on Delivery)`}
                    </button>"""

    if re.search(old_button_regex, content):
        content = re.sub(old_button_regex, new_button_replacement, content)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Checkout updated")

process_checkout('src/pages/Checkout.jsx')
