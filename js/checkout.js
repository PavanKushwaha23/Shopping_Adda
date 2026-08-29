
let selectedShippingOption = {
  id: 'standard',
  name: 'Standard Ground Shipping (3-5 Business Days)',
  price: 0
};

let selectedPaymentMethod = 'card';

document.addEventListener('DOMContentLoaded', () => {
  initCheckout();
  initCardInputFormatting();
  initPaymentTabs();
  initShippingOptions();
  initCheckoutFormSubmit();
});

function initCheckout() {
  const cart = Storage.getCart();
  if (!cart || cart.length === 0) {
    
    const orderItemsContainer = document.getElementById('checkout-items-list');
    if (orderItemsContainer) {
      orderItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <p style="color: var(--text-muted); margin-bottom: 1rem;">Your cart is empty. Add items before checking out.</p>
          <a href="shop.html" class="btn btn-primary btn-sm">Return to Shop</a>
        </div>
      `;
    }
    return;
  }

  renderCheckoutOrderReview();
}

function renderCheckoutOrderReview() {
  const listContainer = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const discountRow = document.getElementById('checkout-discount-row');
  const discountValEl = document.getElementById('checkout-discount-val');
  const shippingEl = document.getElementById('checkout-shipping');
  const taxEl = document.getElementById('checkout-tax');
  const totalEl = document.getElementById('checkout-total');

  const cart = Storage.getCart();
  const subtotal = Storage.getCartSubtotal();
  const appliedCoupon = Storage.getAppliedCoupon();

  if (listContainer) {
    listContainer.innerHTML = cart.map(item => `
      <div style="display: flex; gap: 1rem; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--border-light);">
        <div style="position: relative;">
          <img src="${item.image}" alt="${item.name}" style="width: 54px; height: 54px; border-radius: var(--radius-sm); object-fit: cover;">
          <span style="position: absolute; top: -6px; right: -6px; background: var(--color-primary); color: #fff; font-size: 0.7rem; font-weight: 700; width: 1.25rem; height: 1.25rem; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center;">${item.quantity}</span>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 0.875rem; color: var(--color-primary); line-height: 1.3;">${item.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${item.selectedColorName || ''} ${item.selectedSize ? `• ${item.selectedSize}` : ''}</div>
        </div>
        <div style="font-weight: 700; font-size: 0.9rem;">Rs.${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
  }

  // Calculate discount & totals
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
  }

  const isFreeStandard = subtotal >= 150.00 || (appliedCoupon && appliedCoupon.freeShipping);
  let shippingCost = selectedShippingOption.price;
  if (selectedShippingOption.id === 'standard' && isFreeStandard) {
    shippingCost = 0;
  }

  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * 0.08;
  const total = taxable + shippingCost + tax;

  if (subtotalEl) subtotalEl.textContent = `Rs.${subtotal.toFixed(2)}`;
  if (discountRow && discountValEl) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountValEl.textContent = `-Rs.${discount.toFixed(2)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
  if (shippingEl) shippingEl.textContent = shippingCost === 0 ? 'FREE' : `Rs.${shippingCost.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `Rs.${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `Rs.${total.toFixed(2)}`;
}

// Shipping method selection
function initShippingOptions() {
  const radioButtons = document.querySelectorAll('input[name="shipping-option"]');
  radioButtons.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'standard') {
        selectedShippingOption = { id: 'standard', name: 'Standard Ground (3-5 days)', price: 0 };
      } else if (val === 'express') {
        selectedShippingOption = { id: 'express', name: 'Express Air (2-day)', price: 20 };
      } else if (val === 'overnight') {
        selectedShippingOption = { id: 'overnight', name: 'Overnight Priority (Next day)', price: 35 };
      }
      renderCheckoutOrderReview();
    });
  });
}

// Payment Tabs Switcher
function initPaymentTabs() {
  const tabs = document.querySelectorAll('.pay-tab-btn');
  const cardSection = document.getElementById('card-payment-section');
  const alternatePaySection = document.getElementById('alternate-payment-section');
  const alternatePayMsg = document.getElementById('alt-pay-msg');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const method = tab.getAttribute('data-method');
      selectedPaymentMethod = method;

      if (method === 'card') {
        if (cardSection) cardSection.style.display = 'block';
        if (alternatePaySection) alternatePaySection.style.display = 'none';
      } else {
        if (cardSection) cardSection.style.display = 'none';
        if (alternatePaySection) alternatePaySection.style.display = 'block';

        if (method === 'paypal') {
          alternatePayMsg.innerHTML = `
            <div style="text-align: center; padding: 1.5rem;">
              <div style="font-size: 1.5rem; font-weight: 900; color: #003087; margin-bottom: 0.5rem;">PayPal</div>
              <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">You will be safely redirected to PayPal to complete your purchase after clicking Place Order.</p>
              <div style="background: #e0f2fe; color: #0369a1; padding: 0.5rem; border-radius: var(--radius-sm); font-size: 0.8125rem;">PayPal Buyer Protection Active</div>
            </div>
          `;
        } else if (method === 'apple') {
          alternatePayMsg.innerHTML = `
            <div style="text-align: center; padding: 1.5rem;">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.5rem;">Apple Pay / Google Pay</div>
              <p style="font-size: 0.9rem; color: var(--text-muted);">Biometric 1-touch checkout will trigger on your device once you click Place Order.</p>
            </div>
          `;
        } else if (method === 'cod') {
          alternatePayMsg.innerHTML = `
            <div style="text-align: center; padding: 1.5rem;">
              <div style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.5rem;">Cash on Delivery (COD)</div>
              <p style="font-size: 0.9rem; color: var(--text-muted);">Pay with exact cash or mobile QR scan directly to our courier upon arrival.</p>
            </div>
          `;
        }
      }
    });
  });
}

// Live Card Preview formatting
function initCardInputFormatting() {
  const numberInput = document.getElementById('card-number-input');
  const nameInput = document.getElementById('card-name-input');
  const expiryInput = document.getElementById('card-expiry-input');
  const cvvInput = document.getElementById('card-cvv-input');

  const numberDisplay = document.getElementById('preview-card-number');
  const nameDisplay = document.getElementById('preview-card-name');
  const expiryDisplay = document.getElementById('preview-card-expiry');

  if (numberInput && numberDisplay) {
    numberInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = val;
      numberDisplay.textContent = val || '•••• •••• •••• ••••';
    });
  }

  if (nameInput && nameDisplay) {
    nameInput.addEventListener('input', (e) => {
      nameDisplay.textContent = e.target.value.toUpperCase() || 'CARDHOLDER NAME';
    });
  }

  if (expiryInput && expiryDisplay) {
    expiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
      expiryDisplay.textContent = val || 'MM/YY';
    });
  }
}

// Form Submission & Order Placement
function initCheckoutFormSubmit() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cart = Storage.getCart();
    if (!cart || cart.length === 0) {
      Toast.error('Your cart is empty');
      return;
    }

    const placeBtn = document.getElementById('place-order-btn');
    if (placeBtn) {
      placeBtn.disabled = true;
      placeBtn.innerHTML = `
        <svg class="animate-spin" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0110 10"/></svg>
        Securing Order & Payment...
      `;
    }

    // Read form values
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const firstName = document.getElementById('checkout-first-name')?.value || 'Valued';
    const lastName = document.getElementById('checkout-last-name')?.value || 'Customer';
    const email = document.getElementById('checkout-email')?.value || 'customer@example.com';
    const address = document.getElementById('checkout-address')?.value || '123 Luxury Ave';
    const city = document.getElementById('checkout-city')?.value || 'New York';
    const zip = document.getElementById('checkout-zip')?.value || '10001';

    const subtotal = Storage.getCartSubtotal();
    const coupon = Storage.getAppliedCoupon();
    let discount = 0;
    if (coupon) {
      if (coupon.discountPercent) discount = (subtotal * coupon.discountPercent) / 100;
      else if (coupon.discountAmount) discount = coupon.discountAmount;
    }

    const tax = Math.max(0, subtotal - discount) * 0.08;
    const total = Math.max(0, subtotal - discount) + selectedShippingOption.price + tax;

    const orderData = {
      orderId,
      date: new Date().toISOString().split('T')[0],
      customer: { name: `${firstName} ${lastName}`, email, address: `${address}, ${city} ${zip}` },
      items: cart,
      subtotal,
      discount,
      shipping: selectedShippingOption,
      tax,
      total,
      paymentMethod: selectedPaymentMethod
    };

    
    setTimeout(() => {
      Storage.saveOrder(orderData);
      Storage.clearCart();
      Storage.removeCoupon();

      if (placeBtn) {
        placeBtn.disabled = false;
        placeBtn.innerHTML = 'Complete Order';
      }

      showOrderSuccessModal(orderData);
      Toast.success(`Order #${orderId} confirmed successfully!`, 'Payment Accepted');
    }, 1800);
  });
}

function showOrderSuccessModal(order) {
  const modal = document.getElementById('order-success-modal');
  const detailsContainer = document.getElementById('order-success-details');
  if (!modal || !detailsContainer) return;

  detailsContainer.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <div style="width: 70px; height: 70px; background: #dcfce7; color: #16a34a; border-radius: var(--radius-full); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.35rem;">Thank You for Your Order!</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem;">Confirmation email has been sent to <strong>${order.customer.email}</strong></p>
    </div>

    <div style="background: var(--bg-surface-alt); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; border: 1px solid var(--border-color);">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--text-muted);">Order Number:</span>
        <strong style="color: var(--color-accent);">${order.orderId}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--text-muted);">Estimated Delivery:</span>
        <strong>3-5 Business Days</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem;">
        <span style="color: var(--text-muted);">Payment Method:</span>
        <strong style="text-transform: uppercase;">${order.paymentMethod}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; border-top: 1px solid var(--border-color); padding-top: 0.5rem; margin-top: 0.5rem;">
        <span style="color: var(--text-muted);">Total Paid:</span>
        <strong style="font-size: 1.15rem; color: var(--color-primary);">Rs.${order.total.toFixed(2)}</strong>
      </div>
    </div>

    <div style="display: flex; gap: 1rem; justify-content: center;">
      <button class="btn btn-secondary" onclick="window.print()">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"/></svg>
        Print Receipt
      </button>
      <a href="shop.html" class="btn btn-primary">
        Continue Shopping &rarr;
      </a>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
