<template>
  <router-link
    :to="{ name: 'Category', params: { id: category.id } }"
    class="category-card"
    :style="{ backgroundColor: category.bgColor }"
  >
    <div class="thumb">
      <img :src="category.image" :alt="category.name" />
    </div>
    <div class="meta">
      <h4 class="name">{{ category.name }}</h4>
      <div class="count">{{ category.itemsCount }} items</div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({ category: Object });
</script>

<style scoped>
.category-card {
  display: block;
  width: 160px;
  min-width: 160px;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 6px 18px rgba(0,0,0,0.04);
  transition: transform .18s ease, box-shadow .18s ease;
  /* remove white background — background comes from inline style (category.bgColor) */
  background-clip: padding-box;
}
.category-card:hover { transform: translateY(-6px); box-shadow: 0 14px 30px rgba(0,0,0,0.06); }

.thumb {
  height: 82px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius: 10px;
  margin-bottom: 8px;
  /* make thumb transparent so the card color shows through */
  background: transparent;
  padding: 6px;
}
.thumb img { max-width: 72px; max-height: 72px; object-fit: contain; }

.name {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  color: #213d35;
}

.count {
  font-size: 12px;
  color: rgba(33,61,53,0.75);
  margin-top: 6px;
}
</style>
