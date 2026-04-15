let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* =========================
   SAVE CART
========================= */
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/* =========================
   HEADER COUNT (CHECKOUT TOP LINK)
========================= */
function updateCheckoutHeaderCount() {
  const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];

  let total = 0;
  cartFromStorage.forEach(item => {
    total += item.quantity;
  });

  const el = document.querySelector('.js-checkout-count');

  if (el) {
    el.innerHTML = `${total} items`;
  }
}

/* =========================
   HEADER CART ICON COUNT (if exists)
========================= */
function updateCartQuantity() {
  const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];

  let total = 0;
  cartFromStorage.forEach(item => {
    total += item.quantity;
  });

  const el = document.querySelector('.js-cart-quantity');
  if (el) el.innerHTML = total;
}

/* =========================
   RENDER CHECKOUT
========================= */
function renderCheckout() {
  let checkoutHTML = '';

  cart.forEach((cartItem) => {

    let product;

    products.forEach((p) => {
      if (p.id === cartItem.productId) {
        product = p;
      }
    });

    if (!product) return;

    checkoutHTML += `
      <div class="cart-item-container js-item-${product.id}">
        
        <img class="product-image" src="${product.image}">

        <div class="cart-item-details">

          <div class="product-name">${product.name}</div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity">

            Quantity:
            <span class="js-qty-text-${product.id}">
              ${cartItem.quantity}
            </span>

            <input type="number"
              class="js-qty-input-${product.id}"
              value="${cartItem.quantity}"
              min="1"
              style="display:none; width:60px;">

            <span class="update-quantity-link link-primary js-update"
              data-id="${product.id}">
              Update
            </span>

            <span class="save-quantity-link link-primary js-save"
              data-id="${product.id}"
              style="display:none;">
              Save
            </span>

            <span class="delete-quantity-link link-primary js-delete"
              data-id="${product.id}">
              Delete
            </span>

          </div>

        </div>
      </div>
    `;
  });

  const container = document.querySelector('.order-summary');
  if (container) {
    container.innerHTML = checkoutHTML;
  }
}

/* =========================
   INITIAL LOAD
========================= */
renderCheckout();
updateCheckoutHeaderCount();
updateCartQuantity();

/* =========================
   DELETE ITEM
========================= */
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-delete')) {

    const id = e.target.dataset.id;

    cart = cart.filter(item => item.productId !== id);

    saveCart();
    renderCheckout();
    updateCheckoutHeaderCount();
    updateCartQuantity();
  }
});

/* =========================
   UPDATE BUTTON
========================= */
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-update')) {

    const id = e.target.dataset.id;

    document.querySelector(`.js-qty-text-${id}`).style.display = 'none';
    document.querySelector(`.js-qty-input-${id}`).style.display = 'inline';

    e.target.style.display = 'none';

    document.querySelector(`.js-save[data-id="${id}"]`).style.display = 'inline';
  }
});

/* =========================
   SAVE BUTTON
========================= */
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-save')) {

    const id = e.target.dataset.id;

    const input = document.querySelector(`.js-qty-input-${id}`);
    const newQty = Number(input.value);

    cart.forEach(item => {
      if (item.productId === id) {
        item.quantity = newQty;
      }
    });

    saveCart();
    renderCheckout();
    updateCheckoutHeaderCount();
    updateCartQuantity();
  }
});