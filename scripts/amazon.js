document.addEventListener('DOMContentLoaded', () => {

  // ALWAYS sync from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!Array.isArray(products)) {
    throw new Error("products.js not loaded properly");
  }

  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  // =========================
  // CART COUNT FUNCTION
  // =========================
  function updateCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let total = 0;
    cart.forEach(item => total += item.quantity);

    const el = document.querySelector('.js-cart-quantity');
    if (el) el.innerHTML = total;
  }

  updateCartQuantity();

  // =========================
  // ADD TO CART
  // =========================
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {

      button.addEventListener('click', () => {

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const productId = button.dataset.productId;

        const quantitySelector = document.querySelector(
          `.js-quantity-selector-${productId}`
        );

        const quantity = Number(quantitySelector.value);

        let matchingItem;

        cart.forEach((item) => {
          if (item.productId === productId) {
            matchingItem = item;
          }
        });

        if (matchingItem) {
          matchingItem.quantity += quantity;
        } else {
          cart.push({
            productId,
            quantity
          });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartQuantity();
      });
    });

});