<template>
  <aside>
    <nav class="side-navbar">
      <ul class="list" role="menubar" aria-label="Navigation">
        <li v-for="(route, id) in routes" :key="id">
          <router-link :to="{ path: route.path }" class="item">
            <!-- Just added this a tag because router-link is not working for some reason -->
            <a :href="route.path">{{ route.name }}</a>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      routes: [
        {
          path: "/company-data",
          name: "Company Data"
        },
        {
          path: "/company-table",
          name: "Company Table"
        },
        {
          path: "/company-page",
          name: "Company Page"
        }
      ]
    };
  }
};
</script>
