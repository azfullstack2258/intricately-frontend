<template>
  <div class="container">
    <div class="time">{{ fromNow }}</div>
    <img :src="image" :alt="data.image" />
    <div class="content">
      <span v-if="data.type === 'launch'">{{ data.company_name }} launched {{ data.property_name }}</span>
      <template v-else>
        <a :href="data.company_link">{{ data.company_name }}</a> replaced
        <span class="replaced-company">{{ data.replaced_company_name }}</span> on
        <a :href="data.property_link">{{ propertyCount }}</a>
      </template>
    </div>
  </div>
</template>
<script>
import Pluralize from "pluralize";
import moment from "moment";

export default {
  name: "BaseActivity",
  props: {
    data: Object
  },
  computed: {
    fromNow() {
      return moment(new Date(this.data.created_at)).fromNow();
    },
    propertyCount() {
      return Pluralize("property", this.data.replaced_count, true);
    }
  },
  data() {
    return {
      image: require(`Images/${this.data.image}`)
    };
  }
};
</script>
<style lang="scss" scoped>
@import "Styles/_variables.scss";

.container {
  padding: 15px;
  border-top: 1px solid $border-color;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  > * {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  .time {
    min-width: 100px;
    color: $grey;
    font-weight: 500;
  }
  .content {
    flex-grow: 1;
    .replaced-company {
      text-decoration: line-through;
      color: $grey;
    }
  }
}
</style>
