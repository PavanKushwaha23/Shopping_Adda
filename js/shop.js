
let currentFilters = {
  search: '',
  categories: [],
  maxPrice: 1500,
  minRating: 0,
  inStockOnly: false,
  sortBy: 'featured'
};

let viewMode = 'grid'; 

document.addEventListener('DOMContentLoaded', () => {
  readUrlParams();
  initCategoryFilters();
  initPriceSlider();
  initRatingFilters();
  initSorting();
  initViewToggle();
  initMobileFilterDrawer();
  applyFiltersAndRender();
});

function readUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');
  const searchParam = params.get('search');

  if (categoryParam) {
    currentFilters.categories = [categoryParam];
  }
  if (searchParam) {
    currentFilters.search = searchParam.toLowerCase();
    const searchInputs = document.querySelectorAll('.header-search-input');
    searchInputs.forEach(i => i.value = searchParam);
  }
}

// Category Checkbox list
function initCategoryFilters() {
  const container = document.getElementById('category-filter-list');
  if (!container) return;

  container.innerHTML = CATEGORIES_DATA.map(cat => {
    const isChecked = currentFilters.categories.includes(cat.id);
    return `
      <label class="filter-checkbox-label" id="filter-cat-${cat.id}">
        <input type="checkbox" value="${cat.id}" ${isChecked ? 'checked' : ''} onchange="handleCategoryChange(this)">
        <span>${cat.name}</span>
        <span class="filter-count">(${cat.itemCount})</span>
      </label>
    `;
  }).join('');
}

window.handleCategoryChange = function(checkbox) {
  const val = checkbox.value;
  if (checkbox.checked) {
    if (!currentFilters.categories.includes(val)) currentFilters.categories.push(val);
  } else {
    currentFilters.categories = currentFilters.categories.filter(c => c !== val);
  }
  applyFiltersAndRender();
};

// Price range slider
function initPriceSlider() {
  const slider = document.getElementById('price-slider');
  const priceDisplay = document.getElementById('price-slider-display');
  if (!slider) return;

  slider.addEventListener('input', (e) => {
    const val = Number(e.target.value);
    currentFilters.maxPrice = val;
    if (priceDisplay) priceDisplay.textContent = `Rs.${val}`;
    applyFiltersAndRender();
  });
}

// Rating radio/checkbox
function initRatingFilters() {
  const radios = document.querySelectorAll('input[name="rating-filter"]');
  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentFilters.minRating = Number(e.target.value) || 0;
      applyFiltersAndRender();
    });
  });

  const stockCheck = document.getElementById('in-stock-filter');
  if (stockCheck) {
    stockCheck.addEventListener('change', (e) => {
      currentFilters.inStockOnly = e.target.checked;
      applyFiltersAndRender();
    });
  }
}

// Sorting dropdown
function initSorting() {
  const select = document.getElementById('shop-sort-select');
  if (!select) return;

  select.addEventListener('change', (e) => {
    currentFilters.sortBy = e.target.value;
    applyFiltersAndRender();
  });
}

// View toggle (Grid vs List)
function initViewToggle() {
  const gridBtn = document.getElementById('view-grid-btn');
  const listBtn = document.getElementById('view-list-btn');

  if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
      viewMode = 'grid';
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      applyFiltersAndRender();
    });

    listBtn.addEventListener('click', () => {
      viewMode = 'list';
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      applyFiltersAndRender();
    });
  }
}

// Mobile Filter Drawer
function initMobileFilterDrawer() {
  const trigger = document.getElementById('mobile-filter-open-btn');
  const sidebar = document.querySelector('.filter-sidebar');
  const backdrop = document.getElementById('nav-backdrop');

  if (trigger && sidebar) {
    trigger.addEventListener('click', () => {
      sidebar.classList.add('mobile-active');
      backdrop?.classList.add('active');
    });
  }
}

// Reset all filters
window.resetAllFilters = function() {
  currentFilters = {
    search: '',
    categories: [],
    maxPrice: 1500,
    minRating: 0,
    inStockOnly: false,
    sortBy: 'featured'
  };

  // Reset UI controls
  const catBoxes = document.querySelectorAll('#category-filter-list input[type="checkbox"]');
  catBoxes.forEach(b => b.checked = false);

  const priceSlider = document.getElementById('price-slider');
  if (priceSlider) {
    priceSlider.value = 1500;
    const priceDisplay = document.getElementById('price-slider-display');
    if (priceDisplay) priceDisplay.textContent = '$1500';
  }

  const ratingRadios = document.querySelectorAll('input[name="rating-filter"]');
  ratingRadios.forEach(r => r.checked = r.value === '0');

  const stockCheck = document.getElementById('in-stock-filter');
  if (stockCheck) stockCheck.checked = false;

  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) sortSelect.value = 'featured';

  applyFiltersAndRender();
  Toast.info('All filters have been reset');
};

// Main Filtering & Rendering Logic
function applyFiltersAndRender() {
  const container = document.getElementById('shop-products-grid');
  const countEl = document.getElementById('shop-results-count');
  if (!container) return;

  let results = PRODUCTS_DATA.filter(p => {
    // Search
    if (currentFilters.search) {
      const matchName = p.name.toLowerCase().includes(currentFilters.search);
      const matchCat = p.category.toLowerCase().includes(currentFilters.search);
      const matchDesc = p.description.toLowerCase().includes(currentFilters.search);
      if (!matchName && !matchCat && !matchDesc) return false;
    }

    // Categories
    if (currentFilters.categories.length > 0) {
      if (!currentFilters.categories.includes(p.category)) return false;
    }

    // Price
    if (p.price > currentFilters.maxPrice) return false;

    // Rating
    if (p.rating < currentFilters.minRating) return false;

    // In stock
    if (currentFilters.inStockOnly && p.stock <= 0) return false;

    return true;
  });

  // Sorting
  if (currentFilters.sortBy === 'price-low') {
    results.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sortBy === 'price-high') {
    results.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (currentFilters.sortBy === 'discount') {
    results.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  }

  // Update count text
  if (countEl) {
    countEl.textContent = `Showing ${results.length} of ${PRODUCTS_DATA.length} products`;
  }

  // Render empty state if no results
  if (results.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
        <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-light); margin: 0 auto 1rem;"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 11h6"/></svg>
        <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.5rem;">No products match your criteria</h3>
        <p style="color: var(--text-muted); max-width: 440px; margin: 0 auto 1.5rem;">Try relaxing your filters, searching for a different keyword, or resetting to view all items.</p>
        <button class="btn btn-primary" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Render Grid or List view
  if (viewMode === 'list') {
    container.className = 'products-list-view';
    container.innerHTML = results.map(p => createProductListRowHtml(p)).join('');
  } else {
    container.className = 'products-grid';
    container.innerHTML = results.map(p => createProductCardHtml(p)).join('');
  }
}

// Generate List view item HTML
function createProductListRowHtml(p) {
  const inWishlist = Storage.isInWishlist(p.id);
  return `
    <div class="product-list-row" id="row-${p.id}" style="display: grid; grid-template-columns: 200px 1fr auto; gap: 1.5rem; background: #fff; border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem; align-items: center; margin-bottom: 1rem; box-shadow: var(--shadow-sm);">
      <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; height: 160px; background: var(--bg-surface-alt);">
        <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
        ${p.badge ? `<span class="product-badge badge-primary" style="position: absolute; top: 0.5rem; left: 0.5rem;">${p.badge}</span>` : ''}
      </div>
      <div>
        <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent);">${p.category}</span>
        <h3 style="font-size: 1.2rem; font-weight: 700; margin: 0.25rem 0 0.5rem;"><a href="product-details.html?id=${p.id}">${p.name}</a></h3>
        <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.75rem; max-width: 600px;">${p.description}</p>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="star-rating">${renderStars(p.rating)}</div>
          <span style="font-size: 0.8125rem; color: var(--text-muted);">${p.rating.toFixed(1)} (${p.reviewsCount} reviews)</span>
          <span class="stock-tag ${p.stock > 10 ? 'in-stock' : 'low-stock'}">${p.stock > 10 ? 'In Stock' : `Only ${p.stock} left`}</span>
        </div>
      </div>
      <div style="text-align: right; min-width: 160px; display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem;">
        <div>
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary);">Rs.${p.price.toFixed(2)}</div>
          ${p.originalPrice ? `<div style="font-size: 0.875rem; text-decoration: line-through; color: var(--text-light);">Rs.${p.originalPrice.toFixed(2)}</div>` : ''}
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary btn-icon" onclick="handleCardToggleWishlist('${p.id}', this)" title="Wishlist">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
          <button class="btn btn-primary btn-sm" onclick="handleCardAddToCart('${p.id}')">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}
