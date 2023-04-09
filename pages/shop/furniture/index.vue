<template>
  <div>
    <HeaderHeader2 />
    <Slider />
    <CollectionBanner />
    <ProductCategoryTab
      :products="products"
      :category="category"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <ParallaxBanner />
    <Blog :blog="blog" />
    <Footer />
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
    <CartModalPopup
      :openCart="showcartmodal"
      :productData="cartproduct"
      @closeCart="closeCartModal"
      :products="products"
    />
    <WidgetsNewsletterPopup />
  </div>
</template>
<script>
import { mapState } from "pinia";
definePageMeta({
  layout: "custom"
})

import Slider from "../../../components/shop/furniture/slider.vue";
import CollectionBanner from "../../../components/shop/furniture/collection_banner";
import ProductCategoryTab from "../../../components/shop/furniture/category_tab";
import ParallaxBanner from "../../../components/shop/furniture/parallax_banner";
import Blog from "../../../components/shop/furniture/blog";
import { useProductStore } from "~~/store/products";
import { useBlogStore } from "~~/store/blog";

export default {
  name: "furniture",
  components: {
    Slider,
    CollectionBanner,
    ProductCategoryTab,
    ParallaxBanner,
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
  methods: {
    productsArray: function() {
      this.productslist.map((item) => {
        if (item.type === "furniture") {
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
        if (item.type === 'furniture') {
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
    showCart(item, productData) {
      this.showcartmodal = item;
      this.cartproduct = productData;
    },
    closeCartModal(item) {
      this.showcartmodal = item;
    },
    closeViewModal(item){
        this.showquickviewmodel= item
      }
  },
};
</script>
