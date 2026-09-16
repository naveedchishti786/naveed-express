import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add Heart icon to related products
    wishlist_button = '''
              <div className="absolute top-3 right-3 z-20">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
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
              </div>'''

    content = re.sub(r'(<div className="relative h-48 w-full overflow-hidden bg-gray-50">)', wishlist_button + r'\n                \1', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('src/pages/Product.jsx')
print('Done!')
