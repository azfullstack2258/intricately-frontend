<template>
  <div>
    Company Page
    <BasePanel title="Activities">
      <template slot="content">Activities</template>
    </BasePanel>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const { mapActions, mapState } = createNamespacedHelpers("companyPage");

export default {
  computed: {
    ...mapState(["activities"])
  },
  methods: {
    ...mapActions(["loadCompanyPageInfo"]),
    fetch() {
      this.loadCompanyPageInfo("microsoft");
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>
