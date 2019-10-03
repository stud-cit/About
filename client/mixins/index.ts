import Vue from 'vue';
import commonFontSizeList from '@/utils/font-size.models';

interface GetCustomAdaptiveSizeModel {
	xs: number;
	sm: number;
	md: number;
	lg: number;
}

Vue.mixin({
	methods: {
		getDynamicAssets(src: string | null) {
			if (src) {
				return require(`~/assets${src}`);
			}
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

			if (allowedElementNames.includes(elementName)) {
				const currentFontDimensions = commonFontSizeList[elementName];
				const currentBreakpoint = this.$vuetify.breakpoint.name;

				if (currentBreakpoint === 'xl') {
					return currentFontDimensions.lg;
				}
				return currentFontDimensions[currentBreakpoint];
			}
			return null;
		},
		getCustomAdaptiveSize({ xs, sm, md, lg }: GetCustomAdaptiveSizeModel) {
			const { $breakpoint } = this;
			if ($breakpoint) {
				const is = $breakpoint.is;
				if (is.lgAndUp) {
					return lg;
				} else if (is.mdAndUp) {
					return md;
				} else if (is.smAndUp) {
					return sm;
				} else {
					return xs;
				}
			}
			return xs;
		},
	},
});
