import re
import json

new_products = """export const MOCK_PRODUCTS = [
  // Apple
  {
    id: '2', name: 'Smart Watch Series 8 with Health Tracking', price: 349.50, originalPrice: 399.00, rating: 4.9, reviews: 3820,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    category: 'Electronics', badges: ['New Arrival'], inStock: true, brand: 'Apple',
    colors: ["Black","White","Blue"], sizes: ["S","M","L"],
    description: 'The latest Series 8 smartwatch with advanced health tracking and beautiful retina display.'
  },
  {
    id: 'a1', name: 'AirPods Pro (2nd Generation)', price: 249.00, rating: 4.8, reviews: 5120,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80',
    category: 'Electronics', badges: ['Top Selling'], inStock: true, brand: 'Apple',
    colors: ["White"], sizes: ["One Size"],
    description: 'Rich, high-quality audio and voice with active noise cancellation.'
  },
  {
    id: 'a2', name: 'MacBook Air M2', price: 1199.00, rating: 4.9, reviews: 2040,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80',
    category: 'Electronics', badges: ['Top Selling', 'Free Shipping'], inStock: true, brand: 'Apple',
    colors: ["Silver","Space Gray"], sizes: ["256GB", "512GB"],
    description: 'Supercharged by M2 chip, incredibly thin and light.'
  },
  // Sony
  {
    id: '1', name: 'Sony WH-1000XM5 Wireless Headphones', price: 348.00, originalPrice: 399.99, rating: 4.8, reviews: 1245,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
    category: 'Electronics', badges: ['Top Selling', 'Sale'], inStock: true, brand: 'Sony',
    colors: ["Black","Silver"], sizes: ["One Size"],
    description: 'Industry-leading noise cancellation. Premium materials.'
  },
  {
    id: 's1', name: 'Sony PlayStation 5 Console', price: 499.99, rating: 4.9, reviews: 8900,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80',
    category: 'Electronics', badges: ['Top Selling'], inStock: true, brand: 'Sony',
    colors: ["White"], sizes: ["Disc", "Digital"],
    description: 'Experience lightning-fast loading and deeper immersion.'
  },
  {
    id: 's2', name: 'Sony A7 III Mirrorless Camera', price: 1998.00, rating: 4.9, reviews: 1450,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
    category: 'Electronics', badges: ['Free Shipping'], inStock: true, brand: 'Sony',
    colors: ["Black"], sizes: ["Body Only", "With Lens"],
    description: 'Advanced 24.2MP BSI full-frame image sensor.'
  },
  // Samsung
  {
    id: 'sm1', name: 'Samsung Galaxy S23 Ultra', price: 1199.99, originalPrice: 1299.99, rating: 4.8, reviews: 3100,
    image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?w=500&q=80',
    category: 'Electronics', badges: ['New Arrival', 'Sale'], inStock: true, brand: 'Samsung',
    colors: ["Black", "Green", "Cream"], sizes: ["256GB", "512GB"],
    description: 'Capture the night in low light. Unbelievable performance.'
  },
  {
    id: '11', name: 'Samsung 65" Class QLED 4K Smart TV', price: 899.99, rating: 4.7, reviews: 2150,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
    category: 'Electronics', badges: ['Free Shipping'], inStock: true, brand: 'Samsung',
    colors: ["Black"], sizes: ["55 inch", "65 inch", "75 inch"],
    description: 'Billion stay-true shades of breathtaking color.'
  },
  {
    id: 'sm2', name: 'Samsung Galaxy Watch 5 Pro', price: 449.99, rating: 4.6, reviews: 1120,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80',
    category: 'Electronics', badges: [], inStock: true, brand: 'Samsung',
    colors: ["Black", "Gray"], sizes: ["45mm"],
    description: 'Advanced sleep coaching, auto workout tracking.'
  },
  // Nike
  {
    id: '12', name: 'Nike Air Zoom Pegasus 39', price: 120.00, rating: 4.8, reviews: 5400,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    category: 'Fashion', badges: ['Top Selling'], inStock: true, brand: 'Nike',
    colors: ["Red", "Black", "White"], sizes: ["8", "9", "10", "11", "12"],
    description: 'Lightweight, durable, and comfortable running shoes.'
  },
  {
    id: 'n1', name: 'Nike Sportswear Club Fleece Hoodie', price: 55.00, originalPrice: 65.00, rating: 4.7, reviews: 3200,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
    category: 'Fashion', badges: ['Sale'], inStock: true, brand: 'Nike',
    colors: ["Gray", "Black", "Navy"], sizes: ["S", "M", "L", "XL"],
    description: 'Classic comfort. A wardrobe staple.'
  },
  {
    id: '3', name: 'Nike Heritage Backpack', price: 35.00, rating: 4.6, reviews: 1800,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    category: 'Fashion', badges: [], inStock: true, brand: 'Nike',
    colors: ["Black", "Blue"], sizes: ["One Size"],
    description: 'Durable design with multiple compartments.'
  },
  // Adidas
  {
    id: 'ad1', name: 'Adidas Ultraboost Light', price: 190.00, rating: 4.8, reviews: 2200,
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&q=80',
    category: 'Fashion', badges: ['New Arrival'], inStock: true, brand: 'Adidas',
    colors: ["White", "Black"], sizes: ["8", "9", "10", "11"],
    description: 'The lightest Ultraboost ever made.'
  },
  {
    id: 'ad2', name: 'Adidas Originals Essentials Track Pants', price: 50.00, rating: 4.7, reviews: 1500,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    category: 'Fashion', badges: [], inStock: true, brand: 'Adidas',
    colors: ["Black"], sizes: ["S", "M", "L", "XL"],
    description: 'Classic 3-Stripes style.'
  },
  // Lenovo
  {
    id: 'l1', name: 'Lenovo ThinkPad X1 Carbon Gen 11', price: 1499.00, originalPrice: 1699.00, rating: 4.8, reviews: 850,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80',
    category: 'Electronics', badges: ['Sale', 'Free Shipping'], inStock: true, brand: 'Lenovo',
    colors: ["Black"], sizes: ["14 inch"],
    description: 'Ultralight, ultrathin, powerful business laptop.'
  },
  // Unbranded / Generic / Other
  {
    id: '10', name: 'Stainless Steel Chef\'s Knife - 8 Inch', price: 55.00, originalPrice: 75.00, rating: 4.8, reviews: 940,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&q=80',
    category: 'Home & Garden', badges: ['Sale'], inStock: true, brand: 'KitchenPro',
    colors: ["Silver"], sizes: ["8 Inch"],
    description: 'Professional grade high-carbon stainless steel.'
  },
  {
    id: '18', name: 'Indoor Potted Plant - Snake Plant', price: 35.00, rating: 4.8, reviews: 420,
    image: 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?w=500&q=80',
    category: 'Home & Garden', badges: [], inStock: true, brand: 'GreenLife',
    colors: ["Green"], sizes: ["Medium"],
    description: 'Air-purifying and easy to care for.'
  },
  {
    id: '20', name: 'Luxury Cotton Bath Towel Set', price: 45.00, originalPrice: 60.00, rating: 4.7, reviews: 820,
    image: 'https://images.unsplash.com/photo-1616654876611-399eb5a5e3df?w=500&q=80',
    category: 'Home & Garden', badges: ['Sale'], inStock: true, brand: 'HomeGoods',
    colors: ["White", "Gray"], sizes: ["Set of 4"],
    description: 'Ultra-soft, highly absorbent 100% Turkish cotton.'
  },
  {
    id: '6', name: 'Premium Yoga Mat with Alignment Lines', price: 42.00, rating: 4.8, reviews: 1100,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
    category: 'Sports', badges: [], inStock: true, brand: 'YogaPro',
    colors: ["Purple", "Blue"], sizes: ["Standard"],
    description: 'Eco-friendly TPE material with non-slip surface.'
  },
  {
    id: '9', name: 'Adjustable Dumbbell Set (Up to 50 lbs)', price: 149.00, rating: 4.7, reviews: 980,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80',
    category: 'Sports', badges: ['Free Shipping'], inStock: true, brand: 'FitGear',
    colors: ["Black"], sizes: ["50 lbs max"],
    description: 'Space-saving adjustable weight system.'
  },
  {
    id: '26', name: 'Portable Bluetooth Speaker - Waterproof', price: 79.99, rating: 4.8, reviews: 2400,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    category: 'Electronics', badges: ['Top Selling'], inStock: true, brand: 'JBL',
    colors: ["Black", "Blue", "Red"], sizes: ["One Size"],
    description: 'Rugged, waterproof, and powerful bass.'
  }
];
"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    start_str = "export const MOCK_PRODUCTS = ["
    end_str = "export const MOCK_CATEGORIES = ["
    
    start_idx = content.find(start_str)
    end_idx = content.find(end_str)
    
    if start_idx != -1 and end_idx != -1:
        # replace everything from start_idx up to end_idx with new_products
        content = content[:start_idx] + new_products + "\n" + content[end_idx:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated mockData.js successfully.")
    else:
        print("Could not find boundaries.")

process_file('src/lib/mockData.js')
