const fs = require('fs');
let content = fs.readFileSync('src/lib/mockData.js', 'utf8');

const brands = ['Sony', 'Apple', 'Nike', 'Adidas', 'Samsung', 'LG', 'Puma', 'Reebok'];
const colors = ['Black', 'White', 'Blue', 'Red', 'Silver'];
const sizes = ['S', 'M', 'L', 'XL'];

let brandIndex = 0;
content = content.replace(/inStock: (true|false),?/g, (match, p1) => {
  const brand = brands[brandIndex % brands.length];
  brandIndex++;
  return `inStock: ${p1},
    brand: '${brand}',
    colors: ${JSON.stringify(colors.slice(0, 3))},
    sizes: ${JSON.stringify(sizes.slice(0, 3))},
    description: 'This is a high quality product. Enjoy the best experience with our premium materials and excellent customer support. Features include long durability, elegant design, and top-tier performance.'`;
});

fs.writeFileSync('src/lib/mockData.js', content);
