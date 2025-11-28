<template>
  <div class="products-section">
    <div class="section-header">
      <h2>{{ title }}</h2>
      <div class="header-tabs">
        <button
          v-for="group in ['All', 'Milks & Dairies', 'Coffes & Teas', 'Pet Foods', 'Meats', 'Vegetables', 'Fruits']"
          :key="group"
          :class="{ active: group === 'All' }"
          class="tab-btn"
        >
          {{ group }}
        </button>
      </div>
    </div>
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-badge-container">
          <div v-if="product.sale" class="sale-badge">Sale</div>
        </div>
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info">
          <p class="product-category">{{ product.description }}</p>
          <h4>{{ product.name }}</h4>
          <div class="rating" v-if="product.rating">
            <div class="stars-display">
              <span class="stars">★ ★ ★ ★</span>
              <span class="rating-value">{{ product.rating }}</span>
            </div>
          </div>
          <div class="weight">500 gram</div>
          <div class="price-section">
            <span class="price">${{ product.price.toFixed(2) }}</span>
            <span v-if="product.originalPrice" class="original-price">${{ product.originalPrice.toFixed(2) }}</span>
          </div>
          <div class="action-buttons">
            <div class="qty-controls">
              <input type="number" v-model.number="product.quantity" min="1" max="10" class="qty-input" />
            </div>
            <button @click="addToCart(product)" class="add-btn">
              <span>Add</span>
              <span class="add-icon">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductComponent',
  props: {
    title: {
      type: String,
      default: 'Popular Products'
    },
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTab: 'All'
    }
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product)
    }
  }
}
</script>

<style scoped>
.products-section {
  width: 100%;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.section-header h2 {
  font-size: 24px;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.header-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 6px 14px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 13px;
  color: #666;
  transition: all 0.3s;
  font-weight: 500;
  border-radius: 4px;
}

.tab-btn:hover {
  color: #1ba98e;
  background-color: rgba(27, 169, 142, 0.05);
}

.tab-btn.active {
  color: #1ba98e;
  font-weight: 600;
  background-color: rgba(27, 169, 142, 0.08);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 18px;
}

.product-card {
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.product-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-6px);
  border-color: #e0e0e0;
}

.product-badge-container {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
}

.sale-badge {
  background-color: #1ba98e;
  color: white;
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(27, 169, 142, 0.3);
}

.product-image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  overflow: hidden;
  border-bottom: 1px solid #e8e8e8;
}

.product-image img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.product-info {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  font-size: 11px;
  color: #999;
  margin: 0 0 6px 0;
  text-transform: capitalize;
  font-weight: 500;
}

.product-info h4 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 11px;
}

.stars-display {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stars {
  color: #ff9800;
  font-weight: 700;
  font-size: 12px;
}

.rating-value {
  color: #333;
  font-weight: 600;
}

.weight {
  font-size: 11px;
  color: #999;
  margin-bottom: 10px;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: #1ba98e;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-top: auto;
  align-items: center;
}

.qty-controls {
  display: flex;
}

.qty-input {
  width: 50px;
  padding: 8px 6px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 12px;
  text-align: center;
  transition: all 0.3s;
  font-weight: 600;
  background-color: #f9f9f9;
}

.qty-input:focus {
  outline: none;
  border-color: #1ba98e;
  box-shadow: 0 0 0 2px rgba(27, 169, 142, 0.1);
  background-color: white;
}

.add-btn {
  flex: 1;
  background-color: #1ba98e;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 12px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.add-btn:hover {
  background-color: #159477;
  box-shadow: 0 4px 10px rgba(27, 169, 142, 0.3);
}

.add-btn:active {
  transform: scale(0.98);
}

.add-icon {
  font-weight: 700;
  font-size: 14px;
}

@media (max-width: 1400px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .products-section {
    padding: 20px;
  }

  .product-image {
    height: 140px;
  }

  .section-header h2 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
