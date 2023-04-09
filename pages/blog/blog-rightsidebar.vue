<template>
  <div>
    
    <Breadcrumbs title="Blog" />
    <section class="section-b-space blog-page ratio2_3">
      <div class="container">
        <div class="row">
          <!--Blog List start-->
          <div class="col-xl-9 col-lg-8 col-md-7 order-sec">
          <BlogList />
          </div>
          <!--Blog List start-->
          <!--Blog sidebar start-->
          <BlogSidebar />
          <!--Blog sidebar start-->
        </div>
      </div>
    </section>
 
  </div>
</template>
<script>
import Breadcrumbs from '../../components/widgets/breadcrumbs'
import BlogSidebar from '../../components/blog/blog-sidebar.vue'
import BlogList from '../../components/blog/blog-list.vue'

export default {
  components: {
  
    BlogSidebar,
    Breadcrumbs,
    BlogList,
  
  }
}
</script>
