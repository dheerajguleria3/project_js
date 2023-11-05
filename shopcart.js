<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Product Cart</title>
<style>
  .container {
    display: flex;
  }
  .left-box, .right-box {
    border: 1px solid #ccc;
    padding: 40px;
    margin: 40px;
  }
  .product-list, .cart-items {
    list-style: none;
    padding: 0;
  }
</style>
</head>
<body>

<div class="container">
  <div class="left-box" id="product-list">
    <h2>Product List</h2>
    <ul class="product-list">
    </ul>
  </div>
  <div class="right-box" id="cart">
    <h2>Cart</h2>
    <ul class="cart-items">
    </ul>
    <div id="cart-total"></div>
  </div>
</div>

<script>
  const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];

  let cart = [];

  function renderProductList() {
    const productListElement = document.querySelector('.product-list');
    productListElement.innerHTML = '';

    Products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name} - $${product.price}`;
      const addButton = document.createElement('button');
      addButton.textContent = '+';
      addButton.addEventListener('click', () => addToCart(product));
      listItem.appendChild(addButton);
      productListElement.appendChild(listItem);
    });
  }

  function renderCart() {
    const cartElement = document.querySelector('.cart-items');
    cartElement.innerHTML = '';

    if (cart.length === 0) {
      cartElement.innerHTML = '<div>No Product added to the cart</div>';
    } else {
      cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => removeFromCart(item));
        listItem.appendChild(removeButton);
        cartElement.appendChild(listItem);
      });
    }

    const cartTotalElement = document.getElementById('cart-total');
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cartTotalElement.textContent = `Total: $${total}`;
  }

  function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    renderCart();
  }

  function removeFromCart(product) {
    cart = cart.filter(item => item.id !== product.id);
    renderCart();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderProductList();
    renderCart();
  });
</script>

</body>
</html>
