<template>
  <div :class="{hasLabel: label, hasError}">
    <label class="input-label" v-if="label">{{label}}</label>
    <div class="input">
      <span class="input-wrapper">
        <textarea
          v-if="type === 'textarea'"
          :type="type"
          :placeholder="placeholder"
          :rows="rows"
          v-model="content"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
        />
        <input
          v-else
          :type="type"
          :placeholder="placeholder"
          :id="id"
          v-model="content"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
        />
      </span>
    </div>
    <template v-if="hasError">
      <label class="input-error" v-for="(errorMsg, id) in errorMessages" :key="id">{{errorMsg}}</label>
    </template>
    <label class="input-error" v-if="error">{{error}}</label>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    label: String,
    nativeRef: String,
    value: [Number, String],
    inValid: Function,
    isRequired: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    id: String,
    error: String,
    rows: {
      type: [Number, String],
      default: 3
    }
  },
  data() {
    return {
      errorMessages: [],
      hasError: false
    };
  },
  computed: {
    content: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        //handled with $emit
      }
    }
  },
  methods: {
    handleFocus(e) {
      this.$el.setAttribute("focus", true);
      this.$emit("focus", this);
    },
    handleBlur(e) {
      e.preventDefault();
      this.validate();
      this.$el.removeAttribute("focus");
      this.$emit("blur", this);
    },
    handleInput(e) {
      this.$emit("input", e.target.value.length == 0 ? null : e.target.value);
      this.validate();
    },
    validate() {
      const errorMessages = [];
      const value = this.content;

      for (let index = 0; index < this.rules.length; index++) {
        const rule = this.rules[index];
        const valid = typeof rule === "function" ? rule(value) : rule;

        if (typeof valid === "string") {
          errorMessages.push(valid);
        } else if (typeof valid !== "boolean") {
          console.error(
            `Rules should return a string or boolean, received '${typeof valid}' instead`
          );
        }
      }

      this.errorMessages = errorMessages;
      this.hasError = errorMessages.length > 0;
      return this.hasError;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "Styles/_reset.scss";
@import "Styles/_color.scss";

div[focus] {
  .input {
    border: 1px solid #1695a3;
  }
}
div.hasError {
  .input {
    border: 1px solid $error;
  }
}
.input {
  width: 100%;
  color: #222;
  font-size: 20px;
  line-height: 30px;
  display: table;
  padding: 9px 16px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 4px;
}
.input-label {
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #222;
  margin-bottom: 8px;
}
.input-error {
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  color: #b00020;
  margin-top: 4px;
}
.input-wrapper {
  width: 100%;
  display: table-cell;
}

input {
  font-size: inherit;
  width: 100%;
  display: table-cell;
  border: 0;
  border-radius: 0;
}

.input-prefix,
.input-suffix {
  font-size: inherit;
  display: table-cell;
  white-space: nowrap;
}
.input-prefix {
  padding-right: 0.4em;
}
.input-suffix {
  padding-left: 0.4em;
}
textarea {
  font-size: inherit;
  width: 100%;
  display: table-cell;
  border: 0;
  border-radius: 0;
}
</style>

