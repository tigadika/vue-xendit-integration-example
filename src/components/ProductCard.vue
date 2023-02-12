<template>
  <div class="w-full h-[32rem] bg-white border rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
    <div class="">
      <img :src="product.thumbnail" alt="Placeholder image" class="w-full h-[15rem] object-cover">
      <div class="px-4 py-3">
        <div class="font-bold text-xl mb-2">{{ titleTrim }}</div>
        <p class="text-gray-700 text-base">
          {{ descTrim }}
        </p>
      </div>
    </div>
    <button @click="cartAction" class="mx-auto mb-3 rounded-full bg-black text-white px-10 py-2 hover:bg-gray-800">Add
      to
      Cart - ${{ product.price }}</button>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProductStore } from '../stores/product'

export default {
  name: "ProductCard",
  props: [
    'product'
  ],
  computed: {
    ...mapWritableState(useProductStore, ['cart']),
    descTrim() {
      let trimmed = this.product.description.split(" ")
      if (trimmed.length > 8) {
        return trimmed.slice(0, 8).join(" ").concat("... ")
      } else {
        return trimmed.join(" ")
      }
    },
    titleTrim() {
      let trimmed = this.product.title.split(" ")
      if (trimmed.length > 2) {
        return trimmed.slice(0, 2).join(" ").concat("... ")
      } else {
        return trimmed.join(" ")
      }
    }
  },
  methods: {
    cartAction() {
      console.log("cart action", this.cart);
      this.cart.push(this.product)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>