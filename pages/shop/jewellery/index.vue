<template>
  <div>
    <HeaderHeader6 />
    <Slider />
    <Category />
    <ProductSlider :products="products" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <Services />
    <Banner />
    <ProductTab :products="products" :category="category" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <Instagram />
    <FooterFooter2 />
    <WidgetsQuickview :openModal="showquickviewmodel" :productData="quickviewproduct"  @closeView="closeViewModal"/>
    <WidgetsComparePopup :openCompare="showcomparemodal" :productData="comapreproduct" @closeCompare="closeCompareModal" />
    <CartModalPopup :openCart="showcartmodal" :productData="cartproduct" @closeCart="closeCartModal" :products="products" />
    <WidgetsNewsletterPopup />
  </div>
</template>
<script>
import { mapState } from "pinia";
definePageMeta({
  layout: "custom"
})
import Slider from '../../../components/shop/jewellery/slider.vue'
import Category from '../../../components/shop/jewellery/category'
import ProductSlider from '../../../components/shop/jewellery/product-slider'
import Services from '../../../components/shop/jewellery/services'
import Banner from '../../../components/shop/jewellery/parallax-banner'
import ProductTab from '../../../components/shop/jewellery/product-tab'
import Instagram from '../../../components/shop/jewellery/instagram'
import { useProductStore } from "~~/store/products";

export default {
  components: {
    Slider,
    Category,
    ProductSlider,
    Services,
    Banner,
    ProductTab,
    Instagram,
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
      productslist: 'productslist',
    }),
  },
  mounted() {
    this.productsArray()
  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === 'jewellery') {
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
