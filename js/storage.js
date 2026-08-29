
const Storage = {
  KEYS: {
    CART: 'luxemart_cart',
    WISHLIST: 'luxemart_wishlist',
    COUPON: 'luxemart_coupon',
    REVIEWS: 'luxemart_user_reviews',
    ORDERS: 'luxemart_orders',
    POPUP_SHOWN: 'luxemart_offer_seen',
    THEME: 'luxemart_theme'
  },

  emitUpdate(event, data) {
    window.dispatchEvent(new CustomEvent(event, { detail: data }));
  },

  getCart() {
    try {
      const data = localStorage.getItem(this.KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
      this.emitUpdate('cartUpdated', cart);
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  },

  addToCart(productId, quantity = 1, selectedColor = null, selectedSize = null) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return { success: false, message: "Product not found" };

    const cart = this.getCart();
    const color = selectedColor || (product.colors && product.colors[0]) || null;
    const colorName = product.colors && product.colorNames ? product.colorNames[product.colors.indexOf(color)] || color : color;
    const size = selectedSize || (product.sizes && product.sizes[0]) || null;

    const existingIndex = cart.findIndex(item => 
      item.id === productId && 
      item.selectedColor === color && 
      item.selectedSize === size
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        selectedColor: color,
        selectedColorName: colorName,
        selectedSize: size,
        quantity: quantity,
        stock: product.stock
      });
    }

    this.saveCart(cart);
    return { success: true, message: `Added "${product.name}" to cart!`, product, cart };
  },

  updateCartQuantity(index, quantity) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = Math.min(quantity, cart[index].stock || 99);
      }
      this.saveCart(cart);
    }
    return cart;
  },

  removeFromCart(index) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1)[0];
      this.saveCart(cart);
      return { success: true, removed };
    }
    return { success: false };
  },

  clearCart() {
    this.saveCart([]);
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  },

  getCartSubtotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  },

  // WISHLIST OPERATIONS
  getWishlist() {
    try {
      const data = localStorage.getItem(this.KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading wishlist', e);
      return [];
    }
  },

  saveWishlist(wishlist) {
    try {
      localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify(wishlist));
      this.emitUpdate('wishlistUpdated', wishlist);
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  },

  isInWishlist(productId) {
    const wishlist = this.getWishlist();
    return wishlist.some(item => (typeof item === 'string' ? item === productId : item.id === productId));
  },

  toggleWishlist(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return { inWishlist: false };

    let wishlist = this.getWishlist();
    const existingIndex = wishlist.findIndex(item => (typeof item === 'string' ? item === productId : item.id === productId));

    let inWishlist = false;
    if (existingIndex > -1) {
      wishlist.splice(existingIndex, 1);
      inWishlist = false;
    } else {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        stock: product.stock,
        rating: product.rating
      });
      inWishlist = true;
    }

    this.saveWishlist(wishlist);
    return { inWishlist, product, wishlist };
  },

  getWishlistCount() {
    return this.getWishlist().length;
  },

  // COUPONS
  getAppliedCoupon() {
    try {
      const data = localStorage.getItem(this.KEYS.COUPON);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  applyCoupon(code) {
    const upper = (code || '').trim().toUpperCase();
    if (DISCOUNT_COUPONS[upper]) {
      const coupon = DISCOUNT_COUPONS[upper];
      localStorage.setItem(this.KEYS.COUPON, JSON.stringify(coupon));
      this.emitUpdate('couponApplied', coupon);
      return { success: true, coupon, message: `Coupon "${upper}" applied successfully!` };
    }
    return { success: false, message: "Invalid coupon code. Try 'SAVE20' or 'WELCOME10'." };
  },

  removeCoupon() {
    localStorage.removeItem(this.KEYS.COUPON);
    this.emitUpdate('couponRemoved', null);
  },

  // USER REVIEWS
  getUserReviews(productId) {
    try {
      const allReviews = JSON.parse(localStorage.getItem(this.KEYS.REVIEWS) || '{}');
      return allReviews[productId] || [];
    } catch (e) {
      return [];
    }
  },

  addUserReview(productId, review) {
    try {
      const allReviews = JSON.parse(localStorage.getItem(this.KEYS.REVIEWS) || '{}');
      if (!allReviews[productId]) allReviews[productId] = [];
      allReviews[productId].unshift({
        name: review.name || 'Verified Buyer',
        rating: Number(review.rating) || 5,
        date: new Date().toISOString().split('T')[0],
        comment: review.comment
      });
      localStorage.setItem(this.KEYS.REVIEWS, JSON.stringify(allReviews));
      this.emitUpdate('reviewAdded', { productId, review });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  // ORDERS
  getOrders() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.ORDERS) || '[]');
    } catch (e) {
      return [];
    }
  },

  saveOrder(order) {
    try {
      const orders = this.getOrders();
      orders.unshift(order);
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
      return order;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};
