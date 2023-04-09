<template>
  <div>
    <HeaderHeader4 />
    <Slider />
    <LogoSlider />
    <TimerBanner />
    <Category />
    <CategoryTab :products="products" :category="category" />
    <ProductSlider
      :products="products"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <CollectionBanner />
    <TopProducts
      :products="products"
      :category="category"
      @openQuickview="showQuickview"
      @openCompare="showCoampre"
      @openCart="showCart"
    />
    <Blog :blog="blog"/>
    <Services />
    <Instagram />
    <FooterFooter4 />
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
    <CartBottomModel :openCart="showcartmodal" @closeCart="closeCart" />
    <WidgetsNewsletterPopup />
  </div>
</template>

<script>
import { mapState } from "pinia";
definePageMeta({
  layout: "custom"
})
import Slider from "../../../components/shop/watch/slider";
import LogoSlider from "../../../components/shop/watch/logo_slider";
import TimerBanner from "../../../components/shop/watch/timer_banner";
import Category from "../../../components/shop/watch/category";
import CategoryTab from "../../../components/shop/watch/categorytabs";
import ProductSlider from "../../../components/shop/watch/product_slider";
import CollectionBanner from "../../../components/shop/watch/collectionbanners";
import TopProducts from "../../../components/shop/watch/top_products";
import Blog from "../../../components/shop/watch/blog";
import Services from "../../../components/shop/watch/services";
import Instagram from "../../../components/shop/watch/instagram";
import { useProductStore } from "~~/store/products";
import {
    useBlogStore
} from '~~/store/blog'
export default {
  components: {
    Slider,
    LogoSlider,
    TimerBanner,
    Category,
    CategoryTab,
    ProductSlider,
    CollectionBanner,
    TopProducts,
    Blog,
    Services,
    Instagram,
    
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
      document.documentElement.style.setProperty("--theme-deafult", "#e4604a");
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
        if (item.type === "watch") {
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
