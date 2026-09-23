/**
 * INFINITYMAX - Wishlist Page Logic
 * Modular Vanilla JavaScript Implementation
 */

let wishlistSortOrder = 'default';

// Initialize sample wishlist items if array is empty for interactive preview
function ensureWishlistItems() {
  if (!State.wishlist || State.wishlist.length === 0) {
    State.wishlist = ['p1', 'p2', 'p4']; // Sample Nike, Hoodie, Apple Watch
    saveWishlist();
  }
}

function renderWishlistApp() {
  const container = document.getElementById('wishlistAppContainer');
  if (!container) return;

  // Retrieve wishlist products from PRODUCTS array
  const wishlistedProducts = State.wishlist
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  // Handle Empty Wishlist State
  if (wishlistedProducts.length === 0) {
    container.innerHTML = `
      <div class="container wishlist-page-wrapper">
        <div class="wishlist-empty-box">
          <div class="wishlist-empty-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">
            YOUR WISHLIST IS EMPTY
          </h2>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 28px; line-height: 1.6;">
            Discover curated drops, luxury sportswear, and tech. Tap the heart icon to save your favorites.
          </p>
          <a href="index.html" class="btn-hero-primary" style="display: inline-flex;">
            EXPLORE NEW ARRIVALS →
          </a>
        </div>

        <!-- RECOMMENDED PRODUCTS -->
        <div style="margin-top: 60px;">
          <h2 style="font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 24px;">
            Trending Drops You Might Like
          </h2>
          <div class="new-arrivals-grid" id="wishlistRecommendedGrid"></div>
        </div>
      </div>
    `;
    renderWishlistRecommended();
    return;
  }

  // Sort products
  let sorted = [...wishlistedProducts];
  if (wishlistSortOrder === 'low-high') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (wishlistSortOrder === 'high-low') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (wishlistSortOrder === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  // Main Wishlist Page View
  container.innerHTML = `
    <div class="container wishlist-page-wrapper">
      
      <!-- WISHLIST HERO BANNER -->
      <div class="wishlist-header-banner">
        <div class="wishlist-title-wrap">
          <h1>
            <span>MY WISHLIST</span>
            <span class="badge-count" style="display: inline-flex; font-size: 0.85rem; padding: 4px 10px;">${sorted.length}</span>
          </h1>
          <p>Your saved architectural silhouettes, luxury footwear, and lifestyle drops.</p>
        </div>

        <div class="wishlist-batch-actions">
          <button class="btn-batch-primary" onclick="moveAllWishlistToBag()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            MOVE ALL TO BAG
          </button>
          <button class="btn-batch-secondary" onclick="confirmClearWishlist()">CLEAR ALL</button>
        </div>
      </div>

      <!-- SORTING & ITEM COUNT BAR -->
      <div class="wishlist-sort-bar">
        <div style="font-size: 0.88rem; color: var(--text-tertiary);">
          Showing <strong style="color: var(--text-primary);">${sorted.length} saved items</strong>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.82rem; color: var(--text-tertiary);">Sort by:</span>
          <select class="wishlist-sort-select" onchange="handleWishlistSort(this.value)">
            <option value="default" ${wishlistSortOrder === 'default' ? 'selected' : ''}>Recently Added</option>
            <option value="low-high" ${wishlistSortOrder === 'low-high' ? 'selected' : ''}>Price: Low to High</option>
            <option value="high-low" ${wishlistSortOrder === 'high-low' ? 'selected' : ''}>Price: High to Low</option>
            <option value="rating" ${wishlistSortOrder === 'rating' ? 'selected' : ''}>Customer Rating</option>
          </select>
        </div>
      </div>

      <!-- WISHLIST GRID -->
      <div class="new-arrivals-grid">
        ${sorted.map(createProductCardHTML).join('')}
      </div>

      <!-- RECOMMENDED PRODUCTS -->
      <div style="margin-top: 64px;">
        <h2 style="font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; color: var(--text-primary); margin-bottom: 24px;">
          Recommended for Your Style
        </h2>
        <div class="new-arrivals-grid" id="wishlistRecommendedGrid"></div>
      </div>

    </div>
  `;

  // Attach card click handlers (Wishlist toggle, Quick View, Add to Bag)
  const gridContainer = container.querySelector('.new-arrivals-grid');
  if (gridContainer && typeof attachCardEventListeners === 'function') {
    attachCardEventListeners(gridContainer);
  }

  renderWishlistRecommended();
}

function handleWishlistSort(val) {
  wishlistSortOrder = val;
  renderWishlistApp();
}

function moveAllWishlistToBag() {
  if (!State.wishlist || State.wishlist.length === 0) return;

  const count = State.wishlist.length;
  State.wishlist.forEach(id => {
    addToCart(id, null, 1);
  });
  State.wishlist = [];
  saveWishlist();
  showToast(`Moved ${count} item(s) to your bag!`);
  renderWishlistApp();
}

function confirmClearWishlist() {
  if (confirm("Are you sure you want to clear your entire wishlist?")) {
    State.wishlist = [];
    saveWishlist();
    showToast("Wishlist cleared");
    renderWishlistApp();
  }
}

function renderWishlistRecommended() {
  const recGrid = document.getElementById('wishlistRecommendedGrid');
  if (!recGrid || typeof PRODUCTS === 'undefined') return;

  // Filter products not currently in wishlist
  const recs = PRODUCTS.filter(p => !State.wishlist.includes(p.id)).slice(0, 4);
  recGrid.innerHTML = recs.map(createProductCardHTML).join('');
  if (typeof attachCardEventListeners === 'function') {
    attachCardEventListeners(recGrid);
  }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
  ensureWishlistItems();
  renderWishlistApp();
});
