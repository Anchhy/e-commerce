<template>
  <div id="app">
    <main class="main-content">
      <CategoryComponent @category-selected="handleCategorySelect" />
      <PromotionComponent />
      <div class="products-wrapper">
        <ProductComponent
          title="Popular Products"
          :products="displayedProducts"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { useProductStore } from './stores/product'
import CategoryComponent from './components/CategoryComponent.vue'
import ProductComponent from './components/ProductComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'

export default {
  name: 'App',
  components: {
    CategoryComponent,
    ProductComponent,
    PromotionComponent
  },
  data() {
    return {
      selectedCategoryId: null
    }
  },
  computed: {
    store() {
      return useProductStore()
    },
    displayedProducts() {
      let products = this.store.products

      if (this.selectedCategoryId) {
        products = products.filter(p => p.categoryId === this.selectedCategoryId)
      }

      return products
    }
  },
  methods: {
    async initializeStore() {
      await this.store.fetchGroups()
      await this.store.fetchCategories()
      await this.store.fetchPromotions()
      await this.store.fetchProducts()
    },
    handleCategorySelect(categoryId) {
      this.selectedCategoryId = categoryId
    },
    handleAddToCart(product) {
      console.log('Product added to cart:', product)
    }
  },
  mounted() {
    this.initializeStore()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.main-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.products-wrapper {
  margin-top: 40px;
}

@media (max-width: 1024px) {
  .main-content {
    padding: 30px 20px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 20px 15px;
  }

  .products-wrapper {
    margin-top: 20px;
  }
}
</style>
