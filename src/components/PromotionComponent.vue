<template>
  <div class="promotions-section">
    <div class="promotions-grid">
      <div
        v-for="promo in promotions"
        :key="promo.id"
        class="promotion-card"
        :style="{ backgroundColor: promo.bgColor }"
      >
        <div class="promo-content">
          <h3>{{ promo.title }}</h3>
          <button
            @click="shopPromo(promo)"
            :style="{ backgroundColor: promo.buttonColor }"
            class="promo-btn"
          >
            {{ promo.buttonText || 'Shop Now' }}
          </button>
        </div>
        <div v-if="promo.image" class="promo-image">
          <img :src="promo.image" :alt="promo.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useProductStore } from '../stores/product'

export default {
  name: 'PromotionComponent',
  computed: {
    ...mapState(useProductStore, ['promotions'])
  },
  methods: {
    shopPromo(promo) {
      this.$emit('promo-selected', promo)
    }
  }
}
</script>

<style scoped>
.promotions-section {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.promotions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.promotion-card {
  border-radius: 8px;
  padding: 25px;
  min-height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  position: relative;
  overflow: hidden;
}

.promo-content {
  flex: 1;
  z-index: 2;
}

.promo-content h3 {
  font-size: 18px;
  margin: 0 0 15px 0;
  line-height: 1.4;
  font-weight: 600;
  color: #333;
}

.promo-btn {
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s;
}

.promo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.promo-image {
  flex: 0 0 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-left: 20px;
}

.promo-image img {
  max-width: 100%;
  max-height: 160px;
  object-fit: contain;
}

@media (max-width: 1024px) {
  .promotions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .promotions-grid {
    grid-template-columns: 1fr;
  }

  .promotion-card {
    flex-direction: column;
    text-align: center;
    min-height: auto;
  }

  .promo-image {
    flex: 1;
    margin-left: 0;
    margin-top: 15px;
  }
}
</style>
