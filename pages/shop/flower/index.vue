<template>
  <div>
    <HeaderHeader2 />
    <Slider />
    <CollectionBanner />
    <TopProducts
      :products="products"
      :category="category"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <Categorytab :products="products" :category="category" />
    <ProductSlider
      :products="products"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
     
    />
    <Blog :blog="blog" />

    <Services />
    <Instagram />
    <Footer />
    <quickviewModel
      :openModal="showquickviewmodel"
      :productData="quickviewproduct"
      @closeView="closeViewModal"
    />
    <compareModel
      :openCompare="showcomparemodal"
      :productData="comapreproduct"
      @closeCompare="closeCompareModal"
    />
    <cartBottomModel :openCart="showcartmodal" @closeCart="closeCart" />
    <newsletterModel />
  </div>
</template>
<script>

import { mapState } from "pinia";
import Header from "../../../components/header/header2.vue";
import Footer from "../../../components/footer/index.vue";
import quickviewModel from "../../../components/widgets/quickview";
import compareModel from "../../../components/widgets/compare-popup";
import cartBottomModel from "../../../components/cart-modal/cart-bottom-model.vue";
import newsletterModel from "../../../components/widgets/newsletter-popup";
import Slider from "../../../components/shop/flower/slider.vue";
import CollectionBanner from "../../../components/shop/flower/collection_banner";
import TopProducts from "../../../components/shop/flower/top_products";
import Categorytab from "../../../components/shop/flower/category_tab";
import ProductSlider from "../../../components/shop/flower/product_slider";
import Blog from "../../../components/shop/flower/blog";
import Services from "../../../components/shop/flower/services";
import Instagram from "../../../components/shop/flower/instagram";
import { useProductStore } from "~~/store/products";
import { useBlogStore } from "~~/store/blog";

definePageMeta({
  layout: "custom",
});
export default {
  components: {
    Header,
    Slider,
    CollectionBanner,
    TopProducts,
    Categorytab,
    ProductSlider,
    Blog,
    Services,
    Instagram,
    Footer,
    quickviewModel,
    compareModel,
    cartBottomModel,
    newsletterModel,
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
        if (item.type === "flower") {
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
        if (item.type === 'watch') {
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
