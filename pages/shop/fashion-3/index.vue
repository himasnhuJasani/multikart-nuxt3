<template>
  <div class="box-layout-body">

    <Slider />
    <div class="container box-layout bg-image">
      <ProductSlider :products="products" @openQuickview="showQuickview" @openCompare="showCoampre"
        @openCart="showCart" />
      <Banner />
      <ProductTab :products="products" :category="category" @openQuickview="showQuickview" @openCompare="showCoampre"
        @openCart="showCart" />
    </div>
    <quickviewModel :openModal="showquickviewmodel" :productData="quickviewproduct" @clos="closeViewModal" />
    <compareModel :openCompare="showcomparemodal" :productData="comapreproduct" @closeCompare="closeCompareModal" />
    <cartModel :openCart="showcartmodal" :productData="cartproduct" @closeCart="closeCartModal" :products=products
      :category=category />
    <newsletterModel />
  </div>
</template>
<script>
import { mapState } from 'pinia'
import { useProductStore } from '~~/store/products'

import quickviewModel from '../../../components/widgets/quickview'
import compareModel from '../../../components/widgets/compare-popup'
import cartModel from '../../../components/cart-modal/cart-modal-popup.vue'
import newsletterModel from '../../../components/widgets/newsletter-popup'
import Slider from '../../../components/shop/fashion-3/slider'
import ProductSlider from '../../../components/shop/fashion-3/product_slider'
import Banner from '../../../components/shop/fashion-3/banner'
import ProductTab from '../../../components/shop/fashion-3/product_tab'

export default {
  components: {
    Slider,
    ProductSlider,
    Banner,
    ProductTab,
    quickviewModel,
    compareModel,
    cartModel,
    newsletterModel
  },
  data() {
    return {
      products: [],
      category: [],
      showquickviewmodel: false,
      showcomparemodal: false,
      showcartmodal: false,
      quickviewproduct: {},
      comapreproduct: {},
      cartproduct: {}
    }
  },
  computed: {
    ...mapState(useProductStore, {
      productslist: 'productslist'
    })
  },
  mounted() {
    this.productsArray()
  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === 'fashion') {
          this.products.push(item)
          item.collection.map((i) => {
            const index = this.category.indexOf(i)
            if (index === -1) this.category.push(i)
          })
        }
      })
    },
    showQuickview(item, productData) {
      this.showquickviewmodel = item
      this.quickviewproduct = productData
    },
    showCoampre(item, productData) {
      this.showcomparemodal = item
      this.comapreproduct = productData
    },
    closeCompareModal(item) {
      this.showcomparemodal = item
    },
    showCart(item, productData) {
      this.showcartmodal = item
      this.cartproduct = productData
    },
    closeCartModal(item) {
      this.showcartmodal = item
    },
    closeViewModal(item) {
      this.showquickviewmodel = item
    }
  }
}
</script>
