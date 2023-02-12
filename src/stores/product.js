import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore({
  id: "Product",
  state: () => ({
    products: [],
    cart: [],
    totalPage: [],
    currentPage: 1
  }),
  getters: {},
  actions: {
    async fetchProduct(skip) {
      try {
        let url = `https://dummyjson.com/products?limit=15&skip=0`
        if (skip) {
          skip = (skip - 1) * 15
          console.log(skip);
          url = `https://dummyjson.com/products?limit=15&skip=${skip}`
        }
        const { data } = await axios({
          url,
          method: 'GET'
        })
        this.products = data.products
        this.countPage(data)
      } catch (error) {
        console.log(error);
      }
    },
    countPage(products) {
      let numbers = Math.ceil(products.total / 15)
      let temp = []
      for (let i = 1; i <= numbers; i++) {
        temp.push(i)
      }
      this.totalPage = temp
      temp = []
    }
  }
})