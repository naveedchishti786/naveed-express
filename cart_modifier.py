import re

def modify_cart(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Change shipping logic
    content = content.replace("const shipping = totalAmount > 100 ? 0 : 10.00;", "const FREE_SHIPPING_THRESHOLD = 59.99;\n  const shipping = totalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : 10.00;")

    progress_banner = """
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
"""
    # Find insertion point
    target = r'(<div className="flex flex-col lg:flex-row gap-8">)'
    if re.search(target, content):
        content = re.sub(target, r'\1' + '\n' + progress_banner, content)
    else:
        print("Couldn't find target 1")

    if 'Truck' not in content:
        content = content.replace("import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Heart, Lock } from 'lucide-react';", 
                                  "import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Heart, Lock, Truck } from 'lucide-react';")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Cart modified")

modify_cart('src/pages/Cart.jsx')
