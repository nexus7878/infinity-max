/**
 * INFINITYMAX - Order Success & Order Tracking Engine
 * Modular Vanilla JavaScript Implementation
 */

// ==========================================================================
// 1. MOCK DATA MODEL FOR ORDERS
// ==========================================================================

const DEFAULT_ORDER = {
  orderNumber: "PU-2026-10482",
  status: "PACKED", // ORDER_PLACED | CONFIRMED | PACKED | SHIPPED | OUT_FOR_DELIVERY | DELIVERED | CANCELLED | RETURNED
  orderDate: "15 September 2026",
  orderTime: "10:42 AM",
  estimatedDelivery: "18–20 September 2026",
  carrier: "Delhivery Express Logistics",
  trackingId: "TRK458291047",
  paymentStatus: "Paid",
  paymentMethod: "UPI (Google Pay)",
  paymentCardMask: "UPI ID: user@okaxis",
  transactionId: "TXN2026091510482",
  address: {
    name: "NOVA",
    street: "123 Example Street, Suite 4B",
    locality: "Vasant Kunj",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110070",
    country: "India",
    phone: "+91 98765 43210"
  },
  items: [
    {
      id: "p1",
      name: "Nike Air Force 1 '07",
      brand: "Nike",
      category: "Sneakers",
      price: 9695,
      originalPrice: 10995,
      quantity: 1,
      variant: "Triple White / Pure Platinum",
      size: "UK 9",
      image: "assets/products/addidascampus00s.webp"
    },
    {
      id: "p4",
      name: "Apple Watch Series 10 (GPS + Cellular)",
      brand: "Apple",
      category: "Tech",
      price: 41900,
      originalPrice: 46900,
      quantity: 1,
      variant: "Jet Black Aluminium",
      size: "46mm",
      image: "assets/banners/campaign_tech_editorial_1789480985992.jpg"
    },
    {
      id: "p3",
      name: "boAt Rockerz 550 Wireless Over-Ear",
      brand: "boAt",
      category: "Tech",
      price: 3999,
      originalPrice: 5999,
      quantity: 1,
      variant: "Matte Black",
      size: "Standard",
      image: "assets/products/boatheadphones.jpg"
    }
  ],
  pricing: {
    subtotal: 55594,
    discount: 5000,
    delivery: 0,
    taxes: 2499,
    total: 53093
  },
  timeline: [
    {
      stepKey: "ORDER_PLACED",
      title: "ORDER PLACED",
      date: "15 Sep 2026",
      time: "10:42 AM",
      location: "New Delhi",
      description: "Your order has been successfully placed and received by our system.",
      completed: true
    },
    {
      stepKey: "CONFIRMED",
      title: "CONFIRMED",
      date: "15 Sep 2026",
      time: "10:45 AM",
      location: "New Delhi Central Hub",
      description: "Payment confirmed via Google Pay. Order verified and queued for dispatch.",
      completed: true
    },
    {
      stepKey: "PACKED",
      title: "PACKED",
      date: "16 Sep 2026",
      time: "02:18 PM",
      location: "Delhi Fulfillment Center",
      description: "Items quality-inspected, customized gift package sealed, and barcoded for logistics.",
      completed: true
    },
    {
      stepKey: "SHIPPED",
      title: "SHIPPED",
      date: "17 Sep 2026",
      time: "08:30 AM",
      location: "In Transit — Delhi Regional Sorting Hub",
      description: "Package handed over to courier partner. Transit tracking active.",
      completed: false
    },
    {
      stepKey: "OUT_FOR_DELIVERY",
      title: "OUT FOR DELIVERY",
      date: "18 Sep 2026",
      time: "Expected 09:00 AM",
      location: "Local Destination Facility",
      description: "Delivery executive assigned. Package out on route to your address.",
      completed: false
    },
    {
      stepKey: "DELIVERED",
      title: "DELIVERED",
      date: "18 Sep 2026",
      time: "Expected 02:00 PM",
      location: "Destination Address",
      description: "Package delivered safely to recipient.",
      completed: false
    }
  ],
  cancelledData: {
    refundStatus: "Initiated to Original Payment Source",
    refundAmount: 53093,
    cancelDate: "16 Sep 2026",
    reason: "Requested by customer prior to shipment dispatch"
  },
  returnTimeline: [
    { title: "Return Requested", date: "19 Sep 2026 • 11:30 AM", desc: "Return request submitted for Nike Air Force 1 '07 (Size issue).", done: true },
    { title: "Pickup Scheduled", date: "20 Sep 2026 • 10:00 AM - 02:00 PM", desc: "Courier partner assigned for doorstep pickup.", done: true },
    { title: "Item Picked Up", date: "20 Sep 2026 • 01:15 PM", desc: "Package handed over to pickup executive.", done: true },
    { title: "Quality Check", date: "21 Sep 2026 • 04:00 PM", desc: "Item arrived at warehouse and passed 10-point authenticity & condition check.", done: true },
    { title: "Refund Initiated", date: "21 Sep 2026 • 04:30 PM", desc: "Refund of ₹9,695 processed to original UPI account.", done: true },
    { title: "Refund Completed", date: "22 Sep 2026 • 09:10 AM", desc: "Transaction confirmed by bank. UTR: 42618290412.", done: true }
  ]
};

// State Store
let currentOrder = JSON.parse(localStorage.getItem('infinitymax_currentOrder') || JSON.stringify(DEFAULT_ORDER));
let activeView = 'success'; // 'success' | 'tracking'
let engineState = 'normal'; // 'normal' | 'loading' | 'error' | 'not_found'

// ==========================================================================
// 2. ORDER STATUS ENGINE CORE RENDERER
// ==========================================================================

function renderOrderApp() {
  const container = document.getElementById('orderAppContainer');
  if (!container) return;

  // Render URL params check
  const urlParams = new URLSearchParams(window.location.search);
  const statusParam = urlParams.get('status');
  const viewParam = urlParams.get('view');
  const stateParam = urlParams.get('state');

  if (statusParam && isValidStatus(statusParam)) {
    currentOrder.status = statusParam.toUpperCase();
  }
  if (viewParam === 'tracking') {
    activeView = 'tracking';
  }
  if (stateParam) {
    engineState = stateParam;
  }

  // Handle engine states (Loading / Error / Not Found)
  if (engineState === 'loading') {
    renderLoadingSkeleton(container);
    return;
  }
  if (engineState === 'error') {
    renderErrorState(container);
    return;
  }
  if (engineState === 'not_found') {
    renderNotFoundState(container);
    return;
  }

  // Handle Main Normal Order Render
  renderMainOrderView(container);
}

function isValidStatus(status) {
  const valid = ['ORDER_PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RETURNED'];
  return valid.includes(status.toUpperCase());
}

function setOrderStatus(newStatus) {
  engineState = 'normal';
  if (newStatus === 'LOADING') {
    engineState = 'loading';
  } else if (newStatus === 'ERROR') {
    engineState = 'error';
  } else if (newStatus === 'NOT_FOUND') {
    engineState = 'not_found';
  } else {
    currentOrder.status = newStatus;
  }
  saveCurrentOrder();
  renderOrderApp();
}

function saveCurrentOrder() {
  localStorage.setItem('infinitymax_currentOrder', JSON.stringify(currentOrder));
}

// ==========================================================================
// 3. MAIN ORDER VIEW RENDERER
// ==========================================================================

function renderMainOrderView(container) {
  const isCancelled = currentOrder.status === 'CANCELLED';
  const isReturned = currentOrder.status === 'RETURNED';

  container.innerHTML = `
    <!-- DEMO STATE SWITCHER TOOLBAR -->
    <div class="demo-switcher-wrap">
      <div class="container demo-switcher-inner">
        <div class="demo-switcher-label">
          <span>Order State Switcher</span>
        </div>
        <div class="demo-btns-group">
          <button class="demo-btn ${currentOrder.status === 'ORDER_PLACED' && engineState === 'normal' ? 'active' : ''}" onclick="setOrderStatus('ORDER_PLACED')">Placed</button>
          <button class="demo-btn ${currentOrder.status === 'CONFIRMED' && engineState === 'normal' ? 'active' : ''}" onclick="setOrderStatus('CONFIRMED')">Confirmed</button>
          <button class="demo-btn ${currentOrder.status === 'PACKED' && engineState === 'normal' ? 'active' : ''}" onclick="setOrderStatus('PACKED')">Packed</button>
          <button class="demo-btn ${currentOrder.status === 'SHIPPED' && engineState === 'normal' ? 'active' : ''}" onclick="setOrderStatus('SHIPPED')">Shipped</button>
          <button class="demo-btn ${currentOrder.status === 'OUT_FOR_DELIVERY' && engineState === 'normal' ? 'active' : ''}" onclick="setOrderStatus('OUT_FOR_DELIVERY')">Out for Delivery</button>
          <button class="demo-btn ${currentOrder.status === 'DELIVERED' && engineState === 'normal' ? 'active' : ''}" onclick="setOrderStatus('DELIVERED')">Delivered</button>
          <button class="demo-btn demo-btn-cancelled ${currentOrder.status === 'CANCELLED' && engineState === 'normal' ? 'active' : ''}" onclick="setOrderStatus('CANCELLED')">Cancelled</button>
          <button class="demo-btn demo-btn-returned ${currentOrder.status === 'RETURNED' && engineState === 'normal' ? 'active' : ''}" onclick="setOrderStatus('RETURNED')">Returned</button>
          <button class="demo-btn ${engineState === 'loading' ? 'active' : ''}" onclick="setOrderStatus('LOADING')">Skeleton Loading</button>
          <button class="demo-btn ${engineState === 'error' ? 'active' : ''}" onclick="setOrderStatus('ERROR')">Error</button>
          <button class="demo-btn ${engineState === 'not_found' ? 'active' : ''}" onclick="setOrderStatus('NOT_FOUND')">Not Found</button>
        </div>
      </div>
    </div>

    <div class="container order-page-wrapper">
      
      <!-- HERO SECTION -->
      ${renderHeroSection(isCancelled, isReturned)}

      <!-- SPECIAL STATE BANNERS (IF CANCELLED OR RETURNED) -->
      ${isCancelled ? renderCancelledBanner() : ''}
      ${isReturned ? renderReturnedBanner() : ''}

      <!-- STATUS SUMMARY CARD -->
      ${renderStatusSummaryCard()}

      <!-- 3-POINT AUTHENTICITY & TRANSIT GUARANTEE SEAL -->
      ${renderTrustSealCard()}

      <!-- DELIVERY PROGRESS TIMELINE (IF NOT CANCELLED) -->
      ${!isCancelled ? renderTimelineSection() : ''}

      <!-- DETAILED LOGS (IF TRACKING VIEW IS ACTIVE AND NOT CANCELLED) -->
      ${activeView === 'tracking' && !isCancelled ? renderDetailedTrackingLog() : ''}

      <!-- MAIN 2-COLUMN LAYOUT -->
      <div class="order-grid-layout">

        <!-- LEFT COLUMN: ITEMS, ADDRESS, DELIVERY INFO -->
        <div class="order-col-main">
          
          <!-- ORDER ITEMS CARD -->
          <div class="order-card-box">
            <div class="card-title-head">
              <span>Order Items (${currentOrder.items.length})</span>
              <span style="font-size: 0.85rem; color: var(--text-tertiary);">Order #${currentOrder.orderNumber}</span>
            </div>
            <div class="order-items-list">
              ${currentOrder.items.map(item => `
                <div class="order-item-row">
                  <div class="order-item-img-wrap">
                    <!-- PRODUCT IMAGE RULE: OBJECT-FIT CONTAIN PRESERVES NATURAL PROPORTIONS -->
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                  </div>
                  <div class="order-item-details">
                    <div class="order-item-brand">${item.brand}</div>
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-specs">
                      <span class="spec-chip">Variant: ${item.variant}</span>
                      <span class="spec-chip">Size: ${item.size}</span>
                      <span class="spec-chip">Qty: ${item.quantity}</span>
                    </div>
                  </div>
                  <div class="order-item-price-wrap">
                    <div class="order-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
                    <div class="order-item-qty">Qty: ${item.quantity}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- DESKTOP / MAIN CARDS: ADDRESS & DELIVERY -->
          <div class="info-row-grid">
            
            <!-- ADDRESS CARD -->
            <div class="order-card-box">
              <div class="card-title-head">
                <span>Delivery Address</span>
                ${canEditAddress() ? `
                  <button class="btn-hero-secondary" style="padding: 4px 12px; font-size: 0.75rem;" onclick="openAddressModal()">Change</button>
                ` : ''}
              </div>
              <div class="card-text-body">
                <strong>${currentOrder.address.name}</strong><br>
                ${currentOrder.address.street}<br>
                ${currentOrder.address.locality}, ${currentOrder.address.city}<br>
                ${currentOrder.address.state} — ${currentOrder.address.pincode}<br>
                ${currentOrder.address.country}<br>
                <div style="margin-top: 8px; font-size: 0.82rem; color: var(--text-secondary);">
                  <strong>Phone:</strong> ${currentOrder.address.phone}
                </div>
                ${!canEditAddress() && !isCancelled ? `
                  <div class="address-locked-badge">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Address locked (Shipment in transit)
                  </div>
                ` : ''}
              </div>
            </div>

            <!-- DELIVERY INFO CARD -->
            <div class="order-card-box">
              <div class="card-title-head">
                <span>Delivery Info</span>
              </div>
              <div class="card-text-body">
                <div class="card-label-small">Estimated Delivery</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: var(--accent-green); margin-bottom: 12px;">
                  ${currentOrder.estimatedDelivery}
                </div>
                <div class="card-label-small">Carrier Partner</div>
                <div style="font-weight: 600; margin-bottom: 8px;">${currentOrder.carrier}</div>
                <div class="card-label-small">Tracking ID</div>
                <div style="font-family: monospace; font-size: 0.88rem; color: var(--text-secondary); background: var(--bg-surface); padding: 4px 8px; border-radius: 4px; display: inline-block;">
                  ${currentOrder.trackingId}
                </div>
              </div>
            </div>

          </div>

        </div>

        <!-- RIGHT COLUMN: ACTIONS, PRICE BREAKDOWN, PAYMENT, HELP -->
        <div class="order-col-sidebar">
          
          <!-- ORDER ACTIONS STACK -->
          <div class="order-card-box">
            <div class="card-title-head">
              <span>Order Actions</span>
            </div>
            <div class="action-buttons-stack">
              ${renderOrderActions(isCancelled, isReturned)}
            </div>
          </div>

          <!-- PRICE SUMMARY CARD -->
          <div class="order-card-box">
            <div class="card-title-head">
              <span>Price Summary</span>
              <span class="status-pill status-pill-confirmed" style="font-size: 0.68rem; padding: 2px 8px;">${currentOrder.paymentStatus}</span>
            </div>

            ${currentOrder.pricing.discount > 0 ? `
              <div class="savings-highlight-box">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span>🎉 You saved ₹${currentOrder.pricing.discount.toLocaleString('en-IN')} on this order!</span>
              </div>
            ` : ''}

            <div style="margin-bottom: 12px;">
              <div class="summary-line-item">
                <span>Subtotal</span>
                <span>₹${currentOrder.pricing.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div class="summary-line-item">
                <span>Discount</span>
                <span class="discount-text">-₹${currentOrder.pricing.discount.toLocaleString('en-IN')}</span>
              </div>
              <div class="summary-line-item">
                <span>Delivery Charge</span>
                <span style="color: var(--accent-green); font-weight: 600;">FREE</span>
              </div>
              <div class="summary-line-item">
                <span>Estimated Taxes (GST)</span>
                <span>₹${currentOrder.pricing.taxes.toLocaleString('en-IN')}</span>
              </div>
              <div class="summary-line-item total-line">
                <span>Total Paid</span>
                <span>₹${currentOrder.pricing.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div class="payment-method-pill">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              <span>${currentOrder.paymentMethod}</span>
            </div>
          </div>

          <!-- PAYMENT DETAILS CARD -->
          <div class="order-card-box">
            <div class="card-title-head">
              <span>Payment Details</span>
            </div>
            <div class="card-text-body">
              <div class="card-label-small">Payment Method</div>
              <div style="font-weight: 600; margin-bottom: 8px;">${currentOrder.paymentMethod}</div>
              <div class="card-label-small">Account Mask</div>
              <div style="font-family: monospace; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">${currentOrder.paymentCardMask}</div>
              <div class="card-label-small">Transaction ID</div>
              <div style="font-family: monospace; font-size: 0.82rem; color: var(--text-tertiary); margin-bottom: 8px;">${currentOrder.transactionId}</div>
              <div class="card-label-small">Payment Date</div>
              <div style="font-size: 0.85rem; color: var(--text-secondary);">${currentOrder.orderDate}</div>
            </div>
          </div>

          <!-- NEED HELP CARD -->
          <div class="support-card">
            <div class="support-head">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>Need Help with Order?</span>
            </div>
            <div class="support-sub">
              Our 24/7 dedicated concierges are available to assist with shipment changes, tracking, or inquiries.
            </div>
            <div class="support-links-group">
              <button class="btn-hero-secondary" style="padding: 8px 16px; font-size: 0.78rem;" onclick="showToast('Connecting to 24/7 Support Agent...')">Contact Support</button>
              <button class="btn-hero-secondary" style="padding: 8px 16px; font-size: 0.78rem;" onclick="showToast('Opening Shipping FAQs...')">View FAQs</button>
            </div>
          </div>

        </div>

      </div>

      <!-- CONTINUE SHOPPING BANNER CTA -->
      <div class="order-card-box" style="margin-top: 48px; text-align: center; padding: 40px 24px; background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);">
        <h3 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
          Ready for your next find?
        </h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 24px;">
          Explore latest drops, exclusive collections, and top brands.
        </p>
        <a href="index.html" class="btn-hero-primary" style="display: inline-flex;">
          CONTINUE SHOPPING →
        </a>
      </div>

      <!-- RECOMMENDED PRODUCTS (YOU MAY ALSO LIKE) -->
      <div style="margin-top: 56px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
          <h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: var(--text-primary);">
            You May Also Like
          </h2>
          <span style="font-size: 0.85rem; color: var(--text-tertiary);">Curated for your style</span>
        </div>
        <div class="new-arrivals-grid" id="recommendedProductsGrid">
          <!-- Rendered via JS -->
        </div>
      </div>

      <!-- TRACK ANOTHER ORDER SEARCH FORM -->
      <div class="order-search-section">
        <h3 style="font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
          Track Another Order
        </h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">
          Enter your order number to check live delivery progress.
        </p>
        <form onsubmit="handleSearchOrder(event)" class="search-form-row">
          <input type="text" id="orderSearchInput" class="search-input-field" placeholder="e.g. PU-2026-10482" required>
          <button type="submit" class="btn-hero-primary" style="border-radius: var(--radius-md); padding: 14px 24px;">
            TRACK ORDER
          </button>
        </form>
      </div>

    </div>
  `;

  // Render recommended products grid
  renderRecommendedProducts();
}

// ==========================================================================
// 4. HERO SECTION & TRUST SEAL RENDERERS
// ==========================================================================

function copyOrderNumber() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(currentOrder.orderNumber).then(() => {
      showToast(`Order #${currentOrder.orderNumber} copied to clipboard!`);
    }).catch(() => {
      showToast(`Order #${currentOrder.orderNumber}`);
    });
  } else {
    showToast(`Order #${currentOrder.orderNumber}`);
  }
}

function copyOrderLink() {
  const url = `${window.location.origin}${window.location.pathname}?orderId=${currentOrder.orderNumber}&status=${currentOrder.status}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Direct tracking link copied to clipboard!');
    }).catch(() => {
      showToast(`Tracking link copied`);
    });
  } else {
    showToast(`Tracking link copied`);
  }
}

function renderTrustSealCard() {
  return `
    <div class="trust-seal-card">
      <div class="seal-grid">
        <div class="seal-item">
          <div class="seal-icon-box">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <div class="seal-title">100% Authentic Product</div>
            <div class="seal-sub">Directly verified from brand partner vaults</div>
          </div>
        </div>

        <div class="seal-item">
          <div class="seal-icon-box">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <div>
            <div class="seal-title">Insured Transit</div>
            <div class="seal-sub">Full doorstep loss & damage protection</div>
          </div>
        </div>

        <div class="seal-item">
          <div class="seal-icon-box">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
          </div>
          <div>
            <div class="seal-title">7-Day Easy Returns</div>
            <div class="seal-sub">Hassle-free doorstep pickup guarantee</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderHeroSection(isCancelled, isReturned) {
  if (isCancelled) {
    return `
      <div class="order-success-hero" style="border-color: rgba(239, 68, 68, 0.3);">
        <div class="success-icon-wrap" style="background: rgba(239, 68, 68, 0.12); border-color: rgba(239, 68, 68, 0.3); color: var(--accent-red);">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <div class="hero-status-tag" style="color: var(--accent-red); border-color: rgba(239, 68, 68, 0.3);">
          ORDER CANCELLED
        </div>
        <h1 class="order-hero-title">ORDER CANCELLED</h1>
        <p class="order-hero-subhead">
          Order #${currentOrder.orderNumber} was cancelled. Your refund has been initiated to your original payment method.
        </p>
        <div class="hero-cta-group">
          <a href="index.html" class="btn-hero-primary">CONTINUE SHOPPING</a>
          <button class="btn-hero-secondary" onclick="openInvoiceModal()">VIEW CANCELLATION RECEIPT</button>
        </div>
      </div>
    `;
  }

  if (isReturned) {
    return `
      <div class="order-success-hero" style="border-color: rgba(234, 88, 12, 0.3);">
        <div class="success-icon-wrap" style="background: rgba(234, 88, 12, 0.12); border-color: rgba(234, 88, 12, 0.3); color: var(--accent-orange);">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
        </div>
        <div class="hero-status-tag" style="color: var(--accent-orange); border-color: rgba(234, 88, 12, 0.3);">
          RETURN IN PROGRESS
        </div>
        <h1 class="order-hero-title">RETURN REQUESTED</h1>
        <p class="order-hero-subhead">
          Your return for Order #${currentOrder.orderNumber} is actively being processed. Pickup and refund updates are listed below.
        </p>
        <div class="hero-cta-group">
          <button class="btn-hero-primary" onclick="toggleTrackingView()">TRACK RETURN LOG →</button>
          <a href="index.html" class="btn-hero-secondary">CONTINUE SHOPPING</a>
        </div>
      </div>
    `;
  }

  const isPreShipment = ['ORDER_PLACED', 'CONFIRMED', 'PACKED'].includes(currentOrder.status);

  // Default Confirmed / In-Progress Hero
  return `
    <div class="order-success-hero">
      <div class="success-icon-wrap">
        <svg class="checkmark-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      ${isPreShipment ? `
        <div class="dispatch-ticker-pill">
          ⚡ Dispatches in 03h 45m • Express Hub
        </div>
      ` : `
        <div class="hero-status-tag">
          ● CONFIRMED & IN TRANSIT
        </div>
      `}

      <h1 class="order-hero-title">ORDER CONFIRMED</h1>
      <p class="order-hero-subhead">
        Thank you for your order. We've received it and we're getting it ready with premium care.
      </p>

      <div class="hero-order-meta">
        <div class="meta-item">
          <span class="meta-label">Order Number</span>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="meta-value">#${currentOrder.orderNumber}</span>
            <button class="btn-utility-sm" onclick="copyOrderNumber()" title="Copy Order Number">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="meta-divider"></div>
        <div class="meta-item">
          <span class="meta-label">Placed Date</span>
          <span class="meta-value">${currentOrder.orderDate}</span>
        </div>
        <div class="meta-divider"></div>
        <div class="meta-item">
          <span class="meta-label">Expected Delivery</span>
          <span class="meta-value" style="color: var(--accent-green);">${currentOrder.estimatedDelivery}</span>
        </div>
      </div>

      <div class="hero-cta-group">
        <button class="btn-hero-primary" onclick="toggleTrackingView()">
          ${activeView === 'tracking' ? 'HIDE TRACKING LOGS' : 'TRACK ORDER →'}
        </button>
        <button class="btn-hero-secondary" onclick="copyOrderLink()">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          SHARE TRACKING
        </button>
      </div>
    </div>
  `;
}

// ==========================================================================
// 5. STATUS SUMMARY CARD RENDERER
// ==========================================================================

function renderStatusSummaryCard() {
  const statusInfoMap = {
    ORDER_PLACED: { text: "Order Placed", desc: "Order details recorded, awaiting verification.", class: "status-pill-placed" },
    CONFIRMED: { text: "Order Confirmed", desc: "Payment verified. Preparing for dispatch.", class: "status-pill-confirmed" },
    PACKED: { text: "Preparing to Ship", desc: "Package packed and waiting for carrier pickup.", class: "status-pill-packed" },
    SHIPPED: { text: "In Transit", desc: "Package handed to carrier partner and on the move.", class: "status-pill-shipped" },
    OUT_FOR_DELIVERY: { text: "Out For Delivery", desc: "Delivery executive is en route to your address.", class: "status-pill-out_for_delivery" },
    DELIVERED: { text: "Delivered", desc: "Package delivered safely to destination.", class: "status-pill-delivered" },
    CANCELLED: { text: "Order Cancelled", desc: "Order was cancelled and refund processed.", class: "status-pill-cancelled" },
    RETURNED: { text: "Return Requested", desc: "Return process initiated and scheduled for pickup.", class: "status-pill-returned" }
  };

  const current = statusInfoMap[currentOrder.status] || statusInfoMap.PACKED;

  return `
    <div class="status-summary-card">
      <div class="summary-card-left">
        <div class="summary-card-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
        </div>
        <div class="summary-card-info">
          <h2>${current.text}</h2>
          <p>${current.desc}</p>
        </div>
      </div>
      <div>
        <span class="status-pill ${current.class}">${currentOrder.status.replace(/_/g, ' ')}</span>
      </div>
    </div>
  `;
}

// ==========================================================================
// 6. DELIVERY PROGRESS TIMELINE & ROUTE MAP
// ==========================================================================

function copyTrackingId(id) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(id).then(() => {
      showToast(`Tracking ID ${id} copied to clipboard!`);
    }).catch(() => {
      showToast(`Tracking ID: ${id}`);
    });
  } else {
    showToast(`Tracking ID: ${id}`);
  }
}

function renderRouteMapGraphic() {
  const stepsKeys = ['ORDER_PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const currentIndex = stepsKeys.indexOf(currentOrder.status);
  let progressPct = 0;
  if (currentIndex >= 0) {
    progressPct = (currentIndex / (stepsKeys.length - 1)) * 100;
  }

  return `
    <div class="route-map-card">
      <div class="map-header-row">
        <div class="map-header-title">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
            <line x1="8" y1="2" x2="8" y2="18"/>
            <line x1="16" y1="6" x2="16" y2="22"/>
          </svg>
          <span>Live Route Logistics Tracker</span>
        </div>
        <div class="map-live-pulse">
          ● Live Feed Active
        </div>
      </div>

      <div class="map-graphic-wrap">
        <div class="map-bg-grid"></div>
        <div class="map-route-line-back"></div>
        <div class="map-route-line-progress" style="width: calc(${progressPct}% * 0.8 + 20px);"></div>

        <div class="map-node-point ${currentIndex >= 0 ? 'active' : ''}">
          <div class="map-node-dot">🏭</div>
          <div class="map-node-label">Origin Hub</div>
        </div>

        <div class="map-node-point ${currentIndex >= 2 ? 'active' : ''}">
          <div class="map-node-dot">📦</div>
          <div class="map-node-label">Fulfillment</div>
        </div>

        <div class="map-node-point ${currentIndex >= 3 ? 'active' : ''}">
          <div class="map-node-dot">🚚</div>
          <div class="map-node-label">Transit</div>
        </div>

        <div class="map-node-point ${currentIndex >= 5 ? 'active' : ''}">
          <div class="map-node-dot">🏠</div>
          <div class="map-node-label">Destination</div>
        </div>
      </div>
    </div>
  `;
}

function renderTimelineSection() {
  const stepsKeys = ['ORDER_PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const currentIndex = stepsKeys.indexOf(currentOrder.status);

  // Compute progress line width percentage
  let progressPct = 0;
  if (currentIndex >= 0) {
    progressPct = (currentIndex / (stepsKeys.length - 1)) * 100;
  }

  return `
    ${renderRouteMapGraphic()}

    <div class="timeline-card">
      <div class="timeline-card-header">
        <div class="timeline-title">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>Delivery Timeline</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.82rem; color: var(--text-tertiary);">Tracking ID:</span>
          <button class="copy-trk-btn" onclick="copyTrackingId('${currentOrder.trackingId}')" title="Click to copy tracking ID">
            <span>${currentOrder.trackingId}</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- DESKTOP HORIZONTAL TIMELINE -->
      <div class="timeline-horizontal">
        <div class="timeline-track-line">
          <div class="timeline-progress-fill" style="width: ${progressPct}%;"></div>
        </div>

        ${currentOrder.timeline.map((st, idx) => {
          let stepClass = 'upcoming';
          if (idx < currentIndex) stepClass = 'completed';
          else if (idx === currentIndex) stepClass = 'current';

          return `
            <div class="timeline-step ${stepClass}">
              <div class="step-node">
                ${stepClass === 'completed' ? `
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ` : `<span>${idx + 1}</span>`}
              </div>
              <div class="step-name">${st.title}</div>
              <div class="step-date">${st.date}</div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- MOBILE VERTICAL TIMELINE -->
      <div class="timeline-vertical">
        ${currentOrder.timeline.map((st, idx) => {
          let stepClass = 'upcoming';
          if (idx < currentIndex) stepClass = 'completed';
          else if (idx === currentIndex) stepClass = 'current';

          return `
            <div class="v-step ${stepClass}">
              <div class="v-node">
                ${stepClass === 'completed' ? '✓' : idx + 1}
              </div>
              <div class="v-step-title">${st.title}</div>
              <div class="v-step-meta">${st.date} • ${st.time}</div>
              <div class="v-step-desc">${st.description}</div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// ==========================================================================
// 7. DETAILED TRACKING LOGS VIEW
// ==========================================================================

function renderDetailedTrackingLog() {
  return `
    <div class="tracking-log-card">
      <div class="card-title-head">
        <span>Live Shipment Activity Log</span>
        <span style="font-size: 0.8rem; color: var(--accent-green);">● Active Feed</span>
      </div>
      <div class="log-event-list">
        ${currentOrder.timeline.filter(e => e.completed || currentOrder.status === e.stepKey).map(evt => `
          <div class="log-event-item ${currentOrder.status === evt.stepKey ? 'active' : ''}">
            <div class="log-event-dot"></div>
            <div class="log-header-row">
              <span class="log-status-title">${evt.title}</span>
              <span class="log-timestamp">${evt.date} • ${evt.time}</span>
            </div>
            <div class="log-location-text">📍 ${evt.location}</div>
            <div class="log-desc-text">${evt.description}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================================================
// 8. SPECIAL BANNERS (CANCELLED & RETURNED)
// ==========================================================================

function renderCancelledBanner() {
  return `
    <div class="special-state-banner banner-cancelled">
      <div class="banner-title">
        <span>Order Cancelled</span>
      </div>
      <div class="banner-desc">
        ${currentOrder.cancelledData.reason}. A refund has been automatically triggered to your original account.
      </div>
      <div class="refund-info-box">
        <div>
          <div class="card-label-small">Refund Status</div>
          <strong style="color: var(--accent-green);">${currentOrder.cancelledData.refundStatus}</strong>
        </div>
        <div>
          <div class="card-label-small">Refund Amount</div>
          <strong style="font-size: 1.1rem; color: var(--text-primary);">₹${currentOrder.cancelledData.refundAmount.toLocaleString('en-IN')}</strong>
        </div>
        <div>
          <div class="card-label-small">Cancellation Date</div>
          <span style="font-size: 0.88rem; color: var(--text-secondary);">${currentOrder.cancelledData.cancelDate}</span>
        </div>
      </div>
    </div>
  `;
}

function renderReturnedBanner() {
  return `
    <div class="special-state-banner banner-returned">
      <div class="banner-title">
        <span>Return Progress & Pickup Schedule</span>
      </div>
      <div class="banner-desc">
        Your item pickup and quality check workflow is active.
      </div>
      <div class="log-event-list" style="margin-top: 20px;">
        ${currentOrder.returnTimeline.map(item => `
          <div class="log-event-item active">
            <div class="log-event-dot" style="background: var(--accent-orange); border-color: var(--accent-orange);"></div>
            <div class="log-header-row">
              <span class="log-status-title" style="color: var(--text-primary);">${item.title}</span>
              <span class="log-timestamp">${item.date}</span>
            </div>
            <div class="log-desc-text">${item.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================================================
// 9. ORDER ACTIONS RENDERER
// ==========================================================================

function renderOrderActions(isCancelled, isReturned) {
  if (isCancelled) {
    return `
      <a href="index.html" class="btn-action btn-action-primary">Re-Order Items</a>
      <button class="btn-action btn-action-outline" onclick="openInvoiceModal()">Download Cancellation Receipt</button>
    `;
  }

  if (isReturned) {
    return `
      <button class="btn-action btn-action-primary" onclick="openInvoiceModal()">Download Return Receipt</button>
      <button class="btn-action btn-action-outline" onclick="showToast('Connecting to Return HelpDesk...')">Return Support</button>
    `;
  }

  if (currentOrder.status === 'DELIVERED') {
    return `
      <button class="btn-action btn-action-primary" onclick="openReturnModal()">Return or Exchange Item</button>
      <button class="btn-action btn-action-outline" onclick="openInvoiceModal()">Download Official Invoice</button>
      <button class="btn-action btn-action-outline" onclick="showToast('Opening Review Modal...')">Write a Product Review</button>
    `;
  }

  // Pre-shipment (PLACED / CONFIRMED / PACKED) vs In-Transit (SHIPPED / OUT_FOR_DELIVERY)
  const canCancel = canEditAddress();

  return `
    <button class="btn-action btn-action-primary" onclick="toggleTrackingView()">
      ${activeView === 'tracking' ? 'View Order Summary' : 'Track Package Details'}
    </button>
    <button class="btn-action btn-action-outline" onclick="openInvoiceModal()">Download Invoice</button>
    ${canCancel ? `
      <button class="btn-action btn-action-danger" onclick="openCancelModal()">Cancel Order</button>
    ` : ''}
  `;
}

function canEditAddress() {
  const lockedStatuses = ['SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RETURNED'];
  return !lockedStatuses.includes(currentOrder.status);
}

function toggleTrackingView() {
  activeView = activeView === 'tracking' ? 'success' : 'tracking';
  renderOrderApp();
}

// ==========================================================================
// 10. LOADING / ERROR / NOT FOUND STATES
// ==========================================================================

function renderLoadingSkeleton(container) {
  container.innerHTML = `
    <div class="container order-page-wrapper">
      <div class="skeleton-box skeleton-hero"></div>
      <div class="skeleton-box" style="height: 60px; margin-bottom: 24px;"></div>
      <div class="skeleton-box" style="height: 180px; margin-bottom: 24px;"></div>
      <div class="order-grid-layout">
        <div class="skeleton-box" style="height: 320px;"></div>
        <div class="skeleton-box" style="height: 320px;"></div>
      </div>
    </div>
  `;
}

function renderErrorState(container) {
  container.innerHTML = `
    <div class="container order-page-wrapper">
      <div class="empty-state-card">
        <div class="empty-state-icon" style="color: var(--accent-red);">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 class="empty-state-title">Unable to Load Tracking Details</h2>
        <p class="empty-state-desc">
          We encountered a temporary connection issue fetching live logistics status. Please check your network and try again.
        </p>
        <button class="btn-hero-primary" onclick="setOrderStatus('PACKED')">TRY AGAIN</button>
      </div>
    </div>
  `;
}

function renderNotFoundState(container) {
  container.innerHTML = `
    <div class="container order-page-wrapper">
      <div class="empty-state-card">
        <div class="empty-state-icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>
        <h2 class="empty-state-title">ORDER NOT FOUND</h2>
        <p class="empty-state-desc">
          We couldn't find an order with that tracking number. Please verify your order ID and email/phone number.
        </p>
        <div class="hero-cta-group">
          <button class="btn-hero-primary" onclick="setOrderStatus('PACKED')">VIEW DEMO ORDER</button>
          <a href="index.html" class="btn-hero-secondary">CONTINUE SHOPPING</a>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 11. MODAL WORKFLOWS (ADDRESS CHANGE, CANCEL, RETURN, INVOICE)
// ==========================================================================

function openAddressModal() {
  if (!canEditAddress()) {
    showToast('Address is locked as shipment is already in transit.');
    return;
  }

  const modalHtml = `
    <div class="modal-backdrop active" id="addressModal" role="dialog" aria-modal="true">
      <div class="modal-content-wrap" style="max-width: 500px; padding: 28px;">
        <button class="modal-close-btn" onclick="closeOrderModal('addressModal')">✕</button>
        <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px;">
          Update Delivery Address
        </h3>
        <form onsubmit="saveAddressForm(event)">
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <input type="text" id="editName" class="search-input-field" value="${currentOrder.address.name}" placeholder="Recipient Full Name" required>
            <input type="text" id="editStreet" class="search-input-field" value="${currentOrder.address.street}" placeholder="Street Address / Suite" required>
            <input type="text" id="editCity" class="search-input-field" value="${currentOrder.address.city}" placeholder="City" required>
            <div style="display: flex; gap: 12px;">
              <input type="text" id="editState" class="search-input-field" value="${currentOrder.address.state}" placeholder="State" required>
              <input type="text" id="editPincode" class="search-input-field" value="${currentOrder.address.pincode}" placeholder="Pincode" required>
            </div>
            <input type="text" id="editPhone" class="search-input-field" value="${currentOrder.address.phone}" placeholder="Phone Number" required>
          </div>
          <div style="display: flex; gap: 12px; margin-top: 20px;">
            <button type="submit" class="btn-hero-primary" style="flex: 1; justify-content: center; border-radius: var(--radius-md);">SAVE ADDRESS</button>
            <button type="button" class="btn-hero-secondary" style="border-radius: var(--radius-md);" onclick="closeOrderModal('addressModal')">CANCEL</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function saveAddressForm(e) {
  e.preventDefault();
  currentOrder.address.name = document.getElementById('editName').value;
  currentOrder.address.street = document.getElementById('editStreet').value;
  currentOrder.address.city = document.getElementById('editCity').value;
  currentOrder.address.state = document.getElementById('editState').value;
  currentOrder.address.pincode = document.getElementById('editPincode').value;
  currentOrder.address.phone = document.getElementById('editPhone').value;

  saveCurrentOrder();
  closeOrderModal('addressModal');
  showToast('Delivery address updated successfully!');
  renderOrderApp();
}

function openCancelModal() {
  const modalHtml = `
    <div class="modal-backdrop active" id="cancelModal" role="dialog" aria-modal="true">
      <div class="modal-content-wrap" style="max-width: 480px; padding: 28px;">
        <button class="modal-close-btn" onclick="closeOrderModal('cancelModal')">✕</button>
        <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--accent-red); margin-bottom: 12px;">
          Cancel Order #${currentOrder.orderNumber}?
        </h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
          Are you sure you want to cancel this order? Once cancelled, ₹${currentOrder.pricing.total.toLocaleString('en-IN')} will be refunded to your payment method.
        </p>
        <select id="cancelReasonSelect" class="search-input-field" style="margin-bottom: 20px; width: 100%;">
          <option>Ordered by mistake</option>
          <option>Item delivery time is too long</option>
          <option>Found better price elsewhere</option>
          <option>Need to change shipping address</option>
        </select>
        <div style="display: flex; gap: 12px;">
          <button type="button" class="btn-action btn-action-danger" onclick="confirmCancelOrder()">CONFIRM CANCELLATION</button>
          <button type="button" class="btn-hero-secondary" onclick="closeOrderModal('cancelModal')">KEEP ORDER</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function confirmCancelOrder() {
  closeOrderModal('cancelModal');
  setOrderStatus('CANCELLED');
  showToast('Order successfully cancelled. Refund initiated!');
}

function openReturnModal() {
  const modalHtml = `
    <div class="modal-backdrop active" id="returnModal" role="dialog" aria-modal="true">
      <div class="modal-content-wrap" style="max-width: 500px; padding: 28px;">
        <button class="modal-close-btn" onclick="closeOrderModal('returnModal')">✕</button>
        <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--accent-orange); margin-bottom: 12px;">
          Return / Exchange Request
        </h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
          Select reason for returning items from Order #${currentOrder.orderNumber}.
        </p>
        <select id="returnReason" class="search-input-field" style="margin-bottom: 16px; width: 100%;">
          <option>Size too small / large</option>
          <option>Product defect or damage</option>
          <option>Different item delivered</option>
          <option>Changed mind</option>
        </select>
        <div style="display: flex; gap: 12px; margin-top: 12px;">
          <button type="button" class="btn-action btn-action-primary" onclick="confirmReturnRequest()">INITIATE RETURN</button>
          <button type="button" class="btn-hero-secondary" onclick="closeOrderModal('returnModal')">CANCEL</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function confirmReturnRequest() {
  closeOrderModal('returnModal');
  setOrderStatus('RETURNED');
  showToast('Return request created! Pickup scheduled.');
}

function openInvoiceModal() {
  const invoiceHtml = `
    <div class="modal-backdrop active" id="invoiceModal" role="dialog" aria-modal="true">
      <div class="modal-content-wrap" style="max-width: 720px; padding: 36px; background: #ffffff; color: #000000;">
        <button class="modal-close-btn" onclick="closeOrderModal('invoiceModal')" style="color: #000000;">✕</button>
        
        <div class="invoice-printable-area">
          <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 16px; margin-bottom: 24px;">
            <div>
              <h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; letter-spacing: 0.05em;">INFINITYMAX</h2>
              <div style="font-size: 0.8rem; color: #555;">TAX INVOICE / PROOF OF PURCHASE</div>
            </div>
            <div style="text-align: right; font-size: 0.85rem;">
              <strong>Invoice #:</strong> INV-2026-${currentOrder.orderNumber}<br>
              <strong>Date:</strong> ${currentOrder.orderDate}
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 24px;">
            <div>
              <strong>Billed & Shipped To:</strong><br>
              ${currentOrder.address.name}<br>
              ${currentOrder.address.street}<br>
              ${currentOrder.address.city}, ${currentOrder.address.state} — ${currentOrder.address.pincode}
            </div>
            <div style="text-align: right;">
              <strong>Payment Method:</strong> ${currentOrder.paymentMethod}<br>
              <strong>Status:</strong> ${currentOrder.paymentStatus}<br>
              <strong>Txn Ref:</strong> ${currentOrder.transactionId}
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 24px;">
            <thead>
              <tr style="border-bottom: 1px solid #ccc; text-align: left;">
                <th style="padding: 8px 0;">Item Description</th>
                <th style="padding: 8px 0; text-align: center;">Qty</th>
                <th style="padding: 8px 0; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${currentOrder.items.map(item => `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px 0;">
                    <strong>${item.brand}</strong> - ${item.name} (${item.variant})
                  </td>
                  <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
                  <td style="padding: 10px 0; text-align: right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="text-align: right; font-size: 0.9rem; margin-top: 16px;">
            <div>Subtotal: ₹${currentOrder.pricing.subtotal.toLocaleString('en-IN')}</div>
            <div>Discount: -₹${currentOrder.pricing.discount.toLocaleString('en-IN')}</div>
            <div>GST (18%): ₹${currentOrder.pricing.taxes.toLocaleString('en-IN')}</div>
            <div style="font-size: 1.2rem; font-weight: 800; margin-top: 8px;">Total: ₹${currentOrder.pricing.total.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 32px;" class="no-print">
          <button class="btn-hero-primary" style="flex: 1; justify-content: center; background: #000; color: #fff;" onclick="window.print()">PRINT INVOICE</button>
          <button class="btn-hero-secondary" style="border-color: #000; color: #000;" onclick="closeOrderModal('invoiceModal')">CLOSE</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeOrderModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.remove();
}

function handleSearchOrder(e) {
  e.preventDefault();
  const val = document.getElementById('orderSearchInput').value.trim();
  if (val.toUpperCase() === currentOrder.orderNumber) {
    engineState = 'normal';
    renderOrderApp();
    showToast(`Order #${val} found!`);
  } else {
    engineState = 'not_found';
    renderOrderApp();
  }
}

// Render recommended products from global PRODUCTS array
function renderRecommendedProducts() {
  const target = document.getElementById('recommendedProductsGrid');
  if (!target || typeof PRODUCTS === 'undefined') return;

  const sample = PRODUCTS.slice(0, 4);
  target.innerHTML = sample.map(createProductCardHTML).join('');
  if (typeof attachCardEventListeners === 'function') {
    attachCardEventListeners(target);
  }
}

// Initial Listener
document.addEventListener('DOMContentLoaded', () => {
  renderOrderApp();
});
