<template>
  <div>
    <div class="company-info">
      <div class="avatar">
        <img :src="imageUrl(image)" :alt="image" />
      </div>
      <div class="info">
        <p>{{ name }}</p>
        <div>
          <img :src="imageUrl('location.png')" alt="location_ico" />
          <span>{{ location }}</span>
        </div>
      </div>
    </div>
    <div class="company-description">
      <template v-if="!showMore">
        <span>{{ description_less }}</span>
        <a @click="showMore = true">View More...</a>
      </template>
      <template v-else>
        <span>{{ description_full }}</span>
        <a @click="showMore = false">Show Less</a>
      </template>
    </div>
    <BasePanel title="Activities">
      <template slot="content">
        <BaseActivity v-for="(activity, id) in companyActivities" :key="id" :data="activity" />
      </template>
    </BasePanel>
    <BasePanel title="Similar companies">
      <template slot="content">
        <div class="panel-content" v-for="(company, id) in similarCompanies" :key="id">
          <div class="avatar">
            <img :src="imageUrl(company.image)" :alt="company.image" />
          </div>
          <div class="content">
            <a :href="company.company_link">{{ company.company_name }}</a>
          </div>
        </div>
      </template>
    </BasePanel>
    <BasePanel title="company spend history">
      <template slot="content">
        <div class="container">
          <line-chart :chartdata="spend_history_graph_data" :options="chartOptions" />
        </div>
      </template>
    </BasePanel>
    <BasePanel title="company spend history">
      <template slot="content">
        <div class="panel-content" v-for="(history, id) in spend_history" :key="id">
          <div class="avatar">
            <img :src="imageUrl(history.image)" :alt="history.image" />
          </div>
          <div class="content">
            <a :href="history.product_link">{{ history.product_name }}</a>
            <span>{{ name }} spend on product {{ history.amount | currency}}</span>
          </div>
        </div>
      </template>
    </BasePanel>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import LineChart from "Components/shared/BaseLineChart";

const { mapActions, mapGetters, mapState } = createNamespacedHelpers(
  "companyPage"
);

export default {
  components: {
    LineChart
  },
  data() {
    return {
      showMore: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    ...mapGetters(["companyActivities", "similarCompanies"]),
    ...mapState([
      "name",
      "image",
      "description_less",
      "description_full",
      "location",
      "spend_history",
      "spend_history_graph_data"
    ])
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
