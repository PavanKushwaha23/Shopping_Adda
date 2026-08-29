
document.addEventListener('DOMContentLoaded', () => {
  renderHomeCategories();
  renderFeaturedProducts();
  renderFlashDealProduct();
  initFlashDealTimer();
  initNewsletterForm();
});

// Render Dynamic Categories Grid
function renderHomeCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = CATEGORIES_DATA.map(cat => `
    <a href="shop.html?category=${encodeURIComponent(cat.id)}" class="category-card" id="cat-card-${cat.id}">
      <img src="${cat.image}" alt="${cat.name}" class="category-card-bg" loading="lazy">
      <div class="category-card-overlay"></div>
      <div class="category-card-content">
        <div class="category-name">${cat.name}</div>
        <div class="category-count">${cat.itemCount} Curated Items &rarr;</div>
      </div>
    </a>
  `).join('');
}

// Render Featured & Trending Products
function renderFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products-container');
  const trendingContainer = document.getElementById('trending-products-container');

  const featured = PRODUCTS_DATA.filter(p => p.isFeatured).slice(0, 4);
  const trending = PRODUCTS_DATA.filter(p => p.isTrending).slice(0, 4);

  if (featuredContainer) {
    featuredContainer.innerHTML = featured.map(p => createProductCardHtml(p)).join('');
  }

  if (trendingContainer) {
    trendingContainer.innerHTML = trending.map(p => createProductCardHtml(p)).join('');
  }
}

// Render Flash Deal Highlight Product
function renderFlashDealProduct() {
  const container = document.getElementById('flash-deal-product-preview');
  if (!container) return;

  const dealItem = PRODUCTS_DATA.find(p => p.isFlashDeal) || PRODUCTS_DATA[0];
  container.innerHTML = `
    <div class="product-card" style="max-width: 360px; margin: 0 auto; box-shadow: var(--shadow-xl);">
      <div class="product-media">
        <img src="${dealItem.image}" alt="${dealItem.name}" class="product-img">
        <div class="product-badge-group">
          <span class="product-badge badge-discount">FLASH DEAL</span>
          <span class="product-badge badge-gold">-${dealItem.discount}% OFF</span>
        </div>
      </div>
      <div class="product-body">
        <div class="product-cat">${dealItem.category}</div>
        <a href="product-details.html?id=${dealItem.id}" class="product-title">${dealItem.name}</a>
        <div class="product-price-row">
          <div class="product-prices">
            <span class="current-price">Rs.${dealItem.price.toFixed(2)}</span>
            <span class="old-price">Rs.${dealItem.originalPrice.toFixed(2)}</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="handleCardAddToCart('${dealItem.id}')">
            Claim Deal
          </button>
        </div>
      </div>
    </div>
  `;
}

// 24-hour Flash Deal Countdown Timer
function initFlashDealTimer() {
  const daysEl = document.getElementById('deal-days');
  const hoursEl = document.getElementById('deal-hours');
  const minsEl = document.getElementById('deal-mins');
  const secsEl = document.getElementById('deal-secs');

  if (!hoursEl || !minsEl || !secsEl) return;

  let totalSeconds = 18 * 3600 + 45 * 60 + 30; // 18h 45m 30s remaining
  setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 0) totalSeconds = 24 * 3600;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (daysEl) daysEl.textContent = '00';
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// Newsletter form handling
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newsletter-email');
    if (input && input.value) {
      Toast.success(`Thank you for subscribing! Your 15% VIP welcome code has been sent to ${input.value}.`, 'Subscribed!');
      input.value = '';
    }
  });
}
