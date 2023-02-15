<template>
  <div class="flex flex-col h-screen">
    <div class="mx-auto pt-10 flex flex-col w-5/6 space-y-10">
      <div class="mx-auto font-bold tracking-wide text-4xl">
        Testing Product
      </div>
      <!-- Top nav and pagination -->
      <div class="flex flex-row justify-between">
        <div class="inline-flex relative w-fit">
          <div
            v-if="cart.length > 0"
            class="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 py-1 px-2.5 text-xs leading-none text-center whitespace-nowrap align-baseline font-bold bg-indigo-700 text-white rounded-full z-10"
          >
            {{ cart.length }}
          </div>
          <button
            @click="goToCart"
            class="px-3 py-2 leading-tight bg-white text-gray-500 border rounded-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          >
            Cart
          </button>
        </div>
        <ButtonPage />
      </div>
      <!-- CARD-->
      <div class="mx-auto grid grid-cols-5 gap-4 w-full">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          page="HomePage"
        />
      </div>
      <!-- Pagination bottom page-->
      <div class="mx-auto mt-5">
        <ButtonPage />
      </div>
    </div>
    <CheckoutButton v-if="cart.length !== 0" />
    <div class="w-full py-8 mt-10 text-center">
      Demo made with love by tigadika
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import ButtonPage from "../components/ButtonPage.vue";
import { mapActions, mapState } from "pinia";
import { useProductStore } from "@/stores/product";
import CheckoutButton from "../components/CheckoutButton.vue";
export default {
  name: "HomePage",
  components: {
    ProductCard,
    ButtonPage,
    CheckoutButton,
  },
  computed: {
    ...mapState(useProductStore, ["products", "currentPage", "cart"]),
  },
  methods: {
    ...mapActions(useProductStore, ["fetchProduct"]),
    goToCart() {
      this.$router.push("/cart");
    },
  },
  watch: {
    currentPage(newVal) {
      this.fetchProduct(newVal);
    },
  },
  created() {
    if (Object.keys(this.products).length === 0) {
      this.fetchProduct();
    }
  },
};
</script>

<style lang="scss" scoped></style>
