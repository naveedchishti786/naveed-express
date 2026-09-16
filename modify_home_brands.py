import re

def process_home(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update BRANDS array
    old_brands = """const BRANDS = [
  'https://cdn.simpleicons.org/nike/000000',
  'https://cdn.simpleicons.org/samsung/000000',
  'https://cdn.simpleicons.org/apple/000000',
  'https://cdn.simpleicons.org/adidas/000000',
  'https://cdn.simpleicons.org/sony/000000',
  'https://cdn.simpleicons.org/lenovo/000000'
];"""
    
    new_brands = """const BRANDS = [
  { name: 'Nike', logo: 'https://cdn.simpleicons.org/nike/000000' },
  { name: 'Samsung', logo: 'https://cdn.simpleicons.org/samsung/000000' },
  { name: 'Apple', logo: 'https://cdn.simpleicons.org/apple/000000' },
  { name: 'Adidas', logo: 'https://cdn.simpleicons.org/adidas/000000' },
  { name: 'Sony', logo: 'https://cdn.simpleicons.org/sony/000000' },
  { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/000000' }
];"""
    content = content.replace(old_brands, new_brands)

    # Update the map loop using regex
    old_map_regex = r'\{BRANDS\.map\(\(logo, idx\) => \(\s*<img key=\{idx\} src=\{logo\} alt=\{`Brand \$\{idx\}`\} className="[^"]+" />\s*\)\)\}'
    
    new_map = """{BRANDS.map((brand, idx) => (
            <Link to={`/search?brand=${brand.name.toLowerCase()}`} key={idx} className="block min-w-[80px]">
              <img src={brand.logo} alt={brand.name} className="h-8 md:h-12 w-full object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
            </Link>
          ))}"""
          
    if re.search(old_map_regex, content):
        content = re.sub(old_map_regex, new_map, content)
    else:
        # try manual replacement if regex fails
        start_idx = content.find('{BRANDS.map((logo, idx) => (')
        if start_idx != -1:
            end_idx = content.find('))}', start_idx) + 3
            content = content[:start_idx] + new_map + content[end_idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Home modified")

process_home('src/pages/Home.jsx')
