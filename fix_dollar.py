with open('src/pages/Checkout.jsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('`${shipping.toFixed(2)}`', '`$${shipping.toFixed(2)}`')
with open('src/pages/Checkout.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
