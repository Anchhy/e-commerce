<template>
  <div class="hero-container">
    <div v-for="(hero, index) in heroes" :key="index" class="hero-card" :style="{ backgroundColor: hero.bg }">
      <h2>{{ hero.title }}</h2>
      <p>{{ hero.subtitle }}</p>

      <button class="shop-btn">Shop Now</button>

      <img :src="getImage(hero.image)" class="hero-img" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroComponent",
  methods: {
    getImage(file) {
      return new URL(`../assets/images/${file}`, import.meta.url).href;
    }
  },
  data() {
    return {
      heroes: [
        {
          title: "Everyday Fresh & Clean",
          subtitle: "with Our Products",
          image: "onion.png",
          bg: "#f3e7d3"
        },
        {
          title: "Make your Breakfast Healthy and Easy",
          subtitle: "",
          image: "juice.png",
          bg: "#efe1e1"
        },
        {
          title: "The Best Organic Products Online",
          subtitle: "",
          image: "vegetable.png",
          bg: "#e5edf7"
        }
      ]
    };
  }
};
</script>
