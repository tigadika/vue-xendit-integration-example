<template>
  <div class="flex flex-col h-screen">
    <div class="mx-auto pt-10 pb-20 flex flex-col w-5/6 space-y-10">
      <div class="mx-auto font-bold tracking-wide text-4xl">Testing Cart</div>
      <div class="flex flex-row justify-between">
        <button
          @click="goToHome"
          class="px-3 py-2 leading-tight bg-white text-gray-500 border rounded-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          Home
        </button>
      </div>
      <div class="mx-auto grid grid-cols-5 gap-4 w-full">
        <ProductCard
          v-for="product in cart"
          :key="product.id"
          :product="product"
          page="CartPage"
        />
      </div>
    </div>
    <CheckoutButton v-if="cart.length !== 0" />
  </div>
</template>

<script>
import { mapState } from "pinia";
import ProductCard from "../components/ProductCard.vue";
import { useProductStore } from "../stores/product";
import CheckoutButton from "../components/CheckoutButton.vue";

export default {
  name: "CartPage",
  components: {
    ProductCard,
    CheckoutButton,
  },
  computed: {
    ...mapState(useProductStore, ["cart"]),
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
