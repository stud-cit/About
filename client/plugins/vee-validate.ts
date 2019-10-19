import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';

const phoneNumber = {
  getMessage: (field: string) => `${field} is not a valid phone number`,
  validate(value: string) {
    const MOBILEREG = new RegExp('^[+][0-9]{3}[0-9]{3}[0-9]{4,6}$');
    return MOBILEREG.test(value);
  },
};

Validator.extend('phone', phoneNumber);
Vue.use(VeeValidate, { mode: 'eager', inject: false, delay: 2 });
