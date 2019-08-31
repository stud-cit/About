import Vue from 'vue';

Vue.mixin({
  methods: {
    getDynamicAssets(src) {
      return require(`~/assets${src}`)
    }
  },
});
