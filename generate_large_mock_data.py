import json
import random

electronics_ids = [
    "1498049794561-7780e7231661", "1546868871-7041f2a55e12", "1600294037681-c80b4cb5b434",
    "1611186871348-b1ce696e52c9", "1618366712010-f4ae9c647dcb", "1606813907291-d86efa9b94db",
    "1516035069371-29a1b244cc32", "1678911820864-e2c567c655d7", "1593359677879-a4bb92f829d1",
    "1579586337278-3befd40fd17a", "1608043152269-423dbba4e7e1"
]
fashion_ids = [
    "1542291026-7eec264c27ff", "1556821840-3a63f95609a7", "1553062407-98eeb64c6a62",
    "1587563871167-1ee9c731aefb", "1515886657613-9f3515b0c78f", "1445205170230-053b83016050"
]
home_ids = [
    "1593618998160-e34014e67546", "1593696954577-ab3d39317b97", "1616654876611-399eb5a5e3df",
    "1484154218962-a197022b5858"
]
sports_ids = [
    "1601925260368-ae2f83cf8b7f", "1583454110551-21f2fa2afe61", "1461896836934-ffe607ba8211"
]

def make_url(uid):
    return f"https://images.unsplash.com/photo-{uid}?w=500&q=80"

products = []
pid = 1

# Generate Electronics (15 items)
brands_elec = ["Apple", "Sony", "Samsung", "Lenovo"]
for i in range(15):
    brand = random.choice(brands_elec)
    products.append({
        "id": f"e{pid}",
        "name": f"{brand} Premium Device {i+1}",
        "price": round(random.uniform(99.99, 1999.99), 2),
        "originalPrice": round(random.uniform(2000, 2500), 2) if random.random() > 0.7 else None,
        "rating": round(random.uniform(4.0, 5.0), 1),
        "reviews": random.randint(100, 5000),
        "image": make_url(electronics_ids[i % len(electronics_ids)]),
        "category": "Electronics",
        "badges": ["Sale"] if random.random() > 0.8 else [],
        "inStock": True,
        "brand": brand,
        "colors": ["Black", "White", "Silver"],
        "sizes": ["Standard"],
        "description": "High quality premium electronics."
    })
    pid += 1

# Generate Fashion (15 items)
brands_fash = ["Nike", "Adidas", "Puma", "Reebok"]
for i in range(15):
    brand = random.choice(brands_fash)
    products.append({
        "id": f"f{pid}",
        "name": f"{brand} Collection Apparel {i+1}",
        "price": round(random.uniform(19.99, 199.99), 2),
        "originalPrice": round(random.uniform(200, 250), 2) if random.random() > 0.7 else None,
        "rating": round(random.uniform(4.0, 5.0), 1),
        "reviews": random.randint(100, 5000),
        "image": make_url(fashion_ids[i % len(fashion_ids)]),
        "category": "Fashion",
        "badges": ["New Arrival"] if random.random() > 0.8 else [],
        "inStock": True,
        "brand": brand,
        "colors": ["Red", "Blue", "Black", "White"],
        "sizes": ["S", "M", "L", "XL"],
        "description": "Comfortable and stylish fashion wear."
    })
    pid += 1

# Generate Home & Garden (15 items)
brands_home = ["KitchenPro", "GreenLife", "HomeGoods", "LivingStyle"]
for i in range(15):
    brand = random.choice(brands_home)
    products.append({
        "id": f"h{pid}",
        "name": f"{brand} Essential Item {i+1}",
        "price": round(random.uniform(9.99, 149.99), 2),
        "originalPrice": round(random.uniform(150, 200), 2) if random.random() > 0.7 else None,
        "rating": round(random.uniform(4.0, 5.0), 1),
        "reviews": random.randint(50, 2000),
        "image": make_url(home_ids[i % len(home_ids)]),
        "category": "Home & Garden",
        "badges": ["Top Selling"] if random.random() > 0.8 else [],
        "inStock": True,
        "brand": brand,
        "colors": ["Natural", "White"],
        "sizes": ["Standard"],
        "description": "Perfect addition to your home and garden."
    })
    pid += 1

# Generate Sports (15 items)
brands_sports = ["FitGear", "YogaPro", "Nike", "Adidas"]
for i in range(15):
    brand = random.choice(brands_sports)
    products.append({
        "id": f"s{pid}",
        "name": f"{brand} Athletic Equipment {i+1}",
        "price": round(random.uniform(29.99, 299.99), 2),
        "originalPrice": round(random.uniform(300, 400), 2) if random.random() > 0.7 else None,
        "rating": round(random.uniform(4.0, 5.0), 1),
        "reviews": random.randint(50, 3000),
        "image": make_url(sports_ids[i % len(sports_ids)]),
        "category": "Sports",
        "badges": ["Free Shipping"] if random.random() > 0.8 else [],
        "inStock": True,
        "brand": brand,
        "colors": ["Black", "Neon Green", "Orange"],
        "sizes": ["Standard"],
        "description": "Durable and reliable sports equipment."
    })
    pid += 1

# Add the specific high-quality products we had before to ensure diversity
fixed_products = [
  {
    "id": '2', "name": 'Smart Watch Series 8 with Health Tracking', "price": 349.50, "originalPrice": 399.00, "rating": 4.9, "reviews": 3820,
    "image": 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    "category": 'Electronics', "badges": ['New Arrival'], "inStock": True, "brand": 'Apple',
    "colors": ["Black","White","Blue"], "sizes": ["S","M","L"],
    "description": 'The latest Series 8 smartwatch with advanced health tracking and beautiful retina display.'
  },
  {
    "id": 'a1', "name": 'AirPods Pro (2nd Generation)', "price": 249.00, "rating": 4.8, "reviews": 5120,
    "image": 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80',
    "category": 'Electronics', "badges": ['Top Selling'], "inStock": True, "brand": 'Apple',
    "colors": ["White"], "sizes": ["One Size"],
    "description": 'Rich, high-quality audio and voice with active noise cancellation.'
  },
  {
    "id": '12', "name": 'Nike Air Zoom Pegasus 39', "price": 120.00, "rating": 4.8, "reviews": 5400,
    "image": 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    "category": 'Fashion', "badges": ['Top Selling'], "inStock": True, "brand": 'Nike',
    "colors": ["Red", "Black", "White"], "sizes": ["8", "9", "10", "11", "12"],
    "description": 'Lightweight, durable, and comfortable running shoes.'
  },
  {
    "id": 'sm1', "name": 'Samsung Galaxy S23 Ultra', "price": 1199.99, "originalPrice": 1299.99, "rating": 4.8, "reviews": 3100,
    "image": 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500&q=80',
    "category": 'Electronics', "badges": ['New Arrival', 'Sale'], "inStock": True, "brand": 'Samsung',
    "colors": ["Black", "Green", "Cream"], "sizes": ["256GB", "512GB"],
    "description": 'Capture the night in low light. Unbelievable performance.'
  },
]

all_products = fixed_products + products

js_content = "export const MOCK_PRODUCTS = [\n"
for p in all_products:
    js_content += "  {\n"
    for k, v in p.items():
        if v is None:
            continue
        if isinstance(v, str) and k != 'id' and k != 'name' and k != 'image' and k != 'category' and k != 'brand' and k != 'description':
            val_str = f"'{v}'"
        elif isinstance(v, str):
            # escape single quotes
            safe_str = v.replace("'", "\\'")
            val_str = f"'{safe_str}'"
        elif isinstance(v, bool):
            val_str = "true" if v else "false"
        elif isinstance(v, list):
            # stringify list
            val_str = json.dumps(v)
        else:
            val_str = str(v)
        js_content += f"    {k}: {val_str},\n"
    js_content += "  },\n"
js_content += "];\n"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    start_str = "export const MOCK_PRODUCTS = ["
    end_str = "export const MOCK_CATEGORIES = ["
    
    start_idx = content.find(start_str)
    end_idx = content.find(end_str)
    
    if start_idx != -1 and end_idx != -1:
        new_file_content = content[:start_idx] + js_content + "\n" + content[end_idx:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_file_content)
        print("Updated mockData.js successfully.")
    else:
        print("Could not find boundaries.")

process_file('src/lib/mockData.js')
