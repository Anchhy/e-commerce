import { defineStore } from 'pinia'

// Import all images
import onion from '@/images/onion.png'
import milk from '@/images/milk.png'
import vegetables from '@/images/vegetables.png'
import cakeMilk from '@/images/cake&milk.png'
import peach from '@/images/peach.png'
import kivi from '@/images/kivi.png'
import apple from '@/images/apple.png'
import snack from '@/images/snack.png'
import plum from '@/images/plum.png'
import lemon from '@/images/lemon.png'
import corn from '@/images/corn.png'
import orange from '@/images/orange.png'
import mengo from '@/images/mengo.png'
import p7 from '@/images/p7.png'
import p8 from '@/images/p8.png'
import p9 from '@/images/p9.png'
import headphone from '@/images/headphone.png'
import chili from '@/images/chili.png'
import orange2 from '@/images/orange2.png'
import p10 from '@/images/p10.png'
import cake from '@/images/cake.png'
import p6 from '@/images/p6.png'

export const useProductStore = defineStore('product', {
  state: () => ({
    groups: [
      { id: 1, name: 'All' },
      { id: 2, name: 'Milks & Dairies' },
      { id: 3, name: 'Coffes & Teas' },
      { id: 4, name: 'Pet Foods' },
      { id: 5, name: 'Meats' },
      { id: 6, name: 'Vegetables' },
      { id: 7, name: 'Fruits' }
    ],
    promotions: [
      {
        id: 1,
        title: 'Everyday Fresh & Clean with Our Products',
        description: '',
        buttonText: 'Shop Now',
        bgColor: '#f5e6d3',
        buttonColor: '#1ba98e',
        image: onion
      },
      {
        id: 2,
        title: 'Make your Breakfast Healthy and Easy',
        description: '',
        buttonText: 'Shop Now',
        bgColor: '#f5d9e6',
        buttonColor: '#1ba98e',
        image: milk
      },
      {
        id: 3,
        title: 'The best Organic Products Online',
        description: '',
        buttonText: 'Shop Now',
        bgColor: '#d9e6f5',
        buttonColor: '#ff9800',
        image: vegetables
      }
    ],
    categories: [
      { id: 1, name: 'Cake & Milk', group: 'Milks & Dairies', image: cake },
      { id: 2, name: 'Peach', group: 'Milks & Dairies', image: peach },
      { id: 3, name: 'Organic Kiwi', group: 'Milks & Dairies', image: kivi },
      { id: 4, name: 'Red Apple', group: 'Milks & Dairies', image: apple },
      { id: 5, name: 'Snack', group: 'Milks & Dairies', image: snack },
      { id: 6, name: 'Black plum', group: 'Milks & Dairies', image: plum },
      { id: 7, name: 'Vegetables', group: 'Milks & Dairies', image: vegetables },
      { id: 8, name: 'Headphone', group: 'Milks & Dairies', image: headphone },
      { id: 9, name: 'Corn', group: 'Milks & Dairies', image: cakeMilk },
      { id: 10, name: 'Orange', group: 'Milks & Dairies', image: orange }
    ],
    products: [
      { id: 1, name: 'Seeds of Orange Organic Quinoa, Brown, & Red Rice', description: 'Hodo Foods', group: 'Fruits', categoryId: 1, price: 2.51, originalPrice: 2.99, image: mengo, rating: 4.0, reviews: 0, countSold: 25, stock: 15, sale: true },
      { id: 2, name: 'All Natural Italian-Style Chicken Meatballs', description: 'Hodo Foods', group: 'Meats', categoryId: 2, price: 2.51, originalPrice: 2.99, image: corn, rating: 4.0, reviews: 0, countSold: 18, stock: 12, sale: false },
      { id: 3, name: 'Angie\'s Boomchickapop Sweet & Salty Kettle Corn', description: 'Hodo Foods', group: 'Snacks', categoryId: 3, price: 2.51, originalPrice: 2.99, image: orange2, rating: 4.0, reviews: 0, countSold: 30, stock: 20, sale: true },
      { id: 4, name: 'Foster Farms Takeout Crispy Classic Buffalo wings', description: 'Hodo Foods', group: 'Meats', categoryId: 2, price: 2.51, originalPrice: 2.99, image: chili, rating: 4.0, reviews: 0, countSold: 22, stock: 18, sale: false },
      { id: 5, name: 'Blue Diamond Almonds Lightly Salted Vegetables', description: 'Hodo Foods', group: 'Snacks', categoryId: 3, price: 2.51, originalPrice: 2.99, image: lemon, rating: 4.0, reviews: 0, countSold: 35, stock: 25, sale: false },
      { id: 6, name: 'Chobani Complete Vanilla Greek Yogurt', description: 'Hodo Foods', group: 'Dairies', categoryId: 1, price: 2.51, originalPrice: 2.99, image: p6, rating: 4.0, reviews: 0, countSold: 16, stock: 14, sale: false },
      { id: 7, name: 'Canada Dry Ginger Ale - 2 L Bottle - 200ml - 400g', description: 'Hodo Foods', group: 'Drinks', categoryId: 4, price: 2.51, originalPrice: 2.99, image: p7, rating: 4.0, reviews: 0, countSold: 12, stock: 10, sale: true },
      { id: 8, name: 'Encore Seafoods Stuffed Alaskan Salmon', description: 'Hodo Foods', group: 'Meats', categoryId: 2, price: 2.51, originalPrice: 2.99, image: p8, rating: 4.0, reviews: 0, countSold: 28, stock: 16, sale: false },
      { id: 9, name: 'Gorton\'s Beer Battered Fish Fillets with soft paper', description: 'Hodo Foods', group: 'Meats', categoryId: 2, price: 2.51, originalPrice: 2.99, image: p9, rating: 4.0, reviews: 0, countSold: 19, stock: 13, sale: true },
      { id: 10, name: 'Haagen-Dazs Caramel Cone Ice Cream Ketchup', description: 'Hodo Foods', group: 'Dairies', categoryId: 1, price: 2.51, originalPrice: 2.99, image: p10, rating: 4.0, reviews: 0, countSold: 40, stock: 30, sale: false }
    ]
  }),
  getters: {
    getCategoriesByGroup: (state) => {
      return (groupName) => state.categories.filter((category) => category.group === groupName)
    },
    getProductsByGroup: (state) => {
      return (groupName) => state.products.filter((product) => product.group === groupName)
    },
    getProductsByCategory: (state) => {
      return (categoryId) => state.products.filter((product) => product.categoryId === categoryId)
    },
    getPopularProducts: (state) => {
      return state.products.filter((product) => product.countSold > 10)
    }
  },
  actions: {
    async fetchGroups() {
      try {
        const response = await fetch('http://localhost:3000/api/groups')
        this.groups = await response.json()
      } catch (error) {
        console.error('Error fetching groups:', error)
      }
    },
    async fetchCategories() {
      try {
        const response = await fetch('http://localhost:3000/api/categories')
        this.categories = await response.json()
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    async fetchPromotions() {
      try {
        const response = await fetch('http://localhost:3000/api/promotions')
        this.promotions = await response.json()
      } catch (error) {
        console.error('Error fetching promotions:', error)
      }
    },
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/api/products')
        this.products = await response.json()
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
  }
})
