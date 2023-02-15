<template>
  <div class="fixed bottom-0 left-0 w-full py-6">
    <div
      class="flex flex-row w-1/2 justify-between bg-white border py-3 px-5 mx-auto rounded-full shadow-2xl"
    >
      <div class="py-2 w-2/3 text-center">
        Total: ${{ countUsd }} - {{ countRupiah }}
      </div>
      <button
        @click="goToCheckout"
        class="w-1/3 rounded-full bg-black text-white px-10 py-2 hover:bg-gray-800"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProductStore } from "../stores/product";

export default {
  name: "CheckoutButton",
  data() {
    return {
      total: 0,
    };
  },
  computed: {
    ...mapState(useProductStore, ["cart"]),
    countUsd() {
      return this.cart.reduce((acc, val) => {
        return acc + val.price;
      }, 0);
    },
    countRupiah() {
      const totalPrice =
        this.cart.reduce((acc, val) => {
          return acc + val.price;
        }, 0) * 15000;

      this.total = totalPrice;

      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(this.total);
    },
  },
  methods: {
    ...mapActions(useProductStore, ["checkoutHandler"]),
    goToCheckout() {
      this.checkoutHandler(this.total);
    },
  },
};
</script>

<style lang="scss" scoped></style>
