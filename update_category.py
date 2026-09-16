import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_logic = """  const baseProducts = useMemo(() => {
    if (!id || id === 'all') return MOCK_PRODUCTS;
    const lowerId = id.toLowerCase();
    
    // Special Navigation Categories
    if (lowerId === 'deals') return MOCK_PRODUCTS.filter(p => p.badges?.includes('Sale') || p.originalPrice);
    if (lowerId === 'plus') return MOCK_PRODUCTS.filter(p => p.rating >= 4.7);
    if (lowerId === 'new') return MOCK_PRODUCTS.filter(p => p.badges?.includes('New Arrival') || p.name.includes('New'));
    if (lowerId === 'brands') return MOCK_PRODUCTS.filter(p => p.brand);
    
    // Exact category match or partial match (for "home" -> "Home & Garden")
    return MOCK_PRODUCTS.filter(p => {
      const cat = p.category.toLowerCase();
      return cat === lowerId || (lowerId === 'home' && cat.includes('home'));
    });
  }, [id]);"""

    regex = r"const baseProducts = id && id !== 'all'\s*\?\s*MOCK_PRODUCTS\.filter\(p => p\.category\.toLowerCase\(\) === id\.toLowerCase\(\)\)\s*:\s*MOCK_PRODUCTS;"
    
    if re.search(regex, content):
        content = re.sub(regex, new_logic, content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated successfully")
    else:
        print("Regex not found! Check the file content.")

process_file('src/pages/Category.jsx')
