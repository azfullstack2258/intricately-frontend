<template>
  <div>
    Company Data
    <BaseInput
      label="Company Name"
      placeholder="e.g. Your Company Name"
      :rules="[
        val => val && val.length > 0 || 'Company Name is required.'
      ]"
      v-model="companyName"
      @input="val => onChange('companyName', val)"
    />
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("companyData");

export default {
  computed: {
    ...mapState([
      "name",
      "spend",
      "spendAbilityMin",
      "spendAbilityMax",
      "notes"
    ]),
    companyName: {
      get: function() {
        return this.name;
      },
      set: function(value) {
        this.$store.commit("companyData/UPDATE_COMPANY_DATA_BY_KEY", {
          key: "name",
          value
        });
      }
    }
  },
  methods: {
    onChange(key, value) {}
  }
};
</script>
