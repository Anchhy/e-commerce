<template>
  <div class="filter-bar">
    <div class="filter-header">
      <h3>Filters</h3>
      <button @click="resetFilters" class="reset-btn">Reset</button>
    </div>

    <div class="filter-group">
      <h4>Price Range</h4>
      <input v-model.number="priceRange[0]" type="range" min="0" max="100" @input="applyFilters" />
      <input v-model.number="priceRange[1]" type="range" min="0" max="100" @input="applyFilters" />
      <p>${{ priceRange[0] }} - ${{ priceRange[1] }}</p>
    </div>

    <div class="filter-group">
      <h4>Rating</h4>
      <label v-for="rating in [5, 4, 3, 2, 1]" :key="rating">
        <input v-model="selectedRating" :value="rating" type="checkbox" @change="applyFilters" />
        {{ rating }} ⭐ & up
      </label>
    </div>

    <div class="filter-group">
      <h4>Availability</h4>
      <label>
        <input v-model="inStock" type="checkbox" @change="applyFilters" />
        In Stock Only
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterBarComponent',
  data() {
    return {
      priceRange: [0, 100],
      selectedRating: [],
      inStock: false
    }
  },
  methods: {
    applyFilters() {
      this.$emit('filters-changed', {
        priceRange: this.priceRange,
        rating: this.selectedRating,
        inStock: this.inStock
      })
    },
    resetFilters() {
      this.priceRange = [0, 100]
      this.selectedRating = []
      this.inStock = false
      this.applyFilters()
    }
  }
}
</script>

<style scoped>
.filter-bar {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  min-width: 250px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-header h3 {
  margin: 0;
  color: #2c3e50;
}

.reset-btn {
  background-color: transparent;
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.filter-group {
  margin-bottom: 25px;
}

.filter-group h4 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 14px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.filter-group input[type="checkbox"],
.filter-group input[type="radio"] {
  margin-right: 8px;
  cursor: pointer;
}

.filter-group input[type="range"] {
  width: 100%;
  margin-bottom: 10px;
}

.filter-group p {
  margin: 10px 0 0 0;
  font-size: 14px;
  font-weight: bold;
  color: #4caf50;
}
</style>
