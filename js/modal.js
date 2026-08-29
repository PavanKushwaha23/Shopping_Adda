document.addEventListener('DOMContentLoaded', () => {
  initSpecialOfferPopup();
  initQuickViewModal();
});

// 1. SPECIAL OFFER POPUP ON VISIT
function initSpecialOfferPopup() {
  const offerModal = document.getElementById('special-offer-modal');
  if (!offerModal) return;

  const closeBtn = document.getElementById('offer-modal-close');
  const claimBtn = document.getElementById('claim-offer-btn');
  const copyCodeBtn = document.getElementById('copy-offer-code-btn');

  // Check if shown in this session
  const alreadySeen = sessionStorage.getItem('luxemart_offer_seen_session');
  
  if (!alreadySeen) {
    // Show popup after brief delay for smooth user entry
    setTimeout(() => {
      openOfferModal();
    }, 2200);
  }

  function openOfferModal() {
    offerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    sessionStorage.setItem('luxemart_offer_seen_session', 'true');
    startOfferTimer();
  }

  function closeOfferModal() {
    offerModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeOfferModal);

  // Close when clicking modal backdrop
  offerModal.addEventListener('click', (e) => {
    if (e.target === offerModal) closeOfferModal();
  });

  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      Storage.applyCoupon('SAVE20');
      Toast.success('Promo code "SAVE20" (20% OFF) has been applied to your session!', 'Special Offer Claimed!');
      closeOfferModal();
    });
  }

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('SAVE20').then(() => {
        copyCodeBtn.textContent = 'Copied!';
        copyCodeBtn.classList.add('btn-copied');
        Toast.success('Coupon code "SAVE20" copied to clipboard!');
        setTimeout(() => {
          copyCodeBtn.textContent = 'Copy Code';
          copyCodeBtn.classList.remove('btn-copied');
        }, 2000);
      }).catch(() => {
        Toast.info('Use coupon code SAVE20 at checkout');
      });
    });
  }
}

// Special offer countdown timer
function startOfferTimer() {
  const timerElements = {
    minutes: document.getElementById('offer-timer-mins'),
    seconds: document.getElementById('offer-timer-secs')
  };

  if (!timerElements.minutes || !timerElements.seconds) return;

  let totalSeconds = 15 * 60; // 15 minutes offer
  const interval = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(interval);
      return;
    }

    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    timerElements.minutes.textContent = String(mins).padStart(2, '0');
    timerElements.seconds.textContent = String(secs).padStart(2, '0');
  }, 1000);
}

// 2. QUICK VIEW MODAL
let currentQuickViewProduct = null;
let quickViewSelectedColor = null;
let quickViewSelectedSize = null;
let quickViewQuantity = 1;

function initQuickViewModal() {
  const modal = document.getElementById('quick-view-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('quick-view-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeQuickViewModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeQuickViewModal();
  });
}

window.openQuickView = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  currentQuickViewProduct = product;
  quickViewSelectedColor = product.colors ? product.colors[0] : null;
  quickViewSelectedSize = product.sizes ? product.sizes[0] : null;
  quickViewQuantity = 1;

  const modal = document.getElementById('quick-view-modal');
  const container = document.getElementById('quick-view-body');
  if (!modal || !container) return;

  const inWishlist = Storage.isInWishlist(product.id);

  container.innerHTML = `
    <div class="quick-view-grid">
      <div class="quick-view-media">
        <div class="quick-view-main-image-wrap">
          <img id="qv-main-img" src="${product.image}" alt="${product.name}" class="quick-view-main-img">
          ${product.badge ? `<span class="product-badge badge-primary">${product.badge}</span>` : ''}
          ${product.discount ? `<span class="product-badge badge-discount">-${product.discount}%</span>` : ''}
        </div>
        <div class="quick-view-thumbs">
          ${product.images.map((img, idx) => `
            <button class="qv-thumb-btn ${idx === 0 ? 'active' : ''}" onclick="changeQuickViewImage('${img}', this)">
              <img src="${img}" alt="${product.name} thumb ${idx + 1}">
            </button>
          `).join('')}
        </div>
      </div>
      <div class="quick-view-details">
        <div class="qv-category">${product.category}</div>
        <h2 class="qv-title">${product.name}</h2>
        <div class="qv-rating-row">
          <div class="star-rating">
            ${renderStars(product.rating)}
          </div>
          <span class="rating-val">${product.rating.toFixed(1)}</span>
          <span class="reviews-count">(${product.reviewsCount} reviews)</span>
          <span class="stock-tag ${product.stock > 10 ? 'in-stock' : 'low-stock'}">
            ${product.stock > 10 ? '✓ In Stock' : `⚡ Only ${product.stock} left!`}
          </span>
        </div>
        
        <div class="qv-price-row">
          <span class="qv-current-price">Rs.${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="qv-original-price">Rs.${product.originalPrice.toFixed(2)}</span>` : ''}
          ${product.discount ? `<span class="qv-save-pill">Save Rs.${(product.originalPrice - product.price).toFixed(2)}</span>` : ''}
        </div>

        <p class="qv-description">${product.description}</p>

        ${product.colors && product.colors.length > 0 ? `
          <div class="qv-option-group">
            <label class="qv-option-label">Color: <span id="qv-selected-color-name" class="font-semibold">${product.colorNames ? product.colorNames[0] : ''}</span></label>
            <div class="color-options">
              ${product.colors.map((col, idx) => `
                <button type="button" class="color-dot ${idx === 0 ? 'active' : ''}" style="background-color: ${col}" 
                  onclick="selectQuickViewColor('${col}', '${product.colorNames ? product.colorNames[idx] : ''}', this)" 
                  title="${product.colorNames ? product.colorNames[idx] : col}">
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${product.sizes && product.sizes.length > 0 ? `
          <div class="qv-option-group">
            <label class="qv-option-label">Option / Size:</label>
            <div class="size-options">
              ${product.sizes.map((sz, idx) => `
                <button type="button" class="size-pill ${idx === 0 ? 'active' : ''}" 
                  onclick="selectQuickViewSize('${sz}', this)">
                  ${sz}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="qv-actions-row">
          <div class="quantity-stepper">
            <button type="button" class="qty-btn" onclick="adjustQuickViewQty(-1)">-</button>
            <input type="number" id="qv-qty-input" value="1" min="1" max="${product.stock}" readonly>
            <button type="button" class="qty-btn" onclick="adjustQuickViewQty(1)">+</button>
          </div>
          <button type="button" class="btn btn-primary btn-lg flex-1" onclick="handleQuickViewAddToCart()">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            Add to Cart
          </button>
          <button type="button" class="btn btn-secondary btn-icon btn-lg ${inWishlist ? 'active-wishlist' : ''}" id="qv-wishlist-btn" onclick="handleQuickViewWishlist('${product.id}')" title="Wishlist">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
        </div>

        <div class="qv-footer-links">
          <a href="product-details.html?id=${product.id}" class="qv-full-details-link">
            View Full Product Page & Detailed Reviews &rarr;
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeQuickViewModal = function() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.changeQuickViewImage = function(src, btn) {
  const mainImg = document.getElementById('qv-main-img');
  if (mainImg) mainImg.src = src;
  const allThumbs = document.querySelectorAll('.qv-thumb-btn');
  allThumbs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
};

window.selectQuickViewColor = function(color, name, btn) {
  quickViewSelectedColor = color;
  const label = document.getElementById('qv-selected-color-name');
  if (label) label.textContent = name || color;
  const dots = document.querySelectorAll('.color-dot');
  dots.forEach(d => d.classList.remove('active'));
  btn.classList.add('active');
};

window.selectQuickViewSize = function(size, btn) {
  quickViewSelectedSize = size;
  const pills = document.querySelectorAll('.size-pill');
  pills.forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
};

window.adjustQuickViewQty = function(delta) {
  const input = document.getElementById('qv-qty-input');
  if (!input || !currentQuickViewProduct) return;
  let val = parseInt(input.value, 10) || 1;
  val = Math.max(1, Math.min(val + delta, currentQuickViewProduct.stock || 99));
  input.value = val;
  quickViewQuantity = val;
};

window.handleQuickViewAddToCart = function() {
  if (!currentQuickViewProduct) return;
  const res = Storage.addToCart(
    currentQuickViewProduct.id,
    quickViewQuantity,
    quickViewSelectedColor,
    quickViewSelectedSize
  );
  if (res.success) {
    Toast.success(`Added ${quickViewQuantity}x ${currentQuickViewProduct.name} to Cart!`);
    closeQuickViewModal();
  }
};

window.handleQuickViewWishlist = function(productId) {
  const res = Storage.toggleWishlist(productId);
  const btn = document.getElementById('qv-wishlist-btn');
  if (btn) {
    const svg = btn.querySelector('svg');
    if (res.inWishlist) {
      btn.classList.add('active-wishlist');
      if (svg) svg.setAttribute('fill', 'currentColor');
      Toast.success('Saved to wishlist');
    } else {
      btn.classList.remove('active-wishlist');
      if (svg) svg.setAttribute('fill', 'none');
      Toast.info('Removed from wishlist');
    }
  }
};

// Helper: render star rating SVGs
function renderStars(rating) {
  let html = '';
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += `<svg class="star-icon star-full" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    } else if (i === fullStars + 1 && hasHalf) {
      html += `<svg class="star-icon star-half" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    } else {
      html += `<svg class="star-icon star-empty" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }
  }
  return html;
}
