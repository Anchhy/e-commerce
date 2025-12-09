<template>
  <div class="product-page">
    <header class="topbar">
      <div class="brand">🍈 Melon Mart & Grocery</div>
      <div class="actions">
        <a href="#">Account</a>
        <a href="#">Compare</a>
        <a href="#">Wishlist</a>
        <a href="#">Cart</a>
      </div>
    </header>

    <nav class="breadcrumb">
      <a href="#">Home</a>
      <span>›</span>
      <a href="#">Vegetables & tubers</a>
      <span>›</span>
      <span>Seeds of Change Organic</span>
    </nav>

    <section class="product-hero">
      <div class="gallery">
        <div class="main-image">
          <img :src="mangoImage" alt="Mango" />
        </div>
        <div class="thumbs">
          <button>←</button>
          <img src="https://images.unsplash.com/photo-1502741126161-b048400d08d9?w=120" alt="thumb-1" />
          <img src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=120" alt="thumb-2" />
          <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=120" alt="thumb-3" />
          <img src="https://images.unsplash.com/photo-1447175008436-054170c2e979?w=120" alt="thumb-4" />
          <button>→</button>
        </div>
      </div>

      <div class="details">
        <p class="stock-pill">In Stock</p>
        <h1>Seeds of Change Organic Quinoa, Brown</h1>

        <div class="rating">
          <span class="stars">★★★★★</span>
          <span class="count">(4.8)</span>
        </div>

        <div class="price-row">
          <span class="price">$38</span>
          <span class="compare">$42</span>
        </div>

        <p class="description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam rem officia, corrupti reiciendis minima nisi
          modi, quasi, odio minus dolore impedit fuga eum eligendi? Officia doloremque facere quia. Voluptatum,
          accusantium!
        </p>

        <div class="purchase-row">
          <div class="qty">
            <button @click="decrement">−</button>
            <input type="number" v-model.number="quantity" min="1" />
            <button @click="increment">+</button>
          </div>
          <button class="btn primary">Add To Cart</button>
          <button class="btn ghost">♡</button>
          <button class="btn ghost">↻</button>
        </div>

        <div class="meta">
          <div><strong>Vendor:</strong> NestMart</div>
          <div><strong>SKU:</strong> FWM15VKT</div>
          <div><strong>Product ID (route):</strong> {{ productId }}</div>
        </div>
      </div>
    </section>

    <section class="tabs">
      <div class="tab-headers">
        <button :class="{ active: activeTab === 'desc' }" @click="activeTab = 'desc'">Description</button>
        <button :class="{ active: activeTab === 'info' }" @click="activeTab = 'info'">Additional info</button>
        <button :class="{ active: activeTab === 'reviews' }" @click="activeTab = 'reviews'">Reviews (3)</button>
      </div>
      <div class="tab-content">
        <p v-if="activeTab === 'desc'">
          Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far quetzal
          goodness and from for grimaced goodness unaccountably and meadowlark near unblushingly crucial scallop tightly
          neurotic hungrily some and dear furiously this apart.
        </p>
        <p v-else-if="activeTab === 'info'">
          Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas
          rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped besides
          and much circa far over the bucolically hey precarious godfrinch mastodon goodness gnashed a jellyfish and one
          however because.
        </p>
        <p v-else>
          ★★★★☆ — Great quality and fast delivery.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import mangoImage from '@/images/mengo.png';

const route = useRoute();
const productId = route.params.productId ?? 'N/A';
const quantity = ref(1);
const activeTab = ref('desc');

const increment = () => {
  quantity.value += 1;
};
const decrement = () => {
  if (quantity.value > 1) quantity.value -= 1;
};
</script>

<style scoped>
:global(body) {
  margin: 0;
  font-family: "Poppins", "Segoe UI", system-ui, -apple-system, sans-serif;
  color: #1f2933;
  background: #f7f9fb;
}

.product-page {
  max-width: 1200px;
  margin: 0 auto 64px;
  padding: 24px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 8px 0 18px;
  color: #6b7280;
}

.topbar .brand {
  font-weight: 700;
  color: #16a34a;
}

.topbar a {
  color: inherit;
  text-decoration: none;
  margin-left: 16px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 18px;
}

.breadcrumb a {
  color: #16a34a;
  text-decoration: none;
}

.product-hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 32px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 12px 32px -18px rgba(0, 0, 0, 0.12);
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-image {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
}

.main-image img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.thumbs {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  align-items: center;
}

.thumbs button {
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 10px;
  padding: 8px 0;
  cursor: pointer;
}

.thumbs img {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 6px;
  background: #fff;
  object-fit: cover;
}

.details h1 {
  margin: 6px 0 10px;
  font-size: 28px;
}

.stock-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #ecfdf3;
  color: #15803d;
  font-weight: 600;
  font-size: 12px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f59e0b;
  margin: 10px 0;
}

.rating .count {
  color: #6b7280;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 10px 0 14px;
}

.price {
  font-size: 32px;
  font-weight: 800;
  color: #16a34a;
}

.compare {
  text-decoration: line-through;
  color: #9ca3af;
  font-size: 18px;
}

.description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 18px;
}

.purchase-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.qty {
  display: inline-flex;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}

.qty button {
  border: none;
  background: #f8fafc;
  padding: 10px 14px;
  cursor: pointer;
}

.qty input {
  width: 64px;
  border: none;
  text-align: center;
  outline: none;
  font-size: 15px;
}

.btn {
  border-radius: 10px;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  background: #fff;
  cursor: pointer;
}

.btn.primary {
  background: #16a34a;
  color: #fff;
  border-color: #16a34a;
  font-weight: 600;
}

.btn.ghost {
  width: 40px;
  height: 40px;
  padding: 0;
  display: grid;
  place-items: center;
}

.meta {
  display: grid;
  gap: 6px;
  color: #4b5563;
  font-size: 14px;
}

.tabs {
  margin-top: 24px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 12px 32px -18px rgba(0, 0, 0, 0.12);
}

.tab-headers {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.tab-headers button {
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 10px;
  padding: 8px 14px;
  cursor: pointer;
  color: #475569;
}

.tab-headers button.active {
  background: #16a34a;
  color: #fff;
  border-color: #16a34a;
}

.tab-content {
  color: #4b5563;
  line-height: 1.6;
}

@media (max-width: 960px) {
  .product-hero {
    grid-template-columns: 1fr;
  }
}
</style>
