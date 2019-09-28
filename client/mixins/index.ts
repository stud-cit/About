import Vue from 'vue';
import commonFontSizeList from '@/utils/font-size.models';

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
    getCommonAdaptiveFontSize(elementName: string) {
      const allowedElementNames = [
        'previewTitle',
        'previewSubtitle',
        'previewInfo',
        'useContactsTitle',
        'useContactsAction',
      ];
      
      if(allowedElementNames.includes(elementName)) {
        const currentFontDimensions = commonFontSizeList[elementName];
        const currentBreakpoint = this.$vuetify.breakpoint.name;
        
        if(currentBreakpoint === 'xl') {
          return currentFontDimensions.lg;
        }
        return currentFontDimensions[currentBreakpoint];
      }
      return null;
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
