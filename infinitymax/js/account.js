/**
 * INFINITYMAX - User Account Dashboard Logic
 * Dedicated to user "Infinity Admin"
 */

const DEFAULT_PROFILE = {
  name: "Infinity Admin",
  email: "admin@infinitymax.com",
  phone: "+91 98765 43210",
  tier: "VIP Elite Member",
  memberSince: "2024",
  rewardPoints: 4850
};

let userProfile = JSON.parse(localStorage.getItem('infinitymax_userProfile') || JSON.stringify(DEFAULT_PROFILE));
let activeAccountTab = 'overview'; // 'overview' | 'orders' | 'addresses' | 'payments' | 'settings'

const SAMPLE_ORDER_HISTORY = [
  {
    orderNumber: "PU-2026-10482",
    date: "15 Sep 2026",
    status: "PACKED",
    statusClass: "status-pill-packed",
    total: 53093,
    itemsCount: 3,
    itemPreview: "Nike Air Force 1 '07 + 2 more items"
  },
  {
    orderNumber: "PU-2026-09120",
    date: "28 Aug 2026",
    status: "DELIVERED",
    statusClass: "status-pill-delivered",
    total: 13999,
    itemsCount: 1,
    itemPreview: "Adidas Ultraboost Light 23 Running Shoes"
  },
  {
    orderNumber: "PU-2026-08411",
    date: "14 Jul 2026",
    status: "DELIVERED",
    statusClass: "status-pill-delivered",
    total: 8999,
    itemsCount: 1,
    itemPreview: "Adidas Originals Campus 00s"
  }
];

function saveUserProfile() {
  localStorage.setItem('infinitymax_userProfile', JSON.stringify(userProfile));
}

function renderAccountApp() {
  const container = document.getElementById('accountAppContainer');
  if (!container) return;

  const wishlistCount = (JSON.parse(localStorage.getItem('infinitymax_wishlist') || '[]')).length;

  container.innerHTML = `
    <div class="container account-page-wrapper">
      
      <!-- USER PROFILE HERO CARD -->
      <div class="account-profile-card">
        <div class="account-profile-left">
          <div class="account-avatar-ring">
            <span>IA</span>
          </div>
          <div class="account-user-meta">
            <h1>
              <span>${userProfile.name}</span>
              <span class="vip-badge-pill">${userProfile.tier}</span>
            </h1>
            <div class="account-user-email">${userProfile.email} • Member since ${userProfile.memberSince}</div>
          </div>
        </div>

        <div>
          <button class="btn-hero-secondary" style="border-radius: var(--radius-full); padding: 10px 20px;" onclick="openEditProfileModal()">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            EDIT PROFILE
          </button>
        </div>
      </div>

      <!-- QUICK STATS ROW -->
      <div class="account-stats-row">
        <div class="account-stat-card">
          <div class="stat-value">12</div>
          <div class="stat-label">Total Orders</div>
        </div>
        <div class="account-stat-card">
          <div class="stat-value">${wishlistCount}</div>
          <div class="stat-label">Wishlist Items</div>
        </div>
        <div class="account-stat-card">
          <div class="stat-value" style="color: var(--accent-green);">${userProfile.rewardPoints.toLocaleString()}</div>
          <div class="stat-label">Infinity Points</div>
        </div>
        <div class="account-stat-card">
          <div class="stat-value">2</div>
          <div class="stat-label">Saved Addresses</div>
        </div>
      </div>

      <!-- ACCOUNT TAB NAVIGATION -->
      <div class="account-nav-tabs">
        <button class="account-tab-btn ${activeAccountTab === 'overview' ? 'active' : ''}" onclick="switchAccountTab('overview')">OVERVIEW</button>
        <button class="account-tab-btn ${activeAccountTab === 'orders' ? 'active' : ''}" onclick="switchAccountTab('orders')">ORDER HISTORY (3)</button>
        <button class="account-tab-btn ${activeAccountTab === 'addresses' ? 'active' : ''}" onclick="switchAccountTab('addresses')">SAVED ADDRESSES</button>
        <button class="account-tab-btn ${activeAccountTab === 'payments' ? 'active' : ''}" onclick="switchAccountTab('payments')">PAYMENT METHODS</button>
        <button class="account-tab-btn ${activeAccountTab === 'settings' ? 'active' : ''}" onclick="switchAccountTab('settings')">SECURITY & SETTINGS</button>
      </div>

      <!-- ACTIVE TAB CONTENT MOUNT -->
      <div id="accountTabContent">
        ${renderActiveTabContent()}
      </div>

    </div>
  `;
}

function switchAccountTab(tabName) {
  activeAccountTab = tabName;
  renderAccountApp();
}

function renderActiveTabContent() {
  if (activeAccountTab === 'orders') return renderOrdersTab();
  if (activeAccountTab === 'addresses') return renderAddressesTab();
  if (activeAccountTab === 'payments') return renderPaymentTab();
  if (activeAccountTab === 'settings') return renderSettingsTab();
  return renderOverviewTab(); // default
}

function renderOverviewTab() {
  return `
    <!-- ACTIVE SHIPMENT ALERT CARD -->
    <div class="order-card-box" style="margin-bottom: 32px; border-color: rgba(234, 179, 8, 0.3); background: radial-gradient(circle at 100% 0%, rgba(234, 179, 8, 0.05) 0%, transparent 60%), var(--bg-secondary);">
      <div class="card-title-head">
        <span style="display: flex; align-items: center; gap: 8px;">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          Active Shipment in Progress
        </span>
        <span class="status-pill status-pill-packed">PREPARING TO SHIP</span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
            Order #PU-2026-10482
          </div>
          <div style="font-size: 0.88rem; color: var(--text-secondary);">
            3 Items • Expected Delivery: <strong style="color: var(--accent-green);">18–20 September 2026</strong>
          </div>
        </div>
        <a href="order.html?orderId=PU-2026-10482" class="btn-hero-primary" style="padding: 10px 24px; font-size: 0.82rem;">
          TRACK SHIPMENT →
        </a>
      </div>
    </div>

    <!-- QUICK OVERVIEW GRID -->
    <div class="order-grid-layout">
      <div class="order-col-main">
        <div class="order-card-box">
          <div class="card-title-head">
            <span>Recent Orders</span>
            <button class="btn-hero-secondary" style="padding: 4px 12px; font-size: 0.75rem;" onclick="switchAccountTab('orders')">View All</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${SAMPLE_ORDER_HISTORY.slice(0, 2).map(ord => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid var(--border-light); flex-wrap: wrap; gap: 10px;">
                <div>
                  <strong style="color: var(--text-primary);">#${ord.orderNumber}</strong> • ${ord.date}<br>
                  <span style="font-size: 0.82rem; color: var(--text-tertiary);">${ord.itemPreview}</span>
                </div>
                <div style="text-align: right;">
                  <span class="status-pill ${ord.statusClass}">${ord.status}</span>
                  <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-top: 4px;">₹${ord.total.toLocaleString('en-IN')}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="order-col-sidebar">
        <div class="order-card-box">
          <div class="card-title-head">
            <span>Primary Address</span>
          </div>
          <div class="card-text-body">
            <strong>NOVA (${userProfile.name})</strong><br>
            123 Example Street, Suite 4B<br>
            Vasant Kunj, New Delhi — 110070<br>
            Phone: ${userProfile.phone}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderOrdersTab() {
  return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      ${SAMPLE_ORDER_HISTORY.map(ord => `
        <div class="history-order-item">
          <div class="history-order-header">
            <div>
              <span style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">Order #${ord.orderNumber}</span>
              <span style="font-size: 0.85rem; color: var(--text-tertiary); margin-left: 12px;">Placed on ${ord.date}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="status-pill ${ord.statusClass}">${ord.status}</span>
              <a href="order.html?orderId=${ord.orderNumber}&status=${ord.status}" class="btn-hero-primary" style="padding: 8px 16px; font-size: 0.78rem;">
                VIEW DETAILS →
              </a>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div style="font-size: 0.9rem; color: var(--text-secondary);">
              <strong>Items:</strong> ${ord.itemPreview}
            </div>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">
              Total: ₹${ord.total.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAddressesTab() {
  return `
    <div class="info-row-grid">
      <div class="order-card-box">
        <div class="card-title-head">
          <span>Home (Default Address)</span>
          <span style="font-size: 0.72rem; color: var(--accent-green); background: rgba(34, 197, 94, 0.1); padding: 2px 8px; border-radius: 4px;">PRIMARY</span>
        </div>
        <div class="card-text-body">
          <strong>${userProfile.name}</strong><br>
          123 Example Street, Suite 4B<br>
          Vasant Kunj, New Delhi, Delhi — 110070<br>
          Phone: ${userProfile.phone}
        </div>
      </div>

      <div class="order-card-box">
        <div class="card-title-head">
          <span>Office Address</span>
        </div>
        <div class="card-text-body">
          <strong>${userProfile.name} (Tech Hub)</strong><br>
          Building 8C, Cyber City<br>
          Gurugram, Haryana — 122002<br>
          Phone: +91 98111 22334
        </div>
      </div>
    </div>
  `;
}

function renderPaymentTab() {
  return `
    <div class="info-row-grid">
      <div class="order-card-box">
        <div class="card-title-head">
          <span>Google Pay UPI</span>
          <span style="font-size: 0.72rem; color: var(--accent-green); background: rgba(34, 197, 94, 0.1); padding: 2px 8px; border-radius: 4px;">DEFAULT</span>
        </div>
        <div class="card-text-body">
          <strong>UPI ID:</strong> admin@okaxis<br>
          Linked to HDFC Bank (**** 4821)
        </div>
      </div>

      <div class="order-card-box">
        <div class="card-title-head">
          <span>Credit Card (Visa Black)</span>
        </div>
        <div class="card-text-body">
          <strong>Card:</strong> XXXX XXXX XXXX 9081<br>
          Expires: 11/29 • Bank: ICICI Wealth
        </div>
      </div>
    </div>
  `;
}

function renderSettingsTab() {
  return `
    <div class="order-card-box" style="max-width: 600px;">
      <div class="card-title-head">
        <span>Account & Security Settings</span>
      </div>
      <form onsubmit="saveSettingsForm(event)" style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label class="card-label-small">Full Name</label>
          <input type="text" id="settingsName" class="search-input-field" value="${userProfile.name}" required>
        </div>
        <div>
          <label class="card-label-small">Email Address</label>
          <input type="email" id="settingsEmail" class="search-input-field" value="${userProfile.email}" required>
        </div>
        <div>
          <label class="card-label-small">Phone Number</label>
          <input type="text" id="settingsPhone" class="search-input-field" value="${userProfile.phone}" required>
        </div>
        <div style="margin-top: 12px; display: flex; gap: 12px;">
          <button type="submit" class="btn-hero-primary">SAVE CHANGES</button>
          <button type="button" class="btn-hero-secondary" onclick="showToast('Logout triggered')">LOG OUT</button>
        </div>
      </form>
    </div>
  `;
}

function openEditProfileModal() {
  switchAccountTab('settings');
}

function saveSettingsForm(e) {
  e.preventDefault();
  userProfile.name = document.getElementById('settingsName').value;
  userProfile.email = document.getElementById('settingsEmail').value;
  userProfile.phone = document.getElementById('settingsPhone').value;

  saveUserProfile();
  showToast("Profile updated successfully!");
  renderAccountApp();
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
  renderAccountApp();
});
