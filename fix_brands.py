import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_brands = """const BRANDS = [
  'https://cdn.simpleicons.org/nike/000000',
  'https://cdn.simpleicons.org/samsung/000000',
  'https://cdn.simpleicons.org/apple/000000',
  'https://cdn.simpleicons.org/adidas/000000',
  'https://cdn.simpleicons.org/sony/000000',
  'https://cdn.simpleicons.org/lenovo/000000'
];"""

    regex = r"const BRANDS = \[[\s\S]*?\];"
    
    if re.search(regex, content):
        content = re.sub(regex, new_brands, content)
        
        # also update the alt text so it says the brand name instead of just "Brand"
        # currently: alt="Brand"
        content = content.replace('alt="Brand"', 'alt={`Brand ${idx}`}')

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Brands updated successfully")
    else:
        print("Regex not found!")

process_file('src/pages/Home.jsx')
