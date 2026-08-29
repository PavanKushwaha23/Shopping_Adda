
const FREE_SHIPPING_THRESHOLD = 150.00;
const STANDARD_SHIPPING_FEE = 15.00;
const ESTIMATED_TAX_RATE = 0.08;

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  initCouponForm();
  renderCartWishlistSection();

  window.addEventListener('cartUpdated', () => renderCart());
  window.addEventListener('couponApplied', () => renderCart());
  window.addEventListener('couponRemoved', () => renderCart());
  window.addEventListener('wishlistUpdated', () => renderCartWishlistSection());
});

function renderCart() {
  const tableBody = document.getElementById('cart-table-body');
  const emptyState = document.getElementById('cart-empty-state');
  const cartContentWrapper = document.getElementById('cart-content-wrapper');

  const cart = Storage.getCart();

  if (!cart || cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (cartContentWrapper) cartContentWrapper.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartContentWrapper) cartContentWrapper.style.display = 'grid';

  if (tableBody) {
    tableBody.innerHTML = cart.map((item, index) => `
      <tr id="cart-row-${index}">
        <td>
          <div class="cart-item-cell">
            <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
            <div>
              <a href="product-details.html?id=${item.id}" class="cart-item-name">${item.name}</a>
              <div class="cart-item-meta">
                ${item.selectedColorName ? `<span>Color: ${item.selectedColorName}</span> • ` : ''}
                ${item.selectedSize ? `<span>Option: ${item.selectedSize}</span>` : ''}
              </div>
            </div>
          </div>
        </td>
        <td class="font-semibold">Rs.${item.price.toFixed(2)}</td>
        <td>
          <div class="quantity-stepper">
            <button type="button" class="qty-btn" onclick="updateCartItemQty(${index}, -1)">-</button>
            <input type="number" value="${item.quantity}" readonly>
            <button type="button" class="qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
          </div>
        </td>
        <td class="font-bold text-primary">Rs.${(item.price * item.quantity).toFixed(2)}</td>
        <td>
          <button class="cart-remove-btn" onclick="removeCartItem(${index})" title="Remove item" aria-label="Remove item">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </td>
      </tr>
    `).join('');
  }

  updateOrderSummary();
}

window.updateCartItemQty = function(index, delta) {
  const cart = Storage.getCart();
  if (cart[index]) {
    const newQty = cart[index].quantity + delta;
    Storage.updateCartQuantity(index, newQty);
  }
};

window.removeCartItem = function(index) {
  const res = Storage.removeFromCart(index);
  if (res.success) {
    Toast.info(`Removed item from cart`);
  }
};

window.clearEntireCart = function() {
  if (confirm('Are you sure you want to clear your entire cart?')) {
    Storage.clearCart();
    Toast.info('Cart cleared');
  }
};

function updateOrderSummary() {
  const subtotalEl = document.getElementById('summary-subtotal');
  const discountRow = document.getElementById('summary-discount-row');
  const discountValEl = document.getElementById('summary-discount-val');
  const shippingEl = document.getElementById('summary-shipping');
  const taxEl = document.getElementById('summary-tax');
  const totalEl = document.getElementById('summary-total');

  const progressTrackText = document.getElementById('shipping-progress-text');
  const progressBarFill = document.getElementById('shipping-progress-fill');

  const subtotal = Storage.getCartSubtotal();
  const appliedCoupon = Storage.getAppliedCoupon();

  let discount = 0;
  let isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
    if (appliedCoupon.freeShipping) {
      isFreeShipping = true;
    }
  }

  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * ESTIMATED_TAX_RATE;
  const total = taxableAmount + shippingCost + tax;

  // Free shipping progress calculation
  if (progressTrackText && progressBarFill) {
    if (subtotal >= FREE_SHIPPING_THRESHOLD || isFreeShipping) {
      progressTrackText.innerHTML = `🎉 You have unlocked <strong>FREE Standard Shipping!</strong>`;
      progressBarFill.style.width = '100%';
    } else {
      const remaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
      const percent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
      progressTrackText.innerHTML = `Add <strong>Rs.${remaining}</strong> more to qualify for <strong>FREE Shipping!</strong>`;
      progressBarFill.style.width = `${percent}%`;
    }
  }

  if (subtotalEl) subtotalEl.textContent = `Rs.${subtotal.toFixed(2)}`;

  if (discountRow && discountValEl) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountValEl.textContent = `-Rs.${discount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (shippingEl) {
    shippingEl.textContent = shippingCost === 0 ? 'FREE' : `Rs.${shippingCost.toFixed(2)}`;
  }

  if (taxEl) taxEl.textContent = `Rs.${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `Rs.${total.toFixed(2)}`;

  renderCouponAppliedBadge();
}

function initCouponForm() {
  const form = document.getElementById('cart-coupon-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('cart-coupon-input');
    if (!input) return;

    const res = Storage.applyCoupon(input.value);
    if (res.success) {
      Toast.success(res.message, 'Promo Applied!');
      input.value = '';
    } else {
      Toast.error(res.message);
    }
  });
}

function renderCouponAppliedBadge() {
  const container = document.getElementById('applied-coupon-container');
  if (!container) return;

  const coupon = Storage.getAppliedCoupon();
  if (coupon) {
    container.innerHTML = `
      <div class="coupon-applied-tag">
        <div>
          <span>🏷️ Coupon: <strong>${coupon.code}</strong></span>
          <div style="font-size: 0.75rem; font-weight: normal; color: #047857;">${coupon.description}</div>
        </div>
        <button type="button" onclick="handleRemoveCoupon()" style="color: #065f46; font-size: 1.25rem; line-height: 1; cursor: pointer;" title="Remove coupon">&times;</button>
      </div>
    `;
    container.style.display = 'block';
  } else {
    container.innerHTML = '';
    container.style.display = 'none';
  }
}

window.handleRemoveCoupon = function() {
  Storage.removeCoupon();
  Toast.info('Coupon removed');
};

function renderCartWishlistSection() {
  const container = document.getElementById('cart-wishlist-grid');
  if (!container) return;

  const wishlist = Storage.getWishlist();
  if (wishlist.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; color: var(--text-muted); font-size: 0.95rem;">No items currently saved in your wishlist.</p>`;
    return;
  }

  container.innerHTML = wishlist.slice(0, 4).map(item => `
    <div class="product-card" style="box-shadow: var(--shadow-sm);">
      <div class="product-media" style="padding-top: 85%;">
        <img src="${item.image}" alt="${item.name}" class="product-img">
      </div>
      <div class="product-body" style="padding: 1rem;">
        <a href="product-details.html?id=${item.id}" class="product-title" style="font-size: 0.9rem;">${item.name}</a>
        <div class="product-price-row" style="margin-top: 0.5rem; padding-top: 0.5rem;">
          <span class="current-price" style="font-size: 1rem;">Rs.${item.price.toFixed(2)}</span>
          <button class="btn btn-primary btn-sm" onclick="handleDrawerAddToCart('${item.id}')">
            Move to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}
