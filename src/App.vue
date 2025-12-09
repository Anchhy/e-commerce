<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Quicksand', sans-serif;
  background: #f8f9fa;
  color: #253d4e;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background: #3bb77e;
  color: #fff;
}
</style>
