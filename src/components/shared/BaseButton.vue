<template>
  <button :type="type" @click="onClick">
    <slot />
  </button>
</template>
<script>
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "Styles/_variables.scss";
button {
  background: $primary;
  color: white;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  padding: 10px;
  min-width: 100px;
  height: 45px;
}
</style>
