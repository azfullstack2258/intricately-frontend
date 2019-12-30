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
    />
    <BaseInput
      label="Company spend"
      placeholder="e.g. $150,000"
      v-model="companySpend"
      :type="focused === 'spend' ? 'number' : 'text'"
      @focus="focused = 'spend'"
      @blur="focused = ''"
    />
    <BaseInput
      v-if="!editingAbility"
      label="Company Spend Ability"
      placeholder="e.g. $150,000 - $330,000"
      v-model="companySpendAbility"
      :error="spendAbilityMin > spendAbilityMax ? 'Max value should be larger than min value.' : ''"
      @focus="handleSpendFocus"
    />
    <template v-if="editingAbility">
      <BaseInput
        ref="spendAbilityMin"
        id="ability-min"
        type="number"
        label="Company Spend Ability Min"
        v-model="companySpendAbilityMin"
      />
      <BaseInput type="number" label="Company Spend Ability Max" v-model="companySpendAbilityMax" />
      <button type="button" @click="finishEditingAbility">Ok</button>
    </template>
    <BaseInput
      type="textarea"
      label="Notes"
      placeholder="e.g. Good Tech Company"
      v-model="companyNotes"
      @focus="showCompanyNotesModal"
    />
    <modal name="company-notes">
      <span>Additional Notes</span>
      <BaseInput type="textarea" placeholder="e.g. Good Tech Company" v-model="compNotes" />
      <button type="button" @click="saveNotes">Save</button>
    </modal>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import numeral from "numeral";

const { mapState } = createNamespacedHelpers("companyData");

export default {
  data() {
    return {
      focused: "",
      editingAbility: false,
      compNotes: this.companyNotes
    };
  },
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
    },
    companySpend: {
      get: function() {
        if (this.focused === "spend") {
          return this.spend || "";
        } else {
          return this.spend && numeral(this.spend).format("$0,0");
        }
      },
      set: function(value) {
        const val = parseInt(value, 10);
        this.$store.commit("companyData/UPDATE_COMPANY_DATA_BY_KEY", {
          key: "spend",
          value: val > 0 ? val : ""
        });
      }
    },
    companySpendAbility() {
      if (this.spendAbilityMin || this.spendAbilityMax) {
        return `${(this.spendAbilityMin &&
          numeral(this.spendAbilityMin).format("$0,0")) ||
          ""} - ${(this.spendAbilityMax &&
          numeral(this.spendAbilityMax).format("$0,0")) ||
          ""}`;
      }
      return "";
    },
    companySpendAbilityMin: {
      get: function() {
        return this.spendAbilityMin;
      },
      set: function(value) {
        this.$store.commit("companyData/UPDATE_COMPANY_DATA_BY_KEY", {
          key: "spendAbilityMin",
          value
        });
      }
    },
    companySpendAbilityMax: {
      get: function() {
        return this.spendAbilityMax;
      },
      set: function(value) {
        this.$store.commit("companyData/UPDATE_COMPANY_DATA_BY_KEY", {
          key: "spendAbilityMax",
          value
        });
      }
    },
    companyNotes: {
      get: function() {
        return this.notes;
      },
      set: function(value) {
        this.$store.commit("companyData/UPDATE_COMPANY_DATA_BY_KEY", {
          key: "notes",
          value
        });
      }
    }
  },
  methods: {
    handleSpendFocus() {
      this.focused = "spendAbility";
      this.editingAbility = true;
      setTimeout(() => {
        const abilityMin = document.getElementById("ability-min");
        abilityMin.focus();
      }, 150);
    },
    finishEditingAbility() {
      this.editingAbility = false;
    },
    saveNotes() {
      this.$store.commit("companyData/UPDATE_COMPANY_DATA_BY_KEY", {
        key: "notes",
        value: this.compNotes
      });

      this.$modal.hide("company-notes");
    },
    showCompanyNotesModal() {
      this.$modal.show("company-notes");
    }
  }
};
</script>
