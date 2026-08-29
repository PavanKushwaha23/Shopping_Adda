
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSearch();
  initWishlistDrawer();
  updateBadgeCounts();

  // Listen to storage events
  window.addEventListener('cartUpdated', () => updateBadgeCounts());
  window.addEventListener('wishlistUpdated', () => {
    updateBadgeCounts();
    renderWishlistDrawerItems();
  });
  window.addEventListener('storage', () => updateBadgeCounts());
});

function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('nav-backdrop');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('is-sticky');
    } else {
      header?.classList.remove('is-sticky');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('active');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        closeMobileNav();
        closeWishlistDrawer();
      });
    }

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileNav();
        closeWishlistDrawer();
        closeQuickViewModal();
      }
    });
  }

  function openMobileNav() {
    mobileNav?.classList.add('active');
    toggleBtn?.classList.add('active');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav?.classList.remove('active');
    toggleBtn?.classList.remove('active');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Highlight active nav link based on current path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Check match
    const isHomePage = (href === 'index.html' || href === '/' || href === './') && 
                       (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === '');
    const isMatching = currentPath.includes(href) && href !== 'index.html' && href !== '/';

    if (isHomePage || isMatching) {
      link.classList.add('active');
    }
  });
}

function updateBadgeCounts() {
  const cartBadges = document.querySelectorAll('.cart-count-badge');
  const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');
  
  const cartCount = Storage.getCartCount();
  const wishlistCount = Storage.getWishlistCount();

  cartBadges.forEach(badge => {
    badge.textContent = cartCount;
    if (cartCount > 0) {
      badge.classList.remove('badge-hidden');
      badge.classList.add('badge-bump');
      setTimeout(() => badge.classList.remove('badge-bump'), 300);
    } else {
      badge.classList.add('badge-hidden');
    }
  });

  wishlistBadges.forEach(badge => {
    badge.textContent = wishlistCount;
    if (wishlistCount > 0) {
      badge.classList.remove('badge-hidden');
      badge.classList.add('badge-bump');
      setTimeout(() => badge.classList.remove('badge-bump'), 300);
    } else {
      badge.classList.add('badge-hidden');
    }
  });
}

function initSearch() {
  const searchInputs = document.querySelectorAll('.header-search-input');
  searchInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });

    const searchBtn = input.parentElement.querySelector('.search-submit-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      });
    }
  });
}

// Wishlist side drawer functionality
function initWishlistDrawer() {
  const wishlistTriggers = document.querySelectorAll('.wishlist-trigger-btn');
  const drawer = document.getElementById('wishlist-drawer');
  const closeBtn = document.getElementById('wishlist-drawer-close');
  const backdrop = document.getElementById('nav-backdrop');

  wishlistTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
     
      e.preventDefault();
      openWishlistDrawer();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeWishlistDrawer);
  }
}

function openWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const backdrop = document.getElementById('nav-backdrop');
  renderWishlistDrawerItems();
  drawer?.classList.add('active');
  backdrop?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  const backdrop = document.getElementById('nav-backdrop');
  drawer?.classList.remove('active');
  backdrop?.classList.remove('active');
  document.body.style.overflow = '';
}

function renderWishlistDrawerItems() {
  const container = document.getElementById('wishlist-drawer-items');
  if (!container) return;

  const wishlist = Storage.getWishlist();
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        <p class="empty-title">Your wishlist is empty</p>
        <p class="empty-desc">Explore our collections and tap the heart icon on any product to save it here.</p>
        <a href="shop.html" class="btn btn-primary btn-sm mt-3" onclick="closeWishlistDrawer()">Explore Shop</a>
      </div>
    `;
    return;
  }

  let html = '<div class="drawer-items-list">';
  wishlist.forEach(item => {
    html += `
      <div class="drawer-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="drawer-item-img">
        <div class="drawer-item-info">
          <a href="product-details.html?id=${item.id}" class="drawer-item-title">${item.name}</a>
          <div class="drawer-item-price">Rs.${item.price.toFixed(2)}</div>
          <div class="drawer-item-actions">
            <button class="btn btn-sm btn-primary drawer-add-cart-btn" onclick="handleDrawerAddToCart('${item.id}')">
              Move to Cart
            </button>
            <button class="btn btn-icon btn-sm drawer-remove-btn" title="Remove" onclick="handleDrawerRemoveWishlist('${item.id}')">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

window.handleDrawerAddToCart = function(productId) {
  const result = Storage.addToCart(productId, 1);
  if (result.success) {
    Toast.success(`Added ${result.product.name} to your cart!`);
    Storage.toggleWishlist(productId);
    renderWishlistDrawerItems();
  }
};

window.handleDrawerRemoveWishlist = function(productId) {
  Storage.toggleWishlist(productId);
  Toast.info("Removed item from wishlist");
  renderWishlistDrawerItems();
};
