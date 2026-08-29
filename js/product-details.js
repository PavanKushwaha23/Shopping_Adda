let currentProduct = null;
let selectedColor = null;
let selectedSize = null;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', () => {
  loadProductDetails();
  initProductTabs();
  initReviewForm();
});

function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || 'prod-1';

  currentProduct = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];

  // Set initial variants
  selectedColor = currentProduct.colors ? currentProduct.colors[0] : null;
  selectedSize = currentProduct.sizes ? currentProduct.sizes[0] : null;
  currentQuantity = 1;

  // Update page title
  document.title = `${currentProduct.name} - LuxeMart`;

  // Render components
  renderBreadcrumb();
  renderGallery();
  renderInfo();
  renderSpecs();
  renderReviews();
  renderRelatedProducts();
}

function renderBreadcrumb() {
  const el = document.getElementById('product-breadcrumb');
  if (!el) return;
  el.innerHTML = `
    <a href="index.html">Home</a>
    <span>/</span>
    <a href="shop.html?category=${encodeURIComponent(currentProduct.category)}">${currentProduct.category}</a>
    <span>/</span>
    <span style="color: var(--text-main); font-weight: 600;">${currentProduct.name}</span>
  `;
}

function renderGallery() {
  const mainImg = document.getElementById('gallery-main-image');
  const thumbsContainer = document.getElementById('gallery-thumbnails');
  if (!mainImg || !thumbsContainer) return;

  mainImg.src = currentProduct.image;
  mainImg.alt = currentProduct.name;

  // Image zoom effect
  const mainWrap = mainImg.parentElement;
  mainWrap.addEventListener('mousemove', (e) => {
    const rect = mainWrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mainImg.style.transformOrigin = `${x}% ${y}%`;
    mainImg.style.transform = 'scale(1.7)';
  });

  mainWrap.addEventListener('mouseleave', () => {
    mainImg.style.transformOrigin = 'center center';
    mainImg.style.transform = 'scale(1)';
  });

  // Render thumbnails
  thumbsContainer.innerHTML = currentProduct.images.map((img, idx) => `
    <button class="thumb-btn ${idx === 0 ? 'active' : ''}" onclick="changeDetailImage('${img}', this)">
      <img src="${img}" alt="${currentProduct.name} view ${idx + 1}">
    </button>
  `).join('');
}

window.changeDetailImage = function(src, btn) {
  const mainImg = document.getElementById('gallery-main-image');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

function renderInfo() {
  const catEl = document.getElementById('detail-cat');
  const titleEl = document.getElementById('detail-title');
  const ratingEl = document.getElementById('detail-rating-container');
  const priceEl = document.getElementById('detail-price-container');
  const descEl = document.getElementById('detail-desc');
  const variantsEl = document.getElementById('detail-variants-container');
  const wishlistBtn = document.getElementById('detail-wishlist-btn');

  if (catEl) catEl.textContent = currentProduct.category;
  if (titleEl) titleEl.textContent = currentProduct.name;

  if (ratingEl) {
    ratingEl.innerHTML = `
      <div class="star-rating">${renderStars(currentProduct.rating)}</div>
      <span class="font-bold">${currentProduct.rating.toFixed(1)}</span>
      <span style="color: var(--text-muted);">(${currentProduct.reviewsCount} customer reviews)</span>
      <span class="stock-tag ${currentProduct.stock > 10 ? 'in-stock' : 'low-stock'}">
        ${currentProduct.stock > 10 ? '✓ In Stock Ready to Ship' : `⚡ Only ${currentProduct.stock} items left in stock`}
      </span>
    `;
  }

  if (priceEl) {
    priceEl.innerHTML = `
      <span class="detail-current-price">$${currentProduct.price.toFixed(2)}</span>
      ${currentProduct.originalPrice ? `<span class="detail-original-price">Rs.${currentProduct.originalPrice.toFixed(2)}</span>` : ''}
      ${currentProduct.discount ? `<span class="detail-discount-pill">Save ${currentProduct.discount}%</span>` : ''}
    `;
  }

  if (descEl) descEl.textContent = currentProduct.description;

  if (variantsEl) {
    let variantsHtml = '';

    // Colors
    if (currentProduct.colors && currentProduct.colors.length > 0) {
      variantsHtml += `
        <div class="variant-block">
          <label class="variant-label">Color: <span id="selected-color-label" style="color: var(--color-accent);">${currentProduct.colorNames ? currentProduct.colorNames[0] : ''}</span></label>
          <div class="color-options">
            ${currentProduct.colors.map((c, i) => `
              <button type="button" class="color-dot ${i === 0 ? 'active' : ''}" style="background-color: ${c}" 
                onclick="selectDetailColor('${c}', '${currentProduct.colorNames ? currentProduct.colorNames[i] : ''}', this)">
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Sizes
    if (currentProduct.sizes && currentProduct.sizes.length > 0) {
      variantsHtml += `
        <div class="variant-block">
          <label class="variant-label">Select Option / Size:</label>
          <div class="size-options">
            ${currentProduct.sizes.map((s, i) => `
              <button type="button" class="size-pill ${i === 0 ? 'active' : ''}" onclick="selectDetailSize('${s}', this)">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }

    variantsEl.innerHTML = variantsHtml;
  }

  // Sync wishlist button state
  if (wishlistBtn) {
    const inWishlist = Storage.isInWishlist(currentProduct.id);
    const svg = wishlistBtn.querySelector('svg');
    if (inWishlist) {
      wishlistBtn.classList.add('active-wishlist');
      if (svg) svg.setAttribute('fill', 'currentColor');
    } else {
      wishlistBtn.classList.remove('active-wishlist');
      if (svg) svg.setAttribute('fill', 'none');
    }
  }
}

window.selectDetailColor = function(color, name, btn) {
  selectedColor = color;
  const label = document.getElementById('selected-color-label');
  if (label) label.textContent = name || color;
  document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
  btn.classList.add('active');
};

window.selectDetailSize = function(size, btn) {
  selectedSize = size;
  document.querySelectorAll('.size-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
};

window.adjustDetailQty = function(delta) {
  const input = document.getElementById('detail-qty-input');
  if (!input || !currentProduct) return;
  let val = parseInt(input.value, 10) || 1;
  val = Math.max(1, Math.min(val + delta, currentProduct.stock || 99));
  input.value = val;
  currentQuantity = val;
};

// Add to cart from details page
window.handleDetailAddToCart = function() {
  if (!currentProduct) return;
  const res = Storage.addToCart(currentProduct.id, currentQuantity, selectedColor, selectedSize);
  if (res.success) {
    Toast.success(`Added ${currentQuantity} item(s) to your shopping cart!`, 'Cart Updated');
  }
};

// Buy Now direct flow
window.handleBuyNow = function() {
  if (!currentProduct) return;
  Storage.addToCart(currentProduct.id, currentQuantity, selectedColor, selectedSize);
  window.location.href = 'checkout.html';
};

// Wishlist toggle
window.handleDetailWishlistToggle = function() {
  if (!currentProduct) return;
  const res = Storage.toggleWishlist(currentProduct.id);
  const btn = document.getElementById('detail-wishlist-btn');
  if (btn) {
    const svg = btn.querySelector('svg');
    if (res.inWishlist) {
      btn.classList.add('active-wishlist');
      if (svg) svg.setAttribute('fill', 'currentColor');
      Toast.success(`Saved "${currentProduct.name}" to wishlist`);
    } else {
      btn.classList.remove('active-wishlist');
      if (svg) svg.setAttribute('fill', 'none');
      Toast.info(`Removed from wishlist`);
    }
  }
};

// Tabs: Specifications, Description, Reviews, Shipping
function initProductTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

function renderSpecs() {
  const container = document.getElementById('tab-specs-container');
  if (!container || !currentProduct.specs) return;

  let html = '<table class="specs-table"><tbody>';
  for (const [key, val] of Object.entries(currentProduct.specs)) {
    html += `<tr><td>${key}</td><td>${val}</td></tr>`;
  }
  html += '</tbody></table>';
  container.innerHTML = html;
}

function renderReviews() {
  const listContainer = document.getElementById('reviews-list-container');
  if (!listContainer || !currentProduct) return;

  const baseReviews = currentProduct.reviews || [];
  const userReviews = Storage.getUserReviews(currentProduct.id);
  const allReviews = [...userReviews, ...baseReviews];

  if (allReviews.length === 0) {
    listContainer.innerHTML = `<p style="color: var(--text-muted);">No reviews yet. Be the first to review this product!</p>`;
    return;
  }

  listContainer.innerHTML = allReviews.map(r => `
    <div style="background: #fff; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-weight: 700;">${r.name}</span>
        <span style="font-size: 0.8125rem; color: var(--text-light);">${r.date}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem;">
        <div class="star-rating">${renderStars(r.rating)}</div>
        <span style="font-size: 0.75rem; color: #10b981; font-weight: 700;">✓ Verified Purchase</span>
      </div>
      <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">${r.comment}</p>
    </div>
  `).join('');
}

function initReviewForm() {
  const form = document.getElementById('add-review-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('review-author-name');
    const ratingSelect = document.getElementById('review-rating-select');
    const commentInput = document.getElementById('review-comment-text');

    if (!commentInput.value.trim()) {
      Toast.error('Please write a review comment');
      return;
    }

    const newReview = {
      name: nameInput.value.trim() || 'Verified Customer',
      rating: Number(ratingSelect.value) || 5,
      comment: commentInput.value.trim()
    };

    Storage.addUserReview(currentProduct.id, newReview);
    Toast.success('Your review has been submitted and published!', 'Review Added');
    
    // Reset form & re-render
    commentInput.value = '';
    renderReviews();
  });
}

function renderRelatedProducts() {
  const container = document.getElementById('related-products-container');
  if (!container || !currentProduct) return;

  const related = PRODUCTS_DATA
    .filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.isTrending))
    .slice(0, 4);

  container.innerHTML = related.map(p => createProductCardHtml(p)).join('');
}
