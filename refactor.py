import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add Heart import if missing
    if 'Heart' not in content:
        content = re.sub(r'import \{ ([^}]+) \} from \'lucide-react\';', r'import { \1, Heart } from \'lucide-react\';', content)
    
    # Add toggleWishlist import
    if 'toggleWishlist' not in content:
        content = re.sub(r'import \{ addToCart \} from \'../store/slices/cartSlice\';', 
                         r'import { addToCart } from \'../store/slices/cartSlice\';\nimport { toggleWishlist } from \'../store/slices/wishlistSlice\';', 
                         content)

    # Add useSelector if missing
    if 'useSelector' not in content:
        if 'useDispatch' in content:
            content = re.sub(r'import \{ useDispatch \} from \'react-redux\';', r'import { useDispatch, useSelector } from \'react-redux\';', content)

    # Add wishlistItems state
    if 'wishlistItems' not in content:
        content = re.sub(r'const dispatch = useDispatch\(\);', 
                         r'const dispatch = useDispatch();\n  const wishlistItems = useSelector(state => state.wishlist.items);', 
                         content)

    # Add the Heart icon to products
    wishlist_button = '''
              <div className="absolute top-3 right-3 z-20">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image
                    }));
                  }}
                  className="w-8 h-8 bg-white/90 shadow-sm text-gray-400 rounded-full flex items-center justify-center hover:text-red-500 hover:bg-white transition-all"
                >
                  <Heart className={`w-[18px] h-[18px] ${wishlistItems.some(i => i.id === product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>'''

    content = re.sub(r'(<div className="relative[^>]*?overflow-hidden)', wishlist_button + r'\n                \1', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('src/pages/Home.jsx')
process_file('src/pages/Category.jsx')
process_file('src/pages/SearchResults.jsx')
print('Done!')
