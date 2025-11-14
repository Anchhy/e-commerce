<template>
  <div>
    <div class="categories">
      <CategoryComponent
        v-for="category in categories"
        :key="category.name"
        :image="category.image"
        :title="category.name"
        :items="category.productCount"
        :bgColor="category.color"
      />
    </div>

    <div class="promotions">
      <PromotionComponent
        v-for="promo in promotions"
        :key="promo.title"
        :title="promo.title"
        :description="promo.description"
        :buttonText="promo.buttonText"
        :image="promo.image"
        :bgColor="promo.color"
        :buttonColor="promo.buttonColor"
        :isLatest="promo.isLatest"
      />
    </div>
  </div>
</template>

<script>
import CategoryComponent from './components/CategoryComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'

export default {
  name: 'App',
  components: {
    CategoryComponent,
    PromotionComponent
  },
  data() {
    return {
      categories: [
        {
          name: "Cake & Milk",
          productCount: 26,
          color: "#feeceb",
          image: "src/images/cake.png"
        },
        {
          name: "Peach",
          productCount: 17,
          color: "#fff3ea",
          image: "src/images/peach.png"
        },
        {
          name: "Organic Kiwi",
          productCount: 22,
          color: "#ecfdf5",
          image: "src/images/kivi.png"
        },
        {
          name: "Red Apple",
          productCount: 60,
          color: "#fff1f2",
          image: "src/images/apple.png"
        },
        {
          name: "Snack",
          productCount: 34,
          color: "#fefce8",
          image: "src/images/snack.png"
        },
        {
          name: "Black plum",
          productCount: 23,
          color: "#f5f3ff",
          image: "src/images/plum.png"
        },
        {
          name: "Vegetables",
          productCount: 65,
          color: "#ecfdf5",
          image: "src/images/vegetables.png"
        },
        {
          name: "Headphone",
          productCount: 32,
          color: "#fefce8",
          image: "src/images/headphone.png"
        },
        {
          name: "Cake & Milk",
          productCount: 26,
          color: "#feeceb",
          image: "src/images/cake&milk.png"
        },
        {
          name: "Orange",
          productCount: 29,
          color: "#fff3ea",
          image: "src/images/orange.png"
        }
      ],
      promotions: [
        {
          title: "Everyday Fresh & Clean with Our Products",
          description: "",
          buttonText: "Shop Now →",
          image: "src/images/onion.png",
          color: "#F0E8D5",
          buttonColor: "#4caf50",
          isLatest: true  // Smaller image for onion
        },
        {
          title: "Make your Breakfast Healthy and Easy",
          description: "",
          buttonText: "Shop Now →",
          image: "src/images/milk.png",
          color: "#F3E8E8",
          buttonColor: "#4caf50",
          isLatest: false
        },
        {
          title: "The Best Organic Products Online",
          description: "",
          buttonText: "Shop Now →",
          image: "src/images/veggies.png",
          color: "#E7EAF3",
          buttonColor: "#ff9800",
          isLatest: false
        }
      ]
    };
  }
}
</script>

<style>
.categories {
  display: flex;
  gap: 12px;
  margin: 20px 0;
  overflow-x: auto;
  padding-bottom: 10px;
}
.promotions {
  display: flex;
  gap: 12px;
  margin: 20px 0;
}
</style>
