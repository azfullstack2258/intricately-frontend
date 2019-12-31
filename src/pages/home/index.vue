<template>
  <div class="layout-container">
    <div id="layout" class="layout">
      <Header />
      <Breadcrumb />
      <div class="layout-page-content">
        <Sidebar />
        <main id="content">
          <router-view></router-view>
        </main>
      </div>
    </div>
    <footer>footer</footer>
  </div>
</template>
<script>
import Header from "Components/layout/Header.vue";
import Sidebar from "Components/layout/Sidebar.vue";
import Breadcrumb from "Components/layout/Breadcrumb.vue";

export default {
  components: {
    Header,
    Sidebar,
    Breadcrumb
  }
};
</script>
