import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update preventDefault to preventDefault + stopPropagation
    content = content.replace('e.preventDefault();\n                    dispatch(toggleWishlist', 'e.preventDefault();\n                    e.stopPropagation();\n                    dispatch(toggleWishlist')

    # 2. Inject wishlist button into Category.jsx if missing
    if 'Category.jsx' in filepath and '<Heart className={`w-[18px]' not in content:
        wishlist_button = '''
              <div className="absolute top-3 right-3 z-20">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
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

        content = re.sub(r'(<div className={`relative overflow-hidden bg-gray-50)', wishlist_button + r'\n                \1', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for file in ['src/pages/Home.jsx', 'src/pages/Category.jsx', 'src/pages/SearchResults.jsx', 'src/pages/Product.jsx']:
    fix_file(file)

print('Done')
