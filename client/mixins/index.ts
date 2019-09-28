import Vue from 'vue';

interface getCustomAdaptiveFontSizeModel {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

Vue.mixin({
  methods: {
    getDynamicAssets(src: string | undefined) {
      if (src !== undefined) return require(`~/assets${src}`);
      return require(`~/assets/placeholders/image.svg`);
    },
    getCustomAdaptiveFontSize({xs, sm, md, lg}: getCustomAdaptiveFontSizeModel) {
      const { smAndUp, mdAndUp, lgAndUp } = this.$vuetify.breakpoint;
      if(lgAndUp) {
        return lg;
      }
      else if(mdAndUp) {
        return md;
      }
      else if(smAndUp) {
        return sm;
      }
      else {
        return xs;
      }

    }
  },
});
