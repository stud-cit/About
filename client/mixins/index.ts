import Vue from 'vue';

Vue.mixin({
  methods: {
    getDynamicAssets(src: string | undefined) {
      if(src !== undefined) return require(`~/assets${src}`)
      return require(`~/assets/placeholders/image.svg`)
    }
  },
});
