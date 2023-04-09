<template>
<div>
    <Slider />
    <CollectionBanner />
    <ProductSlider :products="products" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <ParallaxBanner />
    <CollectionSlider :products="products" :category="category" />
    <Instagram />
    <LogoSlider />
    <quickviewModel :openModal="showquickviewmodel" :productData="quickviewproduct" @closeView="closeViewModal"/>
    <compareModel :openCompare="showcomparemodal" :productData="comapreproduct" @closeCompare="closeCompareModal" />
    <cartModel :openCart="showcartmodal" :productData="cartproduct" @closeCart="closeCartModal" :products=products :category=category />
    <newsletterModel />
</div>
</template>

<script>
import { mapState } from 'pinia'
import { useProductStore } from '~~/store/products'

import quickviewModel from '../../../components/widgets/quickview'
import compareModel from '../../../components/widgets/compare-popup'
import cartModel from '../../../components/cart-modal/cart-modal-popup'
import newsletterModel from '../../../components/widgets/newsletter-popup'
import Slider from '../../../components/shop/kids/slider.vue'
import CollectionBanner from '../../../components/shop/kids/collection_banner'
import ProductSlider from '../../../components/shop/kids/product_slider'
import ParallaxBanner from '../../../components/shop/kids/parallax_banner'
import CollectionSlider from '../../../components/shop/kids/collection_slider'
import Instagram from '../../../components/shop/kids/instagram'
import LogoSlider from '../../../components/shop/kids/logo_slider'

export default {
  components: {
    Slider,
    CollectionBanner,
    ProductSlider,
    ParallaxBanner,
    CollectionSlider,
    Instagram,
    LogoSlider,
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
    ...mapState(useProductStore,{
      productslist:'productslist'
    }),

  },
  mounted() {
    this.productsArray()

  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === 'kids') {
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
    closeViewModal(item){
      this.showquickviewmodel= item
    }
  }
}
</script>
