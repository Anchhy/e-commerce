<template>
  <nav class="menu">
    <div class="menu-container">
      <div class="logo">
        <h1>Nestle</h1>
      </div>
      <ul class="menu-items">
        <li v-for="group in groups" :key="group.id">
          <a href="#" @click.prevent="selectGroup(group.name)">
            {{ group.name }}
          </a>
        </li>
      </ul>
      <div class="search-cart">
        <input type="text" placeholder="Search..." class="search-input" />
        <button class="cart-btn">🛒</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'pinia'
import { useProductStore } from '../stores/product'

export default {
  name: 'MenuComponent',
  computed: {
    ...mapState(useProductStore, ['groups'])
  },
  methods: {
    selectGroup(groupName) {
      this.$emit('group-selected', groupName)
    }
  }
}
</script>

<style scoped>
.menu {
  background-color: white;
  border-bottom: 1px solid #e8e8e8;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.menu-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  gap: 40px;
}

.logo h1 {
  font-size: 24px;
  margin: 0;
  color: #2c3e50;
  font-weight: 700;
}

.menu-items {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 25px;
  flex: 1;
}

.menu-items a {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  font-size: 13px;
  transition: color 0.3s;
}

.menu-items a:hover {
  color: #4caf50;
}

.search-cart {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  padding: 8px 14px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  width: 180px;
  font-size: 12px;
  background-color: #fafafa;
}

.search-input:focus {
  outline: none;
  border-color: #4caf50;
  background-color: white;
}

.cart-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
}

.cart-btn:hover {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .menu-container {
    gap: 20px;
  }

  .menu-items {
    gap: 15px;
    flex-wrap: wrap;
  }

  .search-input {
    width: 120px;
  }
}
</style>
