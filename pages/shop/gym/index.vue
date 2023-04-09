<template>
  <div>
    <HeaderHeader7 />
    <Slider />
    <Collectionbanner />
    <ProductList
      :products="products"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <TopCollection
      :products="products"
      :category="category"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <Blog :blog="blog" />

    <Instagram />
    <LogoSlider />
    <FooterFooter6 />
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
import { useBlogStore } from "~~/store/blog";

import Slider from "../../../components/shop/gym/slider.vue";
import Collectionbanner from "../../../components/shop/gym/collection-banner";
import ProductList from "../../../components/shop/gym/product-list";
import TopCollection from "../../../components/shop/gym/top-collection";
import Blog from "../../../components/shop/gym/blog";
import Instagram from "../../../components/shop/gym/instagram";
import LogoSlider from "../../../components/shop/gym/logo-slider";
export default {
  components: {
    Slider,
    Collectionbanner,
    ProductList,
    TopCollection,
    Blog,
    Instagram,
    LogoSlider,
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
      document.documentElement.style.setProperty("--theme-deafult", "#01effc");
      document.documentElement.style.setProperty(
        "--theme-gradient1",
        "#01effc"
      );
      document.documentElement.style.setProperty(
        "--theme-gradient2",
        "#485ff2"
      );
    }
  },
  beforeDestroy() {
    if (process.client) {
      document.documentElement.style.removeProperty("--theme-deafult");
      document.documentElement.style.removeProperty("--theme-gradient1");
      document.documentElement.style.removeProperty("--theme-gradient2");
    }
  },
  methods: {
    productsArray: function() {
      this.productslist.map((item) => {
        if (item.type === "gym") {
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
        if (item.type === 'gym') {
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
