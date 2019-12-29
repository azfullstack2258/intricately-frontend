<template>
  <div>
    <div class="panel-header" v-if="title">{{ title }}</div>
    <div class="panel-content">
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
