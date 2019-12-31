<template>
  <div class="panel-container">
    <div class="header" v-if="title">{{ title }}</div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  }
};
</script>
<style lang="scss" scoped>
@import "Styles/_variables.scss";

.panel-container {
  background: white;
  border: 1px solid $border-color;
  border-radius: 4px;

  .header {
    padding: 15px;
    text-transform: uppercase;
    border-bottom: 1px solid $border-color;
  }
  .content {
    .container:first-child {
      border-top: none;
    }
  }
}
</style>
