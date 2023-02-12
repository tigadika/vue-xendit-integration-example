<template>
  <ul class="inline-flex -space-x-px">
    <li v-if="currentPage !== 1">
      <a @click.prevent="doPaginationPrev" href="#"
        class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">Prev</a>
    </li>
    <li v-for="number in totalPage" :key="number" :number="number">
      <a @click.prevent="doPagination(number)" href="#"
        class="px-3 py-2 leading-tight bg-white text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        :class="{ 'bg-gray-100': currentPage === number }">{{
          number
        }}</a>
    </li>
    <li v-if="currentPage !== totalPage[totalPage.length - 1]">
      <a @click.prevent="doPaginationNext" href="#"
        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
    </li>
  </ul>
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import { useProductStore } from '../stores/product';

export default {
  computed: {
    ...mapState(useProductStore, ['totalPage']),
    ...mapWritableState(useProductStore, ['currentPage'])
  },
  methods: {
    doPagination(number) {
      this.currentPage = number
    },
    doPaginationPrev() {
      this.currentPage !== 1 ? this.currentPage -= 1 : 1
    },
    doPaginationNext() {
      console.log(this.currentPage, this.totalPage[this.totalPage.length - 1]);
      this.currentPage !== this.totalPage[this.totalPage.length - 1] ? this.currentPage += 1 : this.currentPage = this.totalPage[this.totalPage.length - 1]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>