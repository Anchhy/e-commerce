<template>
  <div class="hot-deals-page">
    <HeroBannerComponent />

    <main class="container">
      <!-- featured categories (horizontal row) -->
      <section class="featured-categories">
        <div class="categories-container">
          <CategoryComponent
            v-for="cat in categoriesList"
            :key="cat.id"
            :category="cat"
          />
        </div>
      </section>

      <!-- promotions row -->
      <section class="promotions" v-if="promotionsList.length">
        <div class="promo-container">
          <PromotionComponent
            v-for="p in promotionsList"
            :key="p.id"
            :promotion="p"
            @click="onPromoClick"
          />
        </div>
      </section>

      <!-- popular products -->
      <section class="popular-products" v-if="popularProducts.length">
        <header class="section-header">
          <h2>Popular Products</h2>
        </header>

        <div class="products-container">
          <ProductComponent
            v-for="prod in popularProducts"
            :key="prod.id"
            :product="prod"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/store/productStore';
import { useRouter } from 'vue-router';

import HeroBannerComponent from '@/components/HeroBannerComponent.vue';
import CategoryComponent from '@/components/CategoryComponent.vue';
import PromotionComponent from '@/components/PromotionComponent.vue';
import ProductComponent from '@/components/ProductComponent.vue';

const store = useProductStore();
const router = useRouter();

onMounted(async () => {
  // fetch everything (store falls back to fallback data on error)
  await Promise.all([
    store.fetchCategories(),
    store.fetchPromotions(),
    store.fetchProducts()
  ]);
});

const categoriesList = computed(() => (store.categories.length ? store.categories : store.fallbackCategories));
const promotionsList = computed(() => (store.promotions.length ? store.promotions : store.fallbackPromotions));
const popularProducts = computed(() => store.getPopularProducts);

const onPromoClick = (promo) => {
  router.push({ name: 'Product', params: { productId: promo?.id || 1 } });
};
</script>

<style scoped>
.container { max-width: 1400px; margin: 24px auto; padding: 0 20px; }

/* categories */
.categories-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 18px;
}

/* promos grid */
.promo-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin: 18px 0 28px;
}

/* products grid */
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
.section-header h2 { margin:0; font-size:24px; color:#253d4e; }

@media (max-width:1200px) { .promo-container { grid-template-columns: repeat(2,1fr); } }
@media (max-width:680px) { .promo-container { grid-template-columns: 1fr; } .categories-container { gap:12px; } }
</style>
