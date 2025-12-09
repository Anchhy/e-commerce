import { defineStore } from 'pinia';
import axios from 'axios';

// Import all images at the top
import apple from '../images/apple.png';
import cake from '../images/cake.png';
import cakeMilk from '../images/cake&milk.png';
import chili from '../images/chili.png';
import corn from '../images/corn.png';
import freshApplesbannerBanner from '../images/fresh-apples-banner.png';
import headphone from '../images/headphone.png';
import kivi from '../images/kivi.png';
import lemon from '../images/lemon.png';
import mengo from '../images/mengo.png';
import milk from '../images/milk.png';
import onion from '../images/onion.png';
import orange from '../images/orange.png';
import orange2 from '../images/orange2.png';
import peach from '../images/peach.png';
import plum from '../images/plum.png';
import snack from '../images/snack.png';
import vegetables from '../images/vegetables.png';
import veggies from '../images/veggies.png';
import p6 from '../images/p6.png';
import p7 from '../images/p7.png';
import p8 from '../images/p8.png';
import p9 from '../images/p9.png';
import p10 from '../images/p10.png';

// Map filenames to imports
const imageMap = {
  'apple.png': apple,
  'cake.png': cake,
  'cake&milk.png': cakeMilk,
  'chili.png': chili,
  'corn.png': corn,
  'fresh-apples-banner.png': freshApplesbannerBanner,
  'headphone.png': headphone,
  'kivi.png': kivi,
  'lemon.png': lemon,
  'mengo.png': mengo,
  'milk.png': milk,
  'onion.png': onion,
  'orange.png': orange,
  'orange2.png': orange2,
  'peach.png': peach,
  'plum.png': plum,
  'snack.png': snack,
  'vegetables.png': vegetables,
  'veggies.png': veggies,
  'p6.png': p6,
  'p7.png': p7,
  'p8.png': p8,
  'p9.png': p9,
  'p10.png': p10,
};

function loadImage(name) {
  return imageMap[name] || imageMap['apple.png']; // fallback
}

export const useProductStore = defineStore('product', {
  state: () => ({
    categories: [],
    promotions: [
      {
        id: 1,
        title: 'Everyday Fresh & Clean with Our Products',
        subtitle: 'Handpicked daily',
        image: loadImage('onion.png'),
        bgColor: '#F5EBDD',
        buttonColor: '#29A56C',
        buttonText: 'Shop Now',
      },
      {
        id: 2,
        title: 'Make your Breakfast Healthy and Easy',
        subtitle: 'Quick and nutritious',
        image: loadImage('milk.png'),
        bgColor: '#F5E6EA',
        buttonColor: '#29A56C',
        buttonText: 'Shop Now',
      },
      {
        id: 3,
        title: 'The best Organic Products Online',
        subtitle: 'Fresh from the farm',
        image: loadImage('veggies.png'),
        bgColor: '#E7EAF3',
        buttonColor: '#FDC040',
        buttonText: 'Shop Now',
      },
    ],
    products: [],

    // Fallback data with dynamic image loading
    fallbackCategories: [
      { id: 1, name: 'Cake & Milk', group: 'Milks & Dairies', image: loadImage('cake&milk.png'), itemsCount: 14, bgColor: '#f2fce4' },
      { id: 2, name: 'Peach', group: 'Fruits', image: loadImage('peach.png'), itemsCount: 17, bgColor: '#fffceb' },
      { id: 3, name: 'Oganic Kiwi', group: 'Fruits', image: loadImage('kivi.png'), itemsCount: 21, bgColor: '#ecffec' },
      { id: 4, name: 'Red Apple', group: 'Fruits', image: loadImage('apple.png'), itemsCount: 68, bgColor: '#feefea' },
      { id: 5, name: 'Snack', group: 'Snacks', image: loadImage('snack.png'), itemsCount: 34, bgColor: '#fff3eb' },
      { id: 6, name: 'Black plum', group: 'Fruits', image: loadImage('plum.png'), itemsCount: 25, bgColor: '#f2fce4' },
      { id: 7, name: 'Vegetables', group: 'Vegetables', image: loadImage('vegetables.png'), itemsCount: 65, bgColor: '#ecffec' },
      { id: 8, name: 'Headphone', group: 'Pet Foods', image: loadImage('headphone.png'), itemsCount: 33, bgColor: '#fffceb' },
      { id: 9, name: 'Cake & Milk', group: 'Milks & Dairies', image: loadImage('cake&milk.png'), itemsCount: 54, bgColor: '#feefea' },
      { id: 10, name: 'Orange', group: 'Fruits', image: loadImage('orange.png'), itemsCount: 63, bgColor: '#fff3ff' }
    ],

    fallbackPromotions: [
      { id: 1, title: 'Everyday Fresh & Clean with Our Products', buttonText: 'Shop Now', bgColor: '#F0E8D5', buttonColor: '#1ba98e', image: loadImage('onion.png') },
      { id: 2, title: 'Make your Breakfast Healthy and Easy', buttonText: 'Shop Now', bgColor: '#f5d9e6', buttonColor: '#1ba98e', image: loadImage('milk.png') },
      { id: 3, title: 'The best Organic Products Online', buttonText: 'Shop Now', bgColor: '#E7EAF3', buttonColor: '#ff9800', image: loadImage('veggies.png') }
    ],

    fallbackProducts: [
      { id: 1, name: 'Seeds of Change Organic Quinoa', description: 'Hodo Foods', group: 'Fruits', categoryId: 1, price: 2.51, originalPrice: 2.99, image: loadImage('mengo.png'), rating: 4.5, reviews: 24, countSold: 125, stock: 15, badge: '-17%', quantity: 1 },
      { id: 2, name: 'All Natural Italian-Style Chicken Meatballs', description: 'Hodo Foods', group: 'Meats', categoryId: 2, price: 3.99, originalPrice: 4.99, image: loadImage('corn.png'), rating: 4.2, reviews: 18, countSold: 98, stock: 12, badge: 'Hot' },
      { id: 3, name: "Boomchickapop Sweet & Salty Kettle Corn", description: 'Hodo Foods', group: 'Snacks', categoryId: 3, price: 2.51, originalPrice: 3.49, image: loadImage('orange2.png'), rating: 4.4, reviews: 39, countSold: 150, stock: 20, badge: 'Sale' },
      { id: 4, name: 'Foster Farms Crispy Buffalo Wings', description: 'Hodo Foods', group: 'Meats', categoryId: 2, price: 5.25, originalPrice: 6.49, image: loadImage('chili.png'), rating: 4.1, reviews: 12, countSold: 80, stock: 18 },
      { id: 5, name: 'Blue Diamond Lightly Salted Almonds', description: 'Hodo Foods', group: 'Snacks', categoryId: 4, price: 6.10, originalPrice: 7.50, image: loadImage('lemon.png'), rating: 4.6, reviews: 45, countSold: 200, stock: 10, badge: 'Best' },
      { id: 6, name: 'Chobani Vanilla Greek Yogurt', description: 'Hodo Foods', group: 'Milks & Dairies', categoryId: 1, price: 1.99, originalPrice: 2.49, image: loadImage('p6.png'), rating: 4.3, reviews: 30, countSold: 110, stock: 20 },
      { id: 7, name: 'Canada Dry Ginger Ale - 2L', description: 'Hodo Foods', group: 'Beverages', categoryId: 3, price: 2.25, originalPrice: 2.99, image: loadImage('p7.png'), rating: 4.0, reviews: 9, countSold: 60, stock: 25, badge: 'Hot' },
      { id: 8, name: 'Stuffed Alaskan Salmon', description: 'Encore Seafoods', group: 'Meats', categoryId: 2, price: 12.99, originalPrice: 14.99, image: loadImage('p8.png'), rating: 4.7, reviews: 16, countSold: 40, stock: 8, badge: 'Sale' },
      { id: 9, name: "Gorton's Beer Battered Fish Fillets", description: 'Hodo Foods', group: 'Meats', categoryId: 2, price: 7.49, originalPrice: 8.99, image: loadImage('p9.png'), rating: 4.2, reviews: 22, countSold: 72, stock: 12 },
      { id: 10, name: "Haagen-Dazs Caramel Cone Ice Cream", description: 'Hodo Foods', group: 'Desserts', categoryId: 5, price: 4.99, originalPrice: 5.99, image: loadImage('p10.png'), rating: 4.8, reviews: 55, countSold: 210, stock: 16, badge: 'Hot' }
    ]
  }),

  getters: {
    getPopularProducts: (state) =>
      (state.products.length ? state.products : state.fallbackProducts).filter(p => p.countSold > 10),

    getProductsByCategory: (state) => (id) =>
      (state.products.length ? state.products : state.fallbackProducts).filter(p => p.categoryId == id)
  },

  actions: {
    async fetchCategories() {
      try {
        const res = await axios.get('http://localhost:3000/api/categories');
        this.categories = res.data;
      } catch {
        this.categories = this.fallbackCategories;
      }
    },
    async fetchPromotions() {
      try {
        const res = await axios.get('http://localhost:3000/api/promotions');
        this.promotions = res.data;
      } catch {
        this.promotions = this.fallbackPromotions;
      }
    },
    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:3000/api/products');
        this.products = res.data;
      } catch {
        this.products = this.fallbackProducts;
      }
    }
  }
});
