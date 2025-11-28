<template>
  <div class="categories-section">
    <div class="header">
      <h2>Featured Categories</h2>
      <div class="filter-tabs">
        <button
          v-for="group in groups"
          :key="group.id"
          @click="currentGroupName = group.name"
          :class="{ active: currentGroupName === group.name }"
          class="tab"
        >
          {{ group.name }}
        </button>
      </div>
    </div>
    <div class="category-grid">
      <div
        v-for="(category, index) in filteredCategories"
        :key="category.id"
        class="category-card"
        :style="{ backgroundColor: getCategoryColor(index) }"
        @click="selectCategory(category.id)"
      >
        <div class="category-image">
          <img :src="category.image" :alt="category.name" />
        </div>
        <p class="category-name">{{ category.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useProductStore } from '../stores/product'

export default {
  name: 'CategoryComponent',
  data() {
    return {
      currentGroupName: 'Milks & Dairies',
      colors: ['#f5e6d3', '#ffd9e6', '#e6f2ff', '#fff0e6', '#e6ffe6', '#ffe6f0', '#f0e6ff', '#ffffe6', '#e6f5ff', '#fff5e6']
    }
  },
  computed: {
    ...mapState(useProductStore, ['groups', 'categories']),
    filteredCategories() {
      return this.categories.filter(cat => cat.group === this.currentGroupName)
    }
  },
  methods: {
    getCategoryColor(index) {
      return this.colors[index % this.colors.length]
    },
    selectCategory(categoryId) {
      this.$emit('category-selected', categoryId)
    }
  }
}
</script>

<style scoped>
.categories-section {
  margin: 0 0 50px 0;
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-wrap: wrap;
  gap: 20px;
}

.header h2 {
  font-size: 20px;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.filter-tabs {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.tab {
  padding: 6px 12px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
  color: #666;
  font-weight: 500;
  border-radius: 4px;
}

.tab:hover {
  color: #1ba98e;
  background-color: rgba(27, 169, 142, 0.05);
}

.tab.active {
  color: #1ba98e;
  font-weight: 600;
  background-color: rgba(27, 169, 142, 0.08);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 15px;
  max-width: 100%;
}

.category-card {
  text-align: center;
  cursor: pointer;
  padding: 15px 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background-color: white;
  min-height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.category-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  border-color: rgba(27, 169, 142, 0.2);
}

.category-image {
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.category-image img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.category-name {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
  word-break: break-word;
}

@media (max-width: 1024px) {
  .category-grid {
    grid-template-columns: repeat(6, 1fr);
  }

  .categories-section {
    padding: 25px;
  }
}

@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
  }

  .category-card {
    min-height: 120px;
    padding: 12px 8px;
  }

  .category-image {
    height: 75px;
    margin-bottom: 10px;
  }

  .category-name {
    font-size: 11px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .filter-tabs {
    width: 100%;
    overflow-x: auto;
  }

  .categories-section {
    padding: 20px;
    margin: 0 0 30px 0;
  }
}

@media (max-width: 480px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .category-card {
    min-height: 110px;
    padding: 10px 6px;
  }

  .category-image {
    height: 65px;
    margin-bottom: 8px;
  }

  .categories-section {
    padding: 15px;
    margin: 0 0 20px 0;
  }
}
</style>
