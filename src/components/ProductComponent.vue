<template>
  <div class="product-card">
    <div class="badge" v-if="product.badge" :class="badgeClass">{{ product.badge }}</div>
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
    </div>
    <p class="category">{{ product.description }}</p>
    <h4>{{ product.name }}</h4>
    <div class="rating">
      <div class="stars">
        <span v-for="n in 5" :key="n" :class="n <= Math.floor(product.rating) ? 'filled' : 'empty'">★</span>
      </div>
      <span class="reviews">({{ product.rating }})</span>
    </div>
    <div class="vendor">
      <span class="vendor-label">By</span> <span class="vendor-name">{{ product.description }}</span>
    </div>
    <div class="footer">
      <div class="price-section">
        <span class="price">${{ product.price }}</span>
        <span class="original-price" v-if="product.originalPrice">${{ product.originalPrice }}</span>
      </div>
      <button class="add-to-cart">
        <span>🛒</span> Add
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({ product: Object });

const badgeClass = computed(() => {
  const badge = props.product.badge?.toLowerCase();
  if (badge === 'hot') return 'badge-hot';
  if (badge === 'sale') return 'badge-sale';
  return 'badge-discount';
});
</script>

<style scoped>
.product-card {
  position: relative;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 15px;
  padding: 20px 15px;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transform: translateY(-8px);
  border-color: #3bb77e;
}

.badge {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  z-index: 1;
}

.badge-hot {
  background: #f74b81;
}

.badge-sale {
  background: #fdc040;
}

.badge-discount {
  background: #67bcee;
}

.product-image {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.product-card img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.category {
  font-size: 12px;
  color: #adadad;
  margin-bottom: 8px;
}

h4 {
  font-size: 15px;
  font-weight: 700;
  color: #253d4e;
  margin-bottom: 10px;
  line-height: 1.5;
  min-height: 45px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars .filled {
  color: #ffc107;
  font-size: 14px;
}

.stars .empty {
  color: #e0e0e0;
  font-size: 14px;
}

.reviews {
  font-size: 13px;
  color: #b6b6b6;
}

.vendor {
  font-size: 13px;
  color: #7e7e7e;
  margin-bottom: 12px;
}

.vendor-label {
  color: #adadad;
}

.vendor-name {
  color: #3bb77e;
  font-weight: 600;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #ececec;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.price {
  font-size: 20px;
  font-weight: 700;
  color: #3bb77e;
}

.original-price {
  font-size: 15px;
  color: #adadad;
  text-decoration: line-through;
}

.add-to-cart {
  background: #def9ec;
  color: #3bb77e;
  border: none;
  padding: 10px 18px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.add-to-cart:hover {
  background: #3bb77e;
  color: #fff;
  transform: translateY(-2px);
}
</style>
