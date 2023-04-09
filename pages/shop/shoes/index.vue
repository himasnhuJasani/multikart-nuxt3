<template>
  <div>
    <HeaderHeader2 />
    <Slider />
    <Category />
    <About />
    <CollectionBanner />
    <productSlider
      :products="products"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <Category2 />
    <CollectionSlider :products="products" :category="category" />
    <Category3 />
    <CollectionTab
      :products="products"
      :category="category"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <Blog :blog="blog" />
    <Service />
    <Instagram />
    <Brand />
    <FooterFooter2 />
    <WidgetsQuickview
      :openModal="showquickviewmodel"
      :productData="quickviewproduct"
      @closeView="closeViewModal"
    />
    <WidgetsComparePopup
      :openCompare="showcomparemodal"
      :productData="comapreproduct"
      @closeCompare="closeCompareModal"
    />
    <CartTopModel :openCart="showcartmodal" @closeCart="closeCart" />
    <WidgetsNewsletterPopup />
  </div>
</template>
<script>
import { mapState } from "pinia";
definePageMeta({
  layout: "custom"
})
import { useProductStore } from "~~/store/products";

import Slider from "../../../components/shop/shoes/slider";
import Category from "../../../components/shop/shoes/category";
import About from "../../../components/shop/shoes/about";
import CollectionBanner from "../../../components/shop/shoes/collectionbanner";
import productSlider from "../../../components/shop/shoes/productSlider";
import Category2 from "../../../components/shop/shoes/category2";
import CollectionSlider from "../../../components/shop/shoes/collectionslider.vue";
import Category3 from "../../../components/shop/shoes/category3";
import CollectionTab from "../../../components/shop/shoes/collectiontab";
import Blog from "../../../components/shop/shoes/blog";
import Service from "../../../components/shop/shoes/service";
import Instagram from "../../../components/shop/shoes/instagram";
import Brand from "../../../components/shop/shoes/brand";
import { useBlogStore } from "~~/store/blog";

export default {
  components: {
    Slider,
    Category,
    About,
    CollectionBanner,
    productSlider,
    Category2,
    CollectionSlider,
    Category3,
    CollectionTab,
    Blog,
    Service,
    Instagram,
    Brand,
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
      cartproduct: {},
    };
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
    this.productsArray();
    this.blogArray()

  },
  beforeMount() {
    if (process.client) {
      document.documentElement.style.setProperty("--theme-deafult", "#3fdda7");
    }
  },
  beforeDestroy() {
    if (process.client) {
      document.documentElement.style.removeProperty("--theme-deafult");
    }
  },
  methods: {
    productsArray: function() {
      this.productslist.map((item) => {
        if (item.type === "shoes") {
          this.products.push(item);
          item.collection.map((i) => {
            const index = this.category.indexOf(i);
            if (index === -1) this.category.push(i);
          });
        }
      });
    },
    blogArray: function () {
      this.bloglist.map((item) => {
        if (item.type === 'shoes') {
          this.blog.push(item)
          
        }
      })
    },
    showQuickview(item, productData) {
      this.showquickviewmodel = item;
      this.quickviewproduct = productData;
    },
    showCoampre(item, productData) {
      this.showcomparemodal = item;
      this.comapreproduct = productData;
    },
    closeCompareModal(item) {
      this.showcomparemodal = item;
    },
    showCart(item) {
      this.showcartmodal = item;
    },
    closeCart(item) {
      this.showcartmodal = item;
    },
    closeViewModal(item){
        this.showquickviewmodel= item
      }
  },
};
</script>
