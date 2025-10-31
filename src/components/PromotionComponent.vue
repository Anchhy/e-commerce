<template>
 
  <div class="promotion" :style="{ backgroundColor: bgColor }">
    <div class="text">
      <h3>{{ title }}</h3>
      <p v-if="description">{{ description }}</p>
      <button :style="{ backgroundColor: buttonColor }">{{ buttonText }}</button>
    </div>
  <img :src="image" alt="promo" :class="['promo-image', isLatest ? 'latest' : 'other']" />
  </div>
</template>

<script>
export default {
  name: 'PromotionComponent',
  props: {
    title: String,
    description: String,
    buttonText: String,
    image: String,
    bgColor: String,
    isLatest: {
      type: Boolean,
      default: false
    },
    buttonColor: {
      type: String,
      default: '#4caf50'
    }
  }
}
</script>

<style scoped>
.promotion {
  position: relative;
  padding: 16px;
  border-radius: 10px;
  overflow: hidden;
  height: 300px;
}
.text {
  padding: 30px;
  position: relative;
  z-index: 1;
  max-width: 66%;
}
h3 {
  font-size: 22px;
  margin-top:40px;
  margin-bottom: 40px;
  line-height: 1.1;
  color: #2d3748;
}
button {
  border: none;
  color: rgba(243, 243, 244, 0.881);
  padding-top: 8px;
  padding-right: 15px;
  padding-bottom: 8px;
  padding-left: 15px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  width: 109.83333587646484px;
  height: 31px;
  opacity: 1;
  gap: 10px;
  transform: rotate(0deg);
}
.promo-image {
  position: absolute;
  bottom: 0;
  right: 0;
  width: auto;
  object-fit: contain;
}

.promo-image.latest {
  max-height: 30%;
}
.promo-image.other {
  max-height: 90%;
}
</style>
