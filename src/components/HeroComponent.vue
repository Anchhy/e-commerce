<template>
  <div class="hero">
    <h2>{{ heading }}</h2>
    <p>{{ subText }}</p>
    <button>{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: 'HeroComponent',
  props: {
    heading: String,
    subText: String,
    buttonText: String
  }
}
</script>

<style scoped>
.hero {
  background: #e8f4ff;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
}
button {
  margin-top: 10px;
  background: #007bff;
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
}
</style>
