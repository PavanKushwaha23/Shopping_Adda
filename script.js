
const products = [
  {
    id: 1,
    name: "Studio Headphones",
    price: 249,
    category: "Audio",
    color: "Black",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    image2:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    desc: "Active noise cancellation with 30-hour battery life.",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 199,
    category: "Wearables",
    color: "Black",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    image2:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    desc: "Track your health seamlessly.",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 129,
    category: "Workspace",
    color: "White",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",
    image2:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    desc: "Tactile mechanical switches.",
  },
  {
    id: 4,
    name: "Buds Pro",
    price: 149,
    category: "Audio",
    color: "White",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    image2:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    desc: "True wireless earbuds with spatial audio.",
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 79,
    category: "Workspace",
    color: "Black",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    image2:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    desc: "Ultra-responsive wireless mouse.",
  },
  {
    id: 6,
    name: "Fitness Tracker Band",
    price: 49,
    category: "Wearables",
    color: "Black",
    rating: 3.9,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    image2:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    desc: "Minimalist fitness band.",
  },
  {
    id: 7,
    name: "Desk Mat",
    price: 35,
    category: "Workspace",
    color: "Black",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1621259508922-26330058b85b?w=500&q=80",
    image2:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    desc: "Premium vegan leather desk mat.",
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    price: 89,
    category: "Audio",
    color: "White",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    image2:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    desc: "Waterproof portable speaker.",
  },
];


let currentColor = "All";
let minRating = 0;
let currentPage = 1;
const itemsPerPage = 4; 
let cart = [];
let wishlist = [];
let currentCategory = "All";
let currentSearch = "";
let maxPrice = 500;


const grid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");
const wishlistItemsContainer = document.getElementById("wishlist-items");
const categoryTitle = document.getElementById("current-category-title");


function renderProducts(isLoading = false) {
  grid.innerHTML = "";
  const loadMoreBtn = document.getElementById("load-more-btn");

  
  if (isLoading) {
    loadMoreBtn.style.display = "none";
    for (let i = 0; i < 4; i++) {
      grid.innerHTML += `
                <div class="skeleton-card">
                    <div class="skeleton-img"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-btn"></div>
                </div>`;
    }
    return; 
  }

  
  let filtered = products.filter((p) => {
    const matchesCategory =
      currentCategory === "All" || p.category === currentCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(currentSearch.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    const matchesColor = currentColor === "All" || p.color === currentColor;
    const matchesRating = p.rating >= minRating;
    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesColor &&
      matchesRating
    );
  });

  
  const sortValue = document.getElementById("sort-select").value;
  if (sortValue === "low-high") filtered.sort((a, b) => a.price - b.price);
  if (sortValue === "high-low") filtered.sort((a, b) => b.price - a.price);

  
  const paginatedProducts = filtered.slice(0, currentPage * itemsPerPage);

  if (paginatedProducts.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted)">No products found.</p>`;
    loadMoreBtn.style.display = "none";
    return;
  }

  
  paginatedProducts.forEach((product) => {
    const isWished = wishlist.some((w) => w.id === product.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onclick="showProductDetails(${product.id})">
            <div class="product-info">
                <span class="product-category">${product.category} • ★ ${product.rating}</span>
                <h3 class="product-title" onclick="showProductDetails(${product.id})">${product.name}</h3>
                <span class="product-price">$${product.price}</span>
                <div class="card-actions">
                    <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-wish ${isWished ? "active" : ""}" onclick="toggleWishlist(${product.id})">
                        <i class="${isWished ? "fas" : "far"} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
    grid.appendChild(card);
  });

  
  if (filtered.length > paginatedProducts.length) {
    loadMoreBtn.style.display = "inline-block";
  } else {
    loadMoreBtn.style.display = "none";
  }
}


function fetchAndRender() {
  renderProducts(true); 
  setTimeout(() => {
    renderProducts(false); 
  }, 800);
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p style="color: var(--text-muted)">Your cart is empty.</p>';
  } else {
    cart.forEach((item) => {
      total += item.price * item.quantity;
      count += item.quantity;
      const cartRow = document.createElement("div");
      cartRow.className = "cart-item";
      cartRow.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
      cartItemsContainer.appendChild(cartRow);
    });
  }

  cartTotalEl.innerText = `$${total.toFixed(2)}`;
  cartCount.innerText = count;
}

function renderWishlist() {
  wishlistItemsContainer.innerHTML = "";
  wishlistCount.innerText = wishlist.length;

  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML =
      '<p style="color: var(--text-muted)">Your wishlist is empty.</p>';
    return;
  }

  wishlist.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item"; 
    div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <button class="btn-add" style="padding: 0.4rem 0.8rem; margin-top: 0.5rem;" onclick="addToCart(${item.id}); toggleWishlist(${item.id});">Move to Cart</button>
            </div>
        `;
    wishlistItemsContainer.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();

  
  showToast(`${product.name} added to cart!`, "success");
}


const cartIcon = document.getElementById("cart-btn");
cartIcon.style.transform = "scale(1.2)";
setTimeout(() => (cartIcon.style.transform = "scale(1)"), 200);

function updateQty(id, change) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) removeFromCart(id);
    else renderCart();
  }
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

function toggleWishlist(id) {
  const exists = wishlist.find((w) => w.id === id);
  if (exists) {
    wishlist = wishlist.filter((w) => w.id !== id);
  } else {
    wishlist.push(products.find((p) => p.id === id));
  }
  renderWishlist();
  renderProducts(); 
}


function showProductDetails(id) {
  const product = products.find((p) => p.id === id);
  const content = document.getElementById("product-details-content");
  content.innerHTML = `
        <div class="details-grid">
            <img src="${product.image}" alt="${product.name}" class="details-img">
            <div class="details-info">
                <span class="product-category">${product.category}</span>
                <h2>${product.name}</h2>
                <div class="details-price">$${product.price}</div>
                <p class="details-desc">${product.desc}</p>
                <button class="btn-add" style="width: 100%; padding: 1rem; font-size: 1.1rem;" onclick="addToCart(${product.id}); document.getElementById('product-details-modal').classList.remove('active');">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
  document.getElementById("product-details-modal").classList.add("active");
}

document.querySelectorAll(".filter-list li").forEach((li) => {
  li.addEventListener("click", (e) => {
    document
      .querySelectorAll(".filter-list li")
      .forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");
    currentCategory = e.target.getAttribute("data-category");
    categoryTitle.innerText =
      currentCategory === "All" ? "All Products" : currentCategory;
    renderProducts();
  });
});

// Search
document.getElementById("search-input").addEventListener("input", (e) => {
  currentSearch = e.target.value;
  renderProducts();
});

// Price Filter
const priceRange = document.getElementById("price-range");
priceRange.addEventListener("input", (e) => {
  maxPrice = e.target.value;
  document.getElementById("price-value").innerText = maxPrice;
  renderProducts();
});

// Sort
document
  .getElementById("sort-select")
  .addEventListener("change", renderProducts);

// Modal Toggles
document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("cart-overlay").classList.add("active");
});
document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-overlay").classList.remove("active");
});

document.getElementById("wishlist-btn").addEventListener("click", () => {
  document.getElementById("wishlist-modal").classList.add("active");
});
document.getElementById("close-wishlist").addEventListener("click", () => {
  document.getElementById("wishlist-modal").classList.remove("active");
});

document.getElementById("close-details").addEventListener("click", () => {
  document.getElementById("product-details-modal").classList.remove("active");
});


document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    return showToast("Your cart is empty!", "error");
  }

  showToast("Checkout successful! Thank you for your order.", "success");
  cart = [];
  renderCart();
  document.getElementById("cart-overlay").classList.remove("active");
});

// Initial Render
// renderProducts();
// renderCart();
// renderWishlist();

// --- Toast Notification Logic ---
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");

  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  
  const icon =
    type === "success"
      ? '<i class="fas fa-check-circle" style="color: #10b981; font-size: 1.2rem;"></i>'
      : '<i class="fas fa-exclamation-circle" style="color: #ef4444; font-size: 1.2rem;"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;

  toastContainer.appendChild(toast);

  
  setTimeout(() => {
    toast.classList.add("fade-out");

    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


document.getElementById("load-more-btn").addEventListener("click", () => {
  currentPage++;
  fetchAndRender(); });


document.querySelectorAll('input[name="color"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    currentColor = e.target.value;
    currentPage = 1; 
    fetchAndRender();
  });
});

document.querySelectorAll('input[name="rating"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    minRating = parseFloat(e.target.value);
    currentPage = 1;
    fetchAndRender();
  });
});


function showProductDetails(id) {
  const product = products.find((p) => p.id === id);
  const content = document.getElementById("product-details-content");
  content.innerHTML = `
        <div class="details-grid">
            <div class="zoom-container" id="img-zoom-container">
                <img src="${product.image}" alt="${product.name}" class="zoom-img" id="zoom-img">
            </div>
            <div class="details-info">
                <span class="product-category">${product.category} • ★ ${product.rating}</span>
                <h2>${product.name}</h2>
                <div class="details-price">$${product.price}</div>
                <p class="details-desc">${product.desc}</p>
                <button class="btn-add" style="width: 100%; padding: 1rem; font-size: 1.1rem;" onclick="addToCart(${product.id}); document.getElementById('product-details-modal').classList.remove('active');">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
  document.getElementById("product-details-modal").classList.add("active");

  
  const container = document.getElementById("img-zoom-container");
  const img = document.getElementById("zoom-img");

  container.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(2)"; 
  });

  container.addEventListener("mouseleave", () => {
    img.style.transformOrigin = "center center";
    img.style.transform = "scale(1)";
  });
}


window.addEventListener("DOMContentLoaded", () => {
  
  if (!sessionStorage.getItem("rakhiPopupShown")) {
    setTimeout(() => {
      document.getElementById("promo-popup").classList.add("active");
    }, 2000); 
  }
});

document.getElementById("close-promo").addEventListener("click", () => {
  document.getElementById("promo-popup").classList.remove("active");
  sessionStorage.setItem("rakhiPopupShown", "true");
});

document.getElementById("apply-promo-btn").addEventListener("click", () => {
  navigator.clipboard.writeText("RAKHI20"); // Code copy ho jayega
  showToast("Promo Code RAKHI20 Copied!", "success");
  document.getElementById("promo-popup").classList.remove("active");
  sessionStorage.setItem("rakhiPopupShown", "true");
});

fetchAndRender();


const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("aura_theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("aura_theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    localStorage.setItem("aura_theme", "light");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});


function shootConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    
    const colors = ["#e11d48", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = "-10px";
    confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000); 
  }
}


document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) return showToast("Your cart is empty!", "error");
  document.getElementById("cart-overlay").classList.remove("active");
  document.getElementById("checkout-modal").classList.add("active");
});

document.getElementById("close-checkout").addEventListener("click", () => {
  document.getElementById("checkout-modal").classList.remove("active");
});

document.getElementById("next-step-btn").addEventListener("click", () => {
  document.getElementById("checkout-step-1").style.display = "none";
  document.getElementById("checkout-step-2").style.display = "block";
});

document.getElementById("back-step-btn").addEventListener("click", () => {
  document.getElementById("checkout-step-2").style.display = "none";
  document.getElementById("checkout-step-1").style.display = "block";
});

document.getElementById("place-order-btn").addEventListener("click", () => {
  shootConfetti();
  showToast("Order Placed Successfully!", "success");

  
  cart = [];
  discountPercentage = 0;
  saveToLocal();
  renderCart();

  document.getElementById("checkout-modal").classList.remove("active");

  
  setTimeout(() => {
    document.getElementById("checkout-step-2").style.display = "none";
    document.getElementById("checkout-step-1").style.display = "block";
  }, 500);
});


document.getElementById("subscribe-btn").addEventListener("click", () => {
  const emailInput = document.getElementById("newsletter-email");
  if (emailInput.value.includes("@") && emailInput.value.includes(".")) {
    showToast("Thanks for subscribing! Check your email.", "success");
    shootConfetti(); 
    emailInput.value = ""; 
  } else {
    showToast("Please enter a valid email address.", "error");
  }
});
