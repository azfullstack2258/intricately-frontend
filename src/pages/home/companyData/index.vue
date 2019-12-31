<template>
  <div class="company-data__container">
    <div
      class="description"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
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
    <div v-if="editingAbility" class="ability-editbox">
      <BaseInput
        ref="spendAbilityMin"
        id="ability-min"
        type="number"
        label="Company Spend Ability Min"
        v-model="companySpendAbilityMin"
      />
      <BaseInput type="number" label="Company Spend Ability Max" v-model="companySpendAbilityMax" />
      <BaseButton @click="finishEditingAbility">Save</BaseButton>
    </div>
    <BaseInput
      type="textarea"
      :label="'Notes' | uppercase"
      placeholder="e.g. Good Tech Company"
      v-model="companyNotes"
      @focus="showCompanyNotesModal"
    />
    <BaseDialog name="company-notes" class="company-notes__modal">
      <template slot="header">
        <div class="modal-header">
          <div class="title">{{ 'Additional Notes' | uppercase }}</div>
          <img :src="imageUrl('close.png')" alt="close_ico" @click="closeNotesModal" />
        </div>
      </template>
      <template slot="content">
        <div class="modal-content">
          <BaseInput type="textarea" placeholder="e.g. Good Tech Company" v-model="compNotes" />
        </div>
      </template>
      <template slot="footer">
        <div class="modal-footer">
          <BaseButton @click="saveNotes">Save</BaseButton>
        </div>
      </template>
    </BaseDialog>
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
      this.closeNotesModal();
    },
    closeNotesModal() {
      this.$modal.hide("company-notes");
    },
    showCompanyNotesModal() {
      this.$modal.show("company-notes");
    }
  }
};
</script>
