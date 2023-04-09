<template>
  <div class="container-fluid layout-8">
    <div class="layout-8-bg">
      <Slider />
      <CollectionBanner />
      <ProductTab :products="products" :category="category" @openQuickview="showQuickview" @openCompare="showCoampre"
        @openCart="showCart" />
    </div>
    <quickviewModel :openModal="showquickviewmodel" :productData="quickviewproduct" @closeView="closeViewModal" />
    <compareModel :openCompare="showcomparemodal" :productData="comapreproduct" @closeCompare="closeCompareModal" />
    <cartModel :openCart="showcartmodal" :productData="cartproduct" @closeCart="closeCartModal" :products="products" />
    <newsletterModel />
  </div>
</template>
<script>
import { mapState } from "pinia";
import { useProductStore } from "~~/store/products";
import quickviewModel from "../../../components/widgets/quickview";
import compareModel from "../../../components/widgets/compare-popup";
import cartModel from "../../../components/cart-modal/cart-modal-popup.vue";
import newsletterModel from "../../../components/widgets/newsletter-popup";
import Slider from "../../../components/shop/electronics-1/slider";
import CollectionBanner from "../../../components/shop/electronics-1/collection_banner";
import ProductTab from "../../../components/shop/electronics-1/product_tab";

export default {
  components: {
    Slider,
    CollectionBanner,
    ProductTab,
    quickviewModel,
    compareModel,
    cartModel,
    newsletterModel,
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
      cartproduct: {},
    };
  },
  computed: {
    ...mapState(useProductStore, {
      productslist: 'productslist',
    }),
  },
  mounted() {
    this.productsArray();
  },
  methods: {
    productsArray: function () {
      this.productslist.map((item) => {
        if (item.type === "electronics") {
          this.products.push(item);
          item.collection.map((i) => {
            const index = this.category.indexOf(i);
            if (index === -1) this.category.push(i);
          });
        }
      });
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
    closeViewModal(item) {
      this.showquickviewmodel = item
    }
  },
};
</script>
