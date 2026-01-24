import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import HotDealsView from '../views/HotDealsView.vue';
import CategoryView from '../views/CategoryView.vue';
import ProductView from '../views/ProductView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/hot-deals', name: 'HotDeals', component: HotDealsView },
  { path: '/category/:id', name: 'Category', component: CategoryView, props: true },
  { path: '/product/:productId', name: 'Product', component: ProductView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
