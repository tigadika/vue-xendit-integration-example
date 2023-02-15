<template>
  <div
    class="w-full h-[32rem] bg-white border rounded-lg shadow-lg overflow-hidden flex flex-col justify-between"
  >
    <div class="">
      <img
        :src="product.thumbnail"
        alt="Placeholder image"
        class="w-full h-[15rem] object-cover"
      />
      <div class="px-4 py-3">
        <div class="text-xl mb-2">{{ titleTrim }}</div>
        <div class="font-bold text-xl mb-2">${{ product.price }}</div>
        <p class="text-gray-700 text-base">
          {{ descTrim }}
        </p>
      </div>
    </div>
    <button
      @click="cartAction"
      v-if="page === 'HomePage'"
      class="mx-auto mb-3 rounded-full bg-black text-white px-10 py-2 hover:bg-gray-800"
    >
      Add to Cart
    </button>
    <button
      @click="deleteFromCart"
      v-if="page === 'CartPage'"
      class="mx-auto mb-3 rounded-full bg-black text-white px-10 py-2 hover:bg-gray-800"
    >
      Remove
    </button>
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import { useProductStore } from "../stores/product";

export default {
  name: "ProductCard",
  props: ["product", "page"],
  computed: {
    ...mapWritableState(useProductStore, ["cart"]),
    descTrim() {
      let trimmed = this.product.description.split(" ");
      if (trimmed.length > 8) {
        return trimmed.slice(0, 8).join(" ").concat("... ");
      } else {
        return trimmed.join(" ");
      }
    },
    titleTrim() {
      let trimmed = this.product.title.split(" ");
      if (trimmed.length > 2) {
        return trimmed.slice(0, 2).join(" ").concat("... ");
      } else {
        return trimmed.join(" ");
      }
    },
  },
  methods: {
    cartAction() {
      this.cart.push(this.product);
    },
    deleteFromCart() {
      this.cart = this.cart.filter((el) => {
        return el.title !== this.product.title;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
