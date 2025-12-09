<template>
  <header class="header">
    <div class="top-bar">
      <div class="container top-container">
        <div class="logo">
          <span class="logo-icon">🥭</span>
          <div class="logo-text">
            <span class="brand">Melon</span>
            <span class="tag">MART & GROCERY</span>
          </div>
        </div>

        <div class="search-bar">
          <select class="category-select" aria-label="Categories">
            <option>All Categories</option>
            <option v-for="(tab, i) in categoryTabs" :key="i">{{ tab }}</option>
          </select>

          <input type="search" placeholder="Search for items" aria-label="Search" />

          <button class="search-btn" aria-label="Search">Search</button>
        </div>

        <div class="top-right">
          <div class="icons">
            <button class="icon-btn">Account</button>
            <button class="icon-btn">Compare</button>
            <button class="icon-btn">Wishlist</button>
            <button class="icon-btn cart">Cart</button>
          </div>

          <div class="contact">
            <div class="phone">097 572 908</div>
            <div class="support">24/7 Support Center</div>
          </div>
        </div>
      </div>
    </div>

    <nav class="nav-bar">
      <div class="container nav-container">
        <button class="browse-btn">☰ Browse All Categories</button>

        <ul class="nav-links">
          <li><router-link to="/hot-deals">Hot Deals</router-link></li>
          <li><a href="#">Home</a></li>
          <li><a href="#">Food</a></li>
          <li><a href="#">Vegetables</a></li>
          <li><a href="#">Drink</a></li>
          <li><a href="#">Cookies</a></li>
          <li><a href="#">Meat & Seafood</a></li>
          <li><a href="#">Bakery</a></li>
        </ul>

        <div class="nav-right">
          <!-- optional extras (small icons, offers) -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const categoryTabs = ['Milks & Dairies', 'Coffee & Teas', 'Pet Foods', 'Meats', 'Vegetables', 'Fruits'];
</script>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Top Bar */
.top-bar {
  border-bottom: 1px solid #ececec;
  padding: 14px 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
}

.logo-icon {
  font-size: 28px;
}

.logo-text .brand {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #2aa77a;
}

.logo-text .tag {
  display: block;
  font-size: 11px;
  color: #7e7e7e;
  letter-spacing: 0.8px;
}

/* Search */
.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  border: 2px solid #e8f5ee;
  border-radius: 6px;
  overflow: hidden;
  max-width: 720px;
  background: #fafafa;
}

.category-select {
  padding: 10px 14px;
  border: none;
  background: #f5f7f6;
  font-size: 13px;
  cursor: pointer;
  min-width: 170px;
}

.search-bar input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  font-size: 14px;
  outline: none;
  background: transparent;
}

.search-btn {
  background: #2aa77a;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 0;
  transition: background 0.15s ease;
}

.search-btn:hover {
  background: #1f8f64;
}

/* Top right icons / contact */
.top-right {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 240px;
  justify-content: flex-end;
}

.icons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: #2f3d45;
  padding: 6px 10px;
  border-radius: 6px;
}

.icon-btn:hover {
  background: rgba(43, 160, 130, 0.06);
}

.icon-btn.cart {
  background: rgba(43, 160, 130, 0.06);
}

/* Contact block */
.contact {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.phone {
  font-size: 14px;
  font-weight: 700;
  color: #2aa77a;
}

.support {
  font-size: 11px;
  color: #7e7e7e;
}

/* Navigation Bar */
.nav-bar {
  padding: 12px 0;
  background: #fff;
}

.nav-bar .container {
  display: flex;
  align-items: center;
  gap: 24px;
}

.browse-btn {
  background: #14b07f;
  color: #fff;
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.browse-btn:hover {
  background: #0f966a;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 22px;
  margin: 0;
  padding: 0;
  flex: 1;
  align-items: center;
}

.nav-links li a,
.nav-links li router-link {
  text-decoration: none;
  color: #2f3d45;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.15s ease;
}

.nav-links li a:hover {
  color: #2aa77a;
}

.nav-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Responsive */
@media (max-width: 1200px) {
  .contact { display: none; }
  .container { max-width: 1100px; }
}

@media (max-width: 992px) {
  .icons { display: none; }
  .nav-links { gap: 12px; }
  .search-bar { max-width: 520px; }
}

@media (max-width: 768px) {
  .top-bar .container {
    flex-wrap: wrap;
    gap: 12px;
  }
  .search-bar {
    order: 3;
    width: 100%;
    max-width: 100%;
    margin-top: 8px;
  }
  .nav-links {
    display: none;
  }
  .browse-btn {
    flex: 1;
  }
}
</style>
