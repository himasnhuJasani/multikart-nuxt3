<template>
  <div>
    <HeaderHeader2 />
    <Slider />
    <Services />
    <ProductSlider :products="products" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <Banner />
    <SpecialProducts :products="products" :category="category" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
    <Blog :blog="blog" />
    <Footer />
    <WidgetsQuickview :openModal="showquickviewmodel" :productData="quickviewproduct" @closeView="closeViewModal"/>
    <WidgetsComparePopup :openCompare="showcomparemodal" :productData="comapreproduct" @closeCompare="closeCompareModal" />
    <CartRightModel :openCart="showcartmodal" @closeCart="closeCart" />
    <WidgetsNewsletterPopup />
  </div>
</template>

<script>
import { mapState } from "pinia";
definePageMeta({
  layout: "custom"
})
import Slider from '../../../components/shop/vegetables/slider'
import Services from '../../../components/shop/vegetables/services'
import ProductSlider from '../../../components/shop/vegetables/product_slider'
import Banner from '../../../components/shop/vegetables/banner'
import SpecialProducts from '../../../components/shop/vegetables/special_products'
import Blog from '../../../components/shop/vegetables/blog'
import { useProductStore } from "~~/store/products";
import { useBlogStore } from "~~/store/blog";

export default {
  components: {
    Slider,
    Services,
    ProductSlider,
    Banner,
    SpecialProducts,
    Blog,
  },
  data() {
    return {
      blog:[],
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
    ...mapState(useBlogStore,{
          bloglist: 'bloglist'
        }),
  },
  mounted() {
    this.productsArray()
    this.blogArray()

  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === 'vegetables') {
          this.products.push(item)
          item.collection.map((i) => {
            const index = this.category.indexOf(i)
            if (index === -1) this.category.push(i)
          })
        }
      })
    },
    blogArray: function () {
      this.bloglist.map((item) => {
        if (item.type === 'watch') {
          this.blog.push(item)
          
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
    showCart(item) {
      this.showcartmodal = item
    },
    closeCart(item) {
      this.showcartmodal = item
    },
    closeViewModal(item){
        this.showquickviewmodel= item
      }
  }
}
</script>
