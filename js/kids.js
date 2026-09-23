/**
 * INFINITYMAX - Kids Experience Logic (kids.html)
 * Architecture: Modular Vanilla JavaScript
 */

let activeAgeFilter = 'All';
let activeCategoryFilter = 'All';
let currentSort = 'featured';

// Bundle Selection State (Default: pk1 Sneaker, pk3 Tracksuit, pk4 Backpack)
const BundleState = {
  sneaker: { id: 'pk1', size: 'UK 2K' },
  apparel: { id: 'pk3', size: '8Y' },
  backpack: { id: 'pk4', color: 'Bred Red / Matte Black' }
};

document.addEventListener('DOMContentLoaded', () => {
  initKidsPage();
});

function initKidsPage() {
  renderKidsCatalog();
  initAgeTabs();
  initCategoryCards();
  initBundleBuilder();
  initSizeAdvisorModal();
  initKidsSort();
}

// ==========================================================================
// 1. AGE & CATEGORY FILTERING
// ==========================================================================

function initAgeTabs() {
  const tabs = document.querySelectorAll('.age-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeAgeFilter = tab.getAttribute('data-age');
      renderKidsCatalog();
    });
  });
}

function initCategoryCards() {
  const cards = document.querySelectorAll('.kids-cat-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isAlreadyActive = card.classList.contains('active');
      cards.forEach(c => c.classList.remove('active'));
      if (isAlreadyActive) {
        activeCategoryFilter = 'All';
      } else {
        card.classList.add('active');
        activeCategoryFilter = card.getAttribute('data-cat');
      }
      renderKidsCatalog();
    });
  });
}

function initKidsSort() {
  const sortSelect = document.getElementById('kidsSortSelect');
  if (!sortSelect) return;
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderKidsCatalog();
  });
}

// ==========================================================================
// 2. CATALOG RENDERING
// ==========================================================================

function renderKidsCatalog() {
  const grid = document.getElementById('kidsProductsGrid');
  const countEl = document.getElementById('kidsProductCount');
  if (!grid) return;

  // Filter products from global PRODUCTS where category === 'Kids'
  let items = PRODUCTS.filter(p => p.category === 'Kids');

  // Age group filter
  if (activeAgeFilter !== 'All') {
    items = items.filter(p => p.ageGroup === activeAgeFilter);
  }

  // Category filter
  if (activeCategoryFilter !== 'All') {
    items = items.filter(p => p.subCategory === activeCategoryFilter);
  }

  // Sort
  if (currentSort === 'price-low') {
    items.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    items.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    items.sort((a, b) => b.rating - a.rating);
  }

  if (countEl) {
    countEl.textContent = `Showing ${items.length} Kids Style${items.length === 1 ? '' : 's'}`;
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: var(--bg-secondary); border-radius: var(--kids-radius-card); border: 1px dashed var(--border-light);">
        <p style="font-size: 1.1rem; font-weight: 700; color: #ffffff; margin-bottom: 8px;">No matching styles in this age group</p>
        <p style="font-size: 0.9rem; color: var(--text-tertiary); margin-bottom: 20px;">Try switching to "All Ages" to see all available drops.</p>
        <button class="btn-kids-outline" onclick="resetFilters()">VIEW ALL AGES</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(p => {
    const isWishlisted = State.wishlist.includes(p.id);
    return `
      <div class="kid-product-card" data-id="${p.id}">
        <div class="kid-card-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
          ${p.badge ? `<span class="kid-card-badge ${p.badge.includes('AIR') || p.badge.includes('FLEX') ? 'badge-volt' : 'badge-coral'}">${p.badge}</span>` : ''}
          <span class="kid-card-age-tag">${p.ageGroup || 'Youth'}</span>
          <button class="btn-wishlist-toggle ${isWishlisted ? 'active' : ''}" data-id="${p.id}" aria-label="Save to Wishlist">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <div class="kid-card-body">
          <div class="kid-brand-row">
            <span class="kid-brand-name">${p.brand}</span>
            <span style="font-size: 0.72rem; color: var(--kids-cyan); font-weight: 700;">${p.subCategory}</span>
          </div>

          <h3 class="kid-card-title">${p.name}</h3>

          <div class="kid-card-rating">
            <svg class="kid-star" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span style="font-weight: 700; color: #ffffff;">${p.rating}</span>
            <span style="color: var(--text-tertiary);">(${p.reviews})</span>
          </div>

          <div class="kid-card-price-row">
            <span class="kid-current-price">₹${p.price.toLocaleString('en-IN')}</span>
            ${p.originalPrice ? `<span class="kid-orig-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            ${p.discount ? `<span class="kid-discount-pill">${p.discount}</span>` : ''}
          </div>

          <div class="kid-card-actions">
            <button class="btn-kid-bag" onclick="handleKidAddToBag('${p.id}', event)">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              ADD TO BAG
            </button>
            <button class="btn-quick-view" data-id="${p.id}" aria-label="Quick view ${p.name}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  attachCardEventListeners(grid);
}

function resetFilters() {
  activeAgeFilter = 'All';
  activeCategoryFilter = 'All';
  document.querySelectorAll('.age-tab-btn').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-age') === 'All');
  });
  document.querySelectorAll('.kids-cat-card').forEach(c => c.classList.remove('active'));
  renderKidsCatalog();
}

function handleKidAddToBag(productId, event) {
  if (event) {
    fireConfetti(event.clientX, event.clientY);
  }
  addToCart(productId);
}

// ==========================================================================
// 3. PLAYGROUND BUNDLE BUILDER
// ==========================================================================

function initBundleBuilder() {
  const p1 = PRODUCTS.find(p => p.id === BundleState.sneaker.id);
  const p2 = PRODUCTS.find(p => p.id === BundleState.apparel.id);
  const p3 = PRODUCTS.find(p => p.id === BundleState.backpack.id);

  if (!p1 || !p2 || !p3) return;

  const originalTotal = p1.price + p2.price + p3.price;
  const bundleDiscount = 0.20; // 20% bundle discount
  const bundleSavings = Math.round(originalTotal * bundleDiscount);
  const discountedTotal = originalTotal - bundleSavings;

  const origEl = document.getElementById('bundleOrigPrice');
  const finalEl = document.getElementById('bundleFinalPrice');
  const savingsEl = document.getElementById('bundleSavings');

  if (origEl) origEl.textContent = `₹${originalTotal.toLocaleString('en-IN')}`;
  if (finalEl) finalEl.textContent = `₹${discountedTotal.toLocaleString('en-IN')}`;
  if (savingsEl) savingsEl.textContent = `SAVE ₹${bundleSavings.toLocaleString('en-IN')} (20% OFF)`;

  // Size selectors change
  const sneakerSelect = document.getElementById('bundleSneakerSize');
  const apparelSelect = document.getElementById('bundleApparelSize');

  if (sneakerSelect) {
    sneakerSelect.addEventListener('change', (e) => {
      BundleState.sneaker.size = e.target.value;
    });
  }

  if (apparelSelect) {
    apparelSelect.addEventListener('change', (e) => {
      BundleState.apparel.size = e.target.value;
    });
  }

  // 1-Click Bundle Add
  const addBundleBtn = document.getElementById('addBundleBtn');
  if (addBundleBtn) {
    addBundleBtn.addEventListener('click', (e) => {
      fireConfetti(e.clientX, e.clientY);
      
      // Add all 3 items to cart with special bundle price reduction applied proportionally
      const pSneaker = PRODUCTS.find(p => p.id === BundleState.sneaker.id);
      const pApparel = PRODUCTS.find(p => p.id === BundleState.apparel.id);
      const pBackpack = PRODUCTS.find(p => p.id === BundleState.backpack.id);

      const items = [
        { prod: pSneaker, size: BundleState.sneaker.size },
        { prod: pApparel, size: BundleState.apparel.size },
        { prod: pBackpack, size: "18L Standard" }
      ];

      items.forEach(item => {
        if (!item.prod) return;
        const discountedPrice = Math.round(item.prod.price * 0.8);
        const existing = State.cart.find(c => c.id === item.prod.id && c.size === item.size);
        if (existing) {
          existing.quantity += 1;
        } else {
          State.cart.push({
            id: item.prod.id,
            name: `${item.prod.name} (Playground Bundle)`,
            brand: item.prod.brand,
            price: discountedPrice,
            image: item.prod.image,
            size: item.size,
            quantity: 1
          });
        }
      });

      saveCart();
      showToast('🎉 Playground 3-Piece Bundle added to bag! (20% discount applied)');
      openCartDrawer();
    });
  }
}

// ==========================================================================
// 4. INTERACTIVE SIZE & GROWTH ADVISOR MODAL
// ==========================================================================

function initSizeAdvisorModal() {
  const modal = document.getElementById('sizeAdvisorModal');
  const openBtns = document.querySelectorAll('.open-size-advisor-btn');
  const closeBtn = document.getElementById('closeSizeAdvisorBtn');
  const calcBtn = document.getElementById('calcSizeBtn');

  if (!modal) return;

  openBtns.forEach(b => b.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }));

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  });

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const ageInput = document.getElementById('advisorAgeInput');
      const footInput = document.getElementById('advisorFootInput');
      const heightInput = document.getElementById('advisorHeightInput');

      const age = parseInt(ageInput?.value || '6', 10);
      const foot = parseFloat(footInput?.value || '18');
      const height = parseFloat(heightInput?.value || '116');

      // Calculation logic with growth allowance
      let recommendedApparel = '6Y';
      if (age <= 2) recommendedApparel = '2Y (Toddler)';
      else if (age <= 4) recommendedApparel = '4Y (Little Kids)';
      else if (age <= 6) recommendedApparel = '6Y';
      else if (age <= 8) recommendedApparel = '8Y';
      else if (age <= 10) recommendedApparel = '10Y';
      else if (age <= 12) recommendedApparel = '12Y (Big Kids)';
      else recommendedApparel = '14Y - 16Y (Teen S)';

      let recommendedShoe = 'UK 12C';
      if (foot <= 12) recommendedShoe = 'UK 4C - 5C';
      else if (foot <= 14) recommendedShoe = 'UK 6C - 7C';
      else if (foot <= 16) recommendedShoe = 'UK 8C - 9C';
      else if (foot <= 18) recommendedShoe = 'UK 11C - 12C';
      else if (foot <= 20) recommendedShoe = 'UK 1K - 2K';
      else if (foot <= 22) recommendedShoe = 'UK 3K - 4K';
      else recommendedShoe = 'UK 5K+';

      const resBox = document.getElementById('advisorResultBox');
      const appEl = document.getElementById('advisorResultApparel');
      const shoeEl = document.getElementById('advisorResultShoe');

      if (appEl) appEl.textContent = recommendedApparel;
      if (shoeEl) shoeEl.textContent = `${recommendedShoe} (+0.5cm growth margin)`;
      if (resBox) resBox.style.display = 'block';

      showToast(`Recommended: ${recommendedApparel} apparel & ${recommendedShoe} footwear`);
    });
  }
}

// ==========================================================================
// 5. CONFETTI CELEBRATION EFFECT
// ==========================================================================

function fireConfetti(originX, originY) {
  const colors = ['#ccff00', '#ff3366', '#00e5ff', '#ffb703', '#ffffff'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-particle';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = `${originX || window.innerWidth / 2}px`;
    el.style.top = `${originY || window.innerHeight / 2}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 120;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 40;

    el.style.setProperty('--tx', `${tx}px`);
    el.style.setProperty('--ty', `${ty}px`);

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}
