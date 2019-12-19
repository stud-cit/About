import Vue from 'vue';
import commonFontSizeList from '~/utils/size.models';

Vue.mixin({
	methods: {
		getDynamicAssets(src?: string) {
			if (src) return `http://localhost:8081/static/${src}`;
			return require(`~/assets/placeholders/image.svg`);
		},
		getAdaptiveSize(elementName: string) {
			if (Object.keys(commonFontSizeList).includes(elementName)) {
				const currentFontDimensions = commonFontSizeList[elementName];
				const currentBreakpoint = this.$vuetify.breakpoint.name;
				if (currentBreakpoint === 'xl') return currentFontDimensions.lg;
				return currentFontDimensions[currentBreakpoint];
			}
			return null;
		},
	},
});
