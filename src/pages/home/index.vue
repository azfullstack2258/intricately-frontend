<template>
  <div class="layout-container">
    <div id="layout" class="layout">
      <Header />
      <div class="layout-page-content">
        <div class="side-navbar">Sidebar</div>
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

export default {
  components: {
    Header
  }
};
</script>
