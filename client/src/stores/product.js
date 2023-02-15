import { defineStore } from "pinia";
import axios from "axios";
import Swal from 'sweetalert2'

export const useProductStore = defineStore({
  id: "Product",
  state: () => ({
    products: [],
    cart: [],
    totalPage: [],
    currentPage: 1,
    isPayment: false,
    paymentInvoice: ""
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
        Swal.fire({
          icon: "success",
          title: "Success Fetch Data",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error Fetch Data",
          text: error,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
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
    },
    async checkoutHandler(total) {
      try {
        if (!this.isPayment) {
          const { data } = await axios({
            method: "post",
            url: "http://localhost:3000/invoice",
            data: {
              total,
              email: "testing@test.mail"
            }
          })
          if (data) window.open(data.data.invoice_url, "_blank") //? double-check response from axios, then open new tab
          this.paymentInvoice = data.data.id
          this.isPayment = true
        }
        Swal.fire({
          icon: "warning",
          title: "Waiting for payment",
          text: "Please complete your payment in the other tab",
          backdrop: "rgba(0,0,123,0.4)",
          confirmButtonText: "Check Payment Status"
        }).then((result) => {
          if (result.isConfirmed) {
            this.checkPayment()
          }
        })
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error Create Invoice",
          text: error,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    async checkPayment() {
      try {
        const { data } = await axios({
          method: "get",
          url: `http://localhost:3000/invoice/${this.paymentInvoice}`,
        })
        if (data.data.status === 'SETTLED') {
          this.isPayment = false
          this.cart = []
          Swal.fire({
            icon: "success",
            title: "Payment Complete",
            text: "Thank you for your order",
            backdrop: "rgba(0,0,123,0.4)",
          })
        } else {
          Swal.fire({
            icon: "warning",
            title: "Waiting for payment",
            text: "Your payment have not been completed. Please complete the payment",
            backdrop: "rgba(0,0,123,0.4)",
          })
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error Check Payment",
          text: error,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  }
})