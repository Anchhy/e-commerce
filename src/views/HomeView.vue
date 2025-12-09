<template>
  <div class="home">
    <HeroBannerComponent />

    <!-- Featured Categories - Single Row Only -->
    <section class="featured-categories">
      <div class="section-header">
        <h2>Featured Categories</h2>
        <div class="tabs">
          <button
            v-for="tab in categoryTabs"
            :key="tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>
      <div class="categories-container">
        <CategoryComponent
          v-for="category in displayedCategories"
          :key="category.id"
          :category="category"
        />
      </div>
    </section>

    <!-- Promotions -->
    <section class="promotions">
      <div class="promo-container">
        <PromotionComponent
          v-for="promo in store.promotions.length ? store.promotions : store.fallbackPromotions"
          :key="promo.id"
          :promotion="promo"
          @click="onPromoClick(promo)"
        />
      </div>
    </section>

    <!-- Popular Products -->
    <section class="popular-products">
      <div class="section-header">
        <h2>Popular Products</h2>
        <div class="tabs">
          <button
            v-for="tab in productTabs"
            :key="tab"
            :class="{ active: activeProductTab === tab }"
            @click="activeProductTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </div>
      <div class="products-container">
        <ProductComponent
          v-for="product in store.getPopularProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useProductStore } from '../store/productStore';
import { computed, onMounted, ref } from 'vue';
import HeroBannerComponent from '../components/HeroBannerComponent.vue';
import CategoryComponent from '../components/CategoryComponent.vue';
import PromotionComponent from '../components/PromotionComponent.vue';
import ProductComponent from '../components/ProductComponent.vue';
import { useRouter } from 'vue-router';

const store = useProductStore();
const router = useRouter();

const activeTab = ref('All');
const activeProductTab = ref('All');

const categoryTabs = ['All', 'Milks & Dairies', 'Coffee & Teas', 'Pet Foods', 'Meats', 'Vegetables', 'Fruits'];
const productTabs = ['All', 'Milks & Dairies', 'Coffee & Tea', 'Pet Foods', 'Meats', 'Vegetables', 'Fruits'];

onMounted(() => {
  store.fetchCategories();
  store.fetchPromotions();
  store.fetchProducts();
});

// Display only first 10 categories in one row
const displayedCategories = computed(() => {
  const categories = store.categories.length ? store.categories : store.fallbackCategories;
  return categories.slice(0, 10);
});

// Vegetables category id in fallbackCategories is 7
function onPromoClick(promo) {
  if (promo.title === 'The best Organic Products Online') {
    router.push({ name: 'Category', params: { id: 7 } });
    return;
  }
  // default: go to Hot Deals
  router.push({ name: 'HotDeals' });
}
</script>

<style scoped>
.home {
  padding-bottom: 60px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}

.tabs {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.tabs button {
  background: none;
  border: none;
  color: #7e7e7e;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s ease;
  font-weight: 500;
  position: relative;
}

.tabs button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #3bb77e;
  transition: width 0.3s ease;
}

.tabs button.active::after,
.tabs button:hover::after {
  width: 100%;
}

.tabs button.active {
  color: #3bb77e;
  font-weight: 700;
}

.tabs button:hover {
  color: #3bb77e;
}

.featured-categories {
  max-width: 1400px;
  margin: 50px auto;
  padding: 0 20px;
}

.featured-categories h2,
.popular-products h2 {
  font-size: 36px;
  font-weight: 700;
  color: #253d4e;
}

.categories-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 15px;
  scrollbar-width: thin;
  scrollbar-color: #3bb77e #f0f0f0;
}

.categories-container::-webkit-scrollbar {
  height: 8px;
}

.categories-container::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.categories-container::-webkit-scrollbar-thumb {
  background: #3bb77e;
  border-radius: 4px;
}

.categories-container::-webkit-scrollbar-thumb:hover {
  background: #2f9c65;
}

/* Promotions */
.promotions {
  max-width: 1400px;
  margin: 60px auto;
  padding: 0 20px;
}

.promo-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

/* Popular Products */
.popular-products {
  max-width: 1400px;
  margin: 60px auto;
  padding: 0 20px;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
}

@media (max-width: 1200px) {
  .promo-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .products-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .tabs {
    gap: 15px;
  }

  .promo-container {
    grid-template-columns: 1fr;
  }

  .products-container {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }
}
</style>
