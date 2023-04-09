<template>
<div class="tools-bg">
    <HeaderHeader5 />
    <Slider />
    <Services />
    <About />
    <Category />
    <ProductSlider :products="products" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <SelectVehical :products="products" :category="category" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <ProducttabSlider :products="products" :category="category" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <LogoSlider />
    <FooterFooter5 />
    <WidgetsQuickview :openModal="showquickviewmodel" :productData="quickviewproduct" @closeView="closeViewModal"/>
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
import Slider from '../../../components/shop/tools/slider'
import Services from '../../../components/shop/tools/service'
import About from '../../../components/shop/tools/about'
import Category from '../../../components/shop/tools/category'
import ProductSlider from '../../../components/shop/tools/product-slider'
import SelectVehical from '../../../components/shop/tools/select-vehical'
import ProducttabSlider from '../../../components/shop/tools/product-tab-slider'
import LogoSlider from '../../../components/shop/tools/logo_slider'
import { useProductStore } from "~~/store/products";

export default {
  components: {
    
    Slider,
    Services,
    About,
    Category,
    ProductSlider,
    SelectVehical,
    ProducttabSlider,
    LogoSlider,
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
        if (item.type === 'tools') {
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
