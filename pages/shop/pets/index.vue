<template>
  <div>
    <HeaderHeader8 />
    <Slider />
    <LogoSlider />
    <Collectionbanner />
    <TopCollection
      :products="products"
      :category="category"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <Banner />
    <ProductSlider
      :products="products"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <Blog :blog="blog" />
    <FooterFooter7 />
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
    <CartRightModel :openCart="showcartmodal" @closeCart="closeCart" />
    <WidgetsNewsletterPopup />
  </div>
</template>
<script>
import { mapState } from "pinia";
definePageMeta({
  layout: "custom"
})
import Slider from "../../../components/shop/pets/slider.vue";
import LogoSlider from "../../../components/shop/pets/logo-slider";
import Collectionbanner from "../../../components/shop/pets/collection-banner";
import TopCollection from "../../../components/shop/pets/top-collection";
import Banner from "../../../components/shop/pets/parallax-banner";
import ProductSlider from "../../../components/shop/pets/product-slider";
import Blog from "../../../components/shop/pets/blog";
import { useProductStore } from "~~/store/products";
import { useBlogStore } from "~~/store/blog";

export default {
  components: {
    Slider,
    LogoSlider,
    Collectionbanner,
    TopCollection,
    Banner,
    ProductSlider,
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
      document.documentElement.style.setProperty("--theme-deafult", "#ff9944");
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
        if (item.type === "pets") {
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
        if (item.type === 'pets') {
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
