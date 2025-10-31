<template>
   <header>

    <div class="wrapper">

    </div>
  </header>
  <div>
    <div class="categories">
      <CategoryComponent image="src/images/cake.png" title="Cake & Milk" :items="26" bgColor="#feeceb" />
      <CategoryComponent image="src/images/peach.png" title="Peach" :items="17" bgColor="#fff3ea" />
      <CategoryComponent image="src/images/kivi.png" title="Organic Kiwi" :items="22" bgColor="#ecfdf5" />
      <CategoryComponent image="src/images/apple.png" title="Red Apple" :items="60" bgColor="#fff1f2" />
      <CategoryComponent image="src/images/snack.png" title="Snack" :items="34" bgColor="#fefce8" />
      <CategoryComponent image="src/images/plum.png" title="Black plum" :items="23" bgColor="#f5f3ff" />
      <CategoryComponent image="src/images/vegetables.png" title="Vegetables" :items="65" bgColor="#ecfdf5" />
      <CategoryComponent image="src/images/headphone.png" title="Headphone" :items="32" bgColor="#fefce8" />
      <CategoryComponent image="src/images/cake&milk.png" title="Cake & Milk" :items="26" bgColor="#feeceb" />
      <CategoryComponent image="src/images/orange.png" title="Orange" :items="29" bgColor="#fff3ea" />
    </div>

    <div class="promotions">
      <PromotionComponent
        title="Everyday Fresh & Clean with Our Products"
        description=""
        buttonText="Shop Now →"
        image="src/images/onion.png"
        bgColor="#F0E8D5"
        buttonColor="#4caf50"
      />
      <PromotionComponent
        title="Make your Breakfast Healthy and Easy"
        description=""
        buttonText="Shop Now →"
        image="src/images/milk.png"
        bgColor="#F3E8E8"
        buttonColor="#4caf50"
      />
      <PromotionComponent
        title="The Best Organic Products Online"
        description=""
        buttonText="Shop Now →"
        image="src/images/veggies.png"
        bgColor="#E7EAF3"
        buttonColor="#ff9800"
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
