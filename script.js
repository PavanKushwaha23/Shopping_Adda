// --- 1. Global Data & State ---
const products = [
  {
    id: 1,
    name: "Aura Studio Headphones",
    price: 249,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    image2:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
  },
  {
    id: 2,
    name: "Zenith Smartwatch",
    price: 199,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    image2:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
  },
  {
    id: 3,
    name: "Ergo Mechanical Keyboard",
    price: 129,
    category: "Workspace",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
    image2:
      "https://verityverse.in/cdn/shop/files/image_2026-08-03_18-45-35.webp?v=1785763205",
  },
  {
    id: 4,
    name: "Aura Buds Pro",
    price: 149,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    image2:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
  },
  {
    id: 5,
    name: "Home Theatre",
    price: 180,
    category: "Audio",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0hztVTd9YZ64QAYC0nMM4wvQJTxPJiyl9iNkLx3hOQfdnIH1ydQozc_Go&s=10",
    image2:
      "https://smartranchi.com/pub/media/catalog/product/cache/27977ff3c33d431d62509dbafcfb3994/m/m/mms2580b_1.jpg",
  },
  {
    id: 6,
    name: "Bracelet",
    price: 149,
    category: "Wearables",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVfJSTCRJYwHae0UKvouSxzPoTV079vbrgXwQ5h_jYg&s=10",
    image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn6TXU8AQIZQKBx0oaxRcAHu7PN821SWOb2a0npfTcbA&s=10",
  },
  {
    id: 7,
    name: "Fitness Tracker Band",
    price: 849,
    category: "Wearables",
    image:
      "https://m.media-amazon.com/images/I/61KpySHjUYL._AC_UF1000,1000_QL80_.jpg",
    image2:
      "https://www.jointcorp.com/wp-content/uploads/2025/12/960-004-1766541264788-large.webp",
  },
  {
    id: 8,
    name: "Wooden Computer Table",
    price: 4949,
    category: "Workspace",
    image:
      "https://www.callas.in/cdn/shop/files/91tIHnj7XgL._SX679.jpg?v=1773993952",
    image2:
      "https://m.media-amazon.com/images/I/81T987RQ+GL._AC_UF894,1000_QL80_.jpg",
  },
  {
    id: 9,
    name: "Office Chair",
    price: 1989,
    category: "Workspace",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd2w8FXC9X-QgbLoPAlBFytJnouniiXHXScod0O1DSjxQ9i8jzMx0tUvVI&s=10",
    image2:
      "https://www.ikea.com/in/en/images/products/renberget-swivel-chair-bomstad-black__1020135_pe831794_s5.jpg?f=xxs",
  },
  {
    id: 10,
    name: "Aviation Headset",
    price: 949,
    category: "Audio",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOjMgZbjrBSqNB1tBNmvfIM4uJJ_BSygC2Ss2uahVDXjDO4KT0HF2Mdjm&s=10",
    image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-HA1gcgQhmRw9jXVvI5gU5oG9fbIjpurfkAZaOeNp3_pG7AAqC-q3LLU&s=10",
  },
  {
    id: 11,
    name: "Wired Earphone",
    price: 199,
    category: "Audio",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi-VdF-tPBCtyRhZc5Bt612Y6e9aWslURwJXd6t_sB4M5e1SPcTdj-yZAa&s=10",
    image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAt3z3IvFyUsaYctY9m0bUBP16Zj-y0x0R9iiy23XWOC98Lm3jQvGmhyLV&s=10",
  },
  {
    id: 12,
    name: "Party Speaker",
    price: 449,
    category: "Audio",
    image:
      "https://img.tatacliq.com/images/i31/437Wx649H/MP000000030694381_437Wx649H_202604161627311.jpeg",
    image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0e6qkmPrHJJq3-x8wWXibTodD1zsr8E8vJw08fvQWfqvPha5CQhnS3ymq&s=10",
  },
];

let cart = JSON.parse(localStorage.getItem("aura_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("aura_wishlist")) || [];
const isDarkMode = localStorage.getItem("aura_theme") === "dark";

// --- 2. Inject Navbar & Footer (Component Architecture) ---
function injectLayout() {
  const navbarHTML = `
        <nav class="navbar">
            <div class="nav-container">
                <a href="index.html" class="logo">Shopping Adda.</a>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="shop.html">Shop</a>
                    <a href="contact.html">Contact</a>
                </div>
                <div class="nav-icons">
                    <div class="icon-btn" id="theme-toggle"><i class="fas fa-${isDarkMode ? "sun" : "moon"}"></i></div>
                    <a href="wishlist.html" class="icon-btn"><i class="far fa-heart"></i><span class="badge" id="nav-wish-count">${wishlist.length}</span></a>
                    <a href="cart.html" class="icon-btn"><i class="fas fa-shopping-bag"></i><span class="badge" id="nav-cart-count">${cart.reduce((a, c) => a + c.quantity, 0)}</span></a>
                </div>
            </div>
        </nav>
    `;
  const footerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div><h4 class="logo">Shopping Adda.</h4><p>Premium tech accessories for modern creators.</p></div>
                <div><h4>Quick Links</h4><ul><li><a href="shop.html">Shop All</a></li><li><a href="contact.html">Contact Us</a></li></ul></div>
            </div>
            <div class="footer-bottom">&copy; 2026 Aura Tech. All rights reserved.</div>
        </footer>
        <div id="toast-container" class="toast-container"></div>
    `;

   document.getElementById("navbar-placeholder").innerHTML = navbarHTML;
  document.getElementById("footer-placeholder").innerHTML = footerHTML;

  // Theme Toggle Logic
  if (isDarkMode) document.body.classList.add("dark-mode");
  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const dark = document.body.classList.contains("dark-mode");
    localStorage.setItem("aura_theme", dark ? "dark" : "light");
    location.reload(); // Refresh to update icons
  });
}

// --- 3. Core Functions ---
function saveState() {
  localStorage.setItem("aura_cart", JSON.stringify(cart));
  localStorage.setItem("aura_wishlist", JSON.stringify(wishlist));
  document.getElementById("nav-cart-count").innerText = cart.reduce(
    (a, c) => a + c.quantity,
    0,
  );
  document.getElementById("nav-wish-count").innerText = wishlist.length;
}

function showToast(msg) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#10b981"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

window.addToCart = function (id) {
  const product = products.find((p) => p.id === id);
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  saveState();
  showToast(`${product.name} added to Cart!`);
  if (window.location.pathname.includes("cart.html")) renderCartPage();
};

window.toggleWishlist = function (id) {
  const existing = wishlist.find((w) => w.id === id);
  if (existing) wishlist = wishlist.filter((w) => w.id !== id);
  else wishlist.push(products.find((p) => p.id === id));
  saveState();
  if (window.location.pathname.includes("shop.html")) renderShopPage();
  if (window.location.pathname.includes("wishlist.html")) renderWishlistPage();
};

// --- 4. Page Specific Renders ---
function renderProductCard(product) {
  const isWished = wishlist.some((w) => w.id === product.id);
  return `
        <div class="product-card">
            <div class="img-wrapper">
                <img src="${product.image}" class="primary-img">
                <img src="${product.image2}" class="secondary-img">
            </div>
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.name}</h3>
            <span class="product-price">Rs.${product.price}</span>
            <div class="card-actions">
                <button class="btn" style="flex:1" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn-wish ${isWished ? "active" : ""}" onclick="toggleWishlist(${product.id})"><i class="fas fa-heart"></i></button>
            </div>
        </div>
    `;
}

window.renderShopPage = function (filterCat = "All", searchQuery = "") {
  const grid = document.getElementById("shop-grid");
  if (!grid) return;

  let filtered = products.filter((p) => {
    const catMatch = filterCat === "All" || p.category === filterCat;
    const searchMatch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  grid.innerHTML =
    filtered.map(renderProductCard).join("") || "<p>No products found.</p>";
};

window.renderCartPage = function () {
  const container = document.getElementById("cart-items-container");
  const totalEl = document.getElementById("cart-total-price");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML =
      '<h3>Your cart is empty. <a href="shop.html" style="color:var(--secondary)">Shop Now</a></h3>';
    totalEl.innerText = "$0.00";
    return;
  }

  let total = 0;
  container.innerHTML = cart
    .map((item) => {
      total += item.price * item.quantity;
      return `
        <div class="cart-item">
            <img src="${item.image}">
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p style="color:var(--secondary); font-weight:bold">Rs.${item.price}</p>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="updateQty(${item.id}, -99)">Remove</button>
                </div>
            </div>
        </div>`;
    })
    .join("");
  totalEl.innerText = `Rs.${total.toFixed(2)}`;
};

window.updateQty = function (id, change) {
  const item = cart.find((i) => i.id === id);
  item.quantity += change;
  if (item.quantity <= 0) cart = cart.filter((i) => i.id !== id);
  saveState();
  renderCartPage();
};

window.renderWishlistPage = function () {
  const grid = document.getElementById("wishlist-grid");
  if (!grid) return;
  grid.innerHTML = wishlist.length
    ? wishlist.map(renderProductCard).join("")
    : "<h3>Your wishlist is empty.</h3>";
};

// --- Initialize App ---
document.addEventListener("DOMContentLoaded", () => {
  injectLayout();

  // Page Routing Check
  if (document.getElementById("shop-grid")) {
    renderShopPage();
    document
      .getElementById("search-input")
      .addEventListener("input", (e) => renderShopPage("All", e.target.value));
    document.querySelectorAll(".filter-list li").forEach((li) => {
      li.addEventListener("click", (e) => {
        document
          .querySelectorAll(".filter-list li")
          .forEach((el) => el.classList.remove("active"));
        e.target.classList.add("active");
        renderShopPage(e.target.dataset.cat);
      });
    });
  }
  if (document.getElementById("cart-items-container")) renderCartPage();
  if (document.getElementById("wishlist-grid")) renderWishlistPage();
});
