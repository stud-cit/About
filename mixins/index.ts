import Vue from 'vue';
import commonFontSizeList from '~/utils/size.models';

Vue.mixin({
	methods: {
		getDynamicAssets(src?: string) {
			return src
				? `${process.env.baseUrl}/${src}`
				: `${process.env.baseUrl}/storage/default/fallback/notfound.svg`;
		},
		getAssetWithFallback(src?: string) {
			return src ? src : `storage/default/fallback/notfound.svg`;
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
