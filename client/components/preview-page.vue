<template>
  <v-row class="preview-section" justify="center" align="end">
    <v-row class="preview-wrapper" justify="space-around" align="end">
      <v-col cols="12" order="1" order-sm="1" class="line-height" :class="isXsOnly ? 'text-center' : ''">
        <div class="d-block">
          <p class="font-weight-bold" :class="isAbout ? 'text-uppercase' : ''" :style="getPreviewTitleFont">
            {{ title }}
          </p>
          <p class="font-weight-bold" :style="getPreviewTitleFont">
            {{ subtitle }}
          </p>
        </div>
      </v-col>
      <v-col cols="12" order="3" order-sm="2">
        <v-row justify="space-around" justify-sm="start">
          <v-col cols="auto" order="1" order-sm="1">
            <div class="arrow mr-3" @click="handleNavigatingPage(false)">
              <v-img src="/arrow-left.svg" width="45px" />
            </div>
          </v-col>
          <v-col cols="auto" order="3" order-sm="2">
            <div class="arrow mr-3" @click="handleNavigatingPage(true)">
              <v-img src="/arrow-right.svg" width="45px" />
            </div>
          </v-col>
          <v-col
            cols="auto"
            order="2"
            order-sm="3"
            :class="{ rotate: isXsOnly }"
          >
            <nuxt-link class="square-container" to="/">
              <div class="square mr-3 squareOne"></div>
              <div class="square mr-3 squareTwo"></div>
              <div class="square squareThree"></div>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" order="2" order-sm="3">
        <v-row class="d-none d-sm-flex font-weight-regular line-height-1">
          <span :style="getPreviewSubTitleFont">
            {{ description }}
          </span>
        </v-row>
        <v-row justify="center" class="d-flex d-sm-none pl-0">
          <img class="pointer-icon" src="/pointer-mobile.svg" />
        </v-row>
        <v-row justify="center" justify-sm="start" class="mt-4">
          <span class="gray font-weight-regular" :style="getPreviewInfoFont" v-if="isAbout">
            {{ $t('about.scrollPoint') }}
          </span>
          <span class="gray font-weight-regular" :style="getPreviewInfoFont" v-else >
            {{ $t('weOffers.scroll') }}
          </span>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      v-show="isShowUseContacts"
      v-scroll="handleScroll"
      class="pa-0 use-contacts-container"
      justify="end"
      no-gutters
    >
      <v-col cols="12" sm="auto">
        <v-card class="pa-4 pt-0 card-contacts" @click="scrollToFooter">
          <v-card-title class="justify-center font-weight-thin" :style="getUseContactsTitleFont">
            {{ $t('contact.titleShort') }}
          </v-card-title>
          <v-card-actions
            class="pa-0 contacts-action justify-center font-weight-regular"
            :style="getUseContactsActionFont"
          >
            {{ $t('contact.preTitleShort') }}
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col sm="1"></v-col>
    </v-row>
    <v-row justify="center" v-show="arrowDown()">
      <v-btn
        icon
        color="white"
        @click="scollToContent"
        class="scroll-bottom-icon"
      >
        <v-icon size="50" class="icon-down">mdi-chevron-double-down</v-icon>
      </v-btn>
    </v-row>
  </v-row>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

@Component({
	props: ['title', 'subtitle', 'description', 'iconDown','isAbout'],
})
export default class PreviewPage extends Vue {

	@Getter('getPageByRoute') getPageByRoute;
	@Getter('getPageId') pageId;
	@Getter('getPageRouteById') getPageRouteById;
	isShowUseContacts: boolean = true;
	aboutPageId = 1;
	portfolioPageId = 4;

	handleScroll(): void {
		const windowHeight = window.innerHeight;
		const scrollHeight = document.body.scrollHeight;
		const scrollToFooter = scrollHeight - windowHeight * 2;
		const isPortolioPage = this.pageId === this.portfolioPageId;

		// on porfolio page we have to hide if any scroll we have
		if (isPortolioPage && window.scrollY > 0) {
			this.isShowUseContacts = false;
		} else if (window.scrollY > scrollToFooter) {
			this.isShowUseContacts = false;
		} else {
			this.isShowUseContacts = true;
		}
	}

	scollToContent(): void {
		window.scrollTo({ left: 0, top: window.innerHeight, behavior: 'smooth' });
	}
	scrollToFooter() {
		window.scrollTo({
			left: 0,
			top: document.body.scrollHeight,
			behavior: 'smooth',
		});
	}

	handleNavigatingPage(toRight: boolean) {
		const newPageIndex = toRight ? this.pageId + 1 : this.pageId - 1;
		const nextPage = this.getPageRouteById(newPageIndex);
		this.$router.push(nextPage);
	}

	get isXsOnly() {
		return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
	}
	get getPreviewTitleFont() {
		return { fontSize: `${this.getCommonAdaptiveFontSize('previewTitle')}px` };
	}
	get getPreviewSubTitleFont() {
		return {
			fontSize: `${this.getCommonAdaptiveFontSize('previewSubtitle')}px`,
		};
	}
	get getPreviewInfoFont() {
		return { fontSize: `${this.getCommonAdaptiveFontSize('previewInfo')}px` };
	}
	get getUseContactsTitleFont() {
		return {
			fontSize: `${this.getCommonAdaptiveFontSize('useContactsTitle')}px`,
		};
	}
	get getUseContactsActionFont() {
		return {
			fontSize: `${this.getCommonAdaptiveFontSize('useContactsAction')}px`,
		};
  }
  get getPreviewTitleFont() {
    if (!this.isAbout){
      return { fontSize: `${this.getCommonAdaptiveFontSize('previewTitle')}px` };
    } else {
      return { fontSize:  `${this.getCustomAdaptiveSize({
        xs: 35,
        sm: 65,
        md: 83,
        lg: 93,
      })}px`
      };
    }
  }
	arrowDown() {
		return this.iconDown;
	}
	mounted() {
		// initial check
		this.handleScroll();
	}
}
</script>

<style lang="sass">
.preview-section
	height: 97vh !important

	.use-contacts-container
		width: 100vw
		position: fixed
		right: 0
		bottom: 0
		z-index: 10

		.card-contacts
			border-bottom-left-radius: 0
			border-bottom-right-radius: 0

		.contacts-action
			text-transform: uppercase
			text-decoration: underline

.preview-wrapper
	height: 70vh
	color: white
	margin-bottom: 12vh

.arrow
	font-size: 1.8rem
	text-align: center
	cursor: pointer

.square-container
	display: flex


.square
	height: 40px
	width: 40px
	border-radius: 20%
	border: 4px solid white

.squareOne
	clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)

.squareThree
	clip-path: polygon(50% 0%, 0% 0%, 0% 100%, 50% 100%)

.scroll-bottom-icon
	position: absolute
	top: 90vh
	z-index: 10
	opacity: 0.5
	border-radius: 50%
	border: 1px solid rgba(255, 255, 255, 0.5)
	padding: 30px

.icon-down
	position: absolute
	top: 50%
	transform: translateY(-50%)

.rotate
	transform: rotate(90deg)
.gray
	color: gray

.line-height
	line-height: 1.2

.line-height-1
	line-height: 1
</style>
