<template>
  <div class="category" :style="{ backgroundColor: bgColor }">
    <img :src="image" :alt="title" />
    <p :style="{ color: '#253D4E' }">{{ title }}</p>
    <span>{{ items }} items</span>
  </div>
</template>

<script>
export default {
  name: 'CategoryComponent',
  props: {
    image: String,
    title: String,
    items: Number,
    bgColor: String
  }
}
</script>

<style scoped>
.category {
  padding: 12px;
  text-align: center;
  border-radius: 10px;
  min-width: 120px;
}
.category img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.category p {
  margin: 8px 0 0;
  font-size: 14px;
  font-weight: 600;
}
.category span {
  display: block;
  color: #B6B6B6;
  font-size: 12px;
}

</style>
