<template>
  <ValidationProvider :vid="vid" :rules="rules" :name="$attrs.label">
    <v-text-field
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      :success="valid"
      :error-messages="errors"
      slot-scope="{ errors, valid }"
    />
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ValidationProvider } from 'vee-validate';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class VTextFieldValidation extends Vue {
  @Prop({ type: String, required: false }) value: string;
  @Prop({ type: String, required: true }) rules: string;
  @Prop({ type: String, required: false }) vid: string;

  @Watch('value')
  onChangeValue(val: string) {
    this.innerValue = val;
  }

  created() {
    this.innerValue = this.value;
  }

  private innerValue!: string;
}
</script>
