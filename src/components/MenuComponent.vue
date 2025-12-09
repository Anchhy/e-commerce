<template>
  <nav class="menu">
    <ul>
      <li v-for="category in categories" :key="category.id">
        <router-link :to="`/categories/${category.id}`">{{ category.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useProductStore } from '../store/productStore';
import { computed, onMounted } from 'vue';

const store = useProductStore();
onMounted(() => {
  store.fetchCategories();
});

const categories = computed(() => store.categories.length ? store.categories : store.fallbackCategories);
</script>

<style scoped>
.menu {
  display: flex;
  gap: 20px;
}
.menu ul {
  list-style: none;
  display: flex;
  gap: 15px;
}
.menu li a {
  text-decoration: none;
  color: #333;
}
</style>
