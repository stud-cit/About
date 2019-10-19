<template>
  <v-card>
    <ValidationObserver
      v-slot="{ invalid }"
      ref="observer"
      tag="form"
      @submit.prevent="onSubmit"
    >
      <v-progress-linear :indeterminate="progress" :active="progress" />
      <v-card-title class="title font-weight-regular justify-center">
        <span>Sing In</span>
      </v-card-title>
      <v-card-text>
        <VTextFieldValidation
          v-model="userCredentials.email"
          type="email"
          rules="required|email"
          outlined
          autofocus
          label="Email"
          autocomplete="email"
          prepend-icon="mdi-email-outline"
        />
        <VTextFieldValidation
          v-model="userCredentials.password"
          :type="show1 ? 'text' : 'password'"
          :append-icon="changeVisibility(show1)"
          rules="required|min:8"
          vid="confirm"
          outlined
          autofocus
          counter
          label="Password"
          autocomplete="current-password"
          prepend-icon="mdi-lock-outline"
          @click:append="show1 = !show1"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn href="/signup" text>Sign Up</v-btn>
        <v-spacer />
        <v-btn :disabled="invalid" @click="onSubmit" depressed color="primary">
          Login
        </v-btn>
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';
import { Action } from 'vuex-class';

@Component({
  middleware: ['guest'],
  components: {
    ValidationObserver,
    VTextFieldValidation: () =>
      import('~/components/inputs/VTextFieldValidation'),
  },
})
export default class SignInPage extends Vue {
  @Action('authorizationUser') authorizationUser;

  private show1: boolean = false;
  private progress: boolean = false;
  private userCredentials = {
    email: '',
    password: '',
  };

  private changeVisibility(condition) {
    return condition ? 'mdi-eye-outline' : 'mdi-eye-off-outline';
  }

  private async onSubmit() {
    const validation = await this.$refs.observer.validate();
    if (!validation) return;
    this.progress = !this.progress;
    return await this.authorizationUser(this.userCredentials);
  }
}
</script>
