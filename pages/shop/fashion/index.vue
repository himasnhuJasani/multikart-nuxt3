<template>
    <div>
      <Slider />
      <CollectionBanner />
      <ProductSlider :products="products" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
      <Banner />
      <ProductTab :products="products" :category="category" @openQuickview="showQuickview" @openCompare="showCoampre" @openCart="showCart" />
      <Services />
    <Blog :blog="blog" />
      <Instagram />
      <LogoSlider />
      <quickviewModel :openModal="showquickviewmodel" :productData="quickviewproduct" @closeView="closeViewModal"/>
      <compareModel :openCompare="showcomparemodal" :productData="comapreproduct" @closeCompare="closeCompareModal" />
      <cartModel :openCart="showcartmodal" :productData="cartproduct" @closeCart="closeCartModal" :products="products" />
      <newsletterModel />
    </div>
  </template>
  <script>
  import { mapState } from 'pinia'
  import { useProductStore } from '~~/store/products'

  import quickviewModel from '../../../components/widgets/quickview.vue'
  import compareModel from '../../../components/widgets/compare-popup.vue'
  import cartModel from '../../../components/cart-modal/cart-modal-popup.vue'
  import newsletterModel from '../../../components/widgets/newsletter-popup'
  import Slider from '../../../components/shop/fashion/slider.vue'
  import CollectionBanner from '../../../components/shop/fashion/collection_banner.vue'
  import ProductSlider from '../../../components/shop/fashion/product_slider.vue'
  import Banner from '../../../components/shop/fashion/banner'
  import ProductTab from '../../../components/shop/fashion/product_tab'
  import Services from '../../../components/shop/fashion/services'
  import Blog from '../../../components/shop/fashion/blog'
  import Instagram from '../../../components/shop/fashion/instagram'
  import LogoSlider from '../../../components/shop/fashion/logo_slider'
import { useBlogStore } from "~~/store/blog";
  
  export default {
    components: {
      Slider,
      CollectionBanner,
      ProductSlider,
      Banner,
      ProductTab,
      Services,
      Blog,
      Instagram,
      LogoSlider,
      quickviewModel,
      compareModel,
      cartModel,
      newsletterModel
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
        productslist: 'productslist'
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
          if (item.type === 'fashion') {
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
        if (item.type === 'fashion') {
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
  