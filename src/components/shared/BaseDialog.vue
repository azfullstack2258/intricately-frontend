<template>
  <modal :name="name" :class="className">
    <slot name="header" />
    <slot name="content" />
    <slot name="footer" />
  </modal>
</template>
<script>
export default {
  name: "BaseDialog",
  props: {
    name: {
      type: String,
      required: true
    },
    className: String
  }
};
</script>
