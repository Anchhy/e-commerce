<template>
  <div class="category-page">
    <div class="container">
      <section class="page-banner">
        <div class="banner-inner">
          <h1 class="banner-title">{{ categoryName }}</h1>
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <router-link to="/">Home</router-link>
            <span class="sep">›</span>
            <span class="current">{{ categoryName }}</span>
          </nav>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/productStore';

const route = useRoute();
const store = useProductStore();
const id = Number(route.params.id || 0);

const categoryName = computed(() => {
  const list = store.categories.length ? store.categories : store.fallbackCategories;
  const found = list.find(c => Number(c.id) === id);
  return found ? found.name : 'Category';
});
</script>

<style scoped>
.container { max-width: 1400px; margin: 20px auto; padding: 0 20px; }
.page-banner {
  background: linear-gradient(180deg, rgba(229,248,242,0.9), rgba(236,249,244,0.9));
  border-radius: 12px;
  padding: 28px 30px;
  box-shadow: 0 4px 10px rgba(18,40,33,0.03);
}
.banner-title { font-size: 28px; margin:0; color:#215e4f; font-weight:700; }
.breadcrumb { margin-top:8px; color:#6f7e7a; font-size:13px; display:flex; gap:8px; align-items:center; }
.breadcrumb a { color:inherit; text-decoration:none; }
.sep { color:#cfdcd6; }
.hot-space { min-height: calc(100vh - 220px); } 
</style>
