<template>
	<v-container fluid>
		<v-row justify="center">
			<v-col cols="12" sm="10">
				<PreviewPage
					:title="page.name"
					:description="page.description"
					:icon-down="false"
				/>
				<ScrollBar />
				<v-row justify="start" class="d-none d-md-flex">
					<v-col
						v-for="(employee, i) in getPageContent"
						:key="i"
						lg="4"
						md="4"
						sm="12"
						class="my-4"
						ref="staff"
					>
						<Staff
							:pose="
								staffToAnimate.includes(i) && !getIsHideAnimationContent
									? 'visible'
									: 'hidden'
							"
						>
							<v-card
								class="mx-auto card-img-hover"
								:width="isLgAndUp ? '425px' : 'auto'"
							>
								<avatar
									:image="
										getDynamicAssets(employee.cover ? employee.cover.image : '')
									"
								/>
							</v-card>
							<avatar-info
								:employee="employee"
								:sliderInfo="sliderInfo"
								:isXsOnly="isXsOnly"
								:isMdAndUp="isMdAndUp"
							/>
						</Staff>
					</v-col>
				</v-row>
				<v-row
					class="d-flex d-md-none staff-slider"
					justify="center"
					align="center"
				>
					<v-col class="staff-slide">
						<v-window v-model="curStaff">
							<v-window-item v-for="(employee, i) in getPageContent" :key="i">
								<v-card
									class="mx-auto"
									color="transparent"
									:width="isXsOnly ? '90%' : '100%'"
									flat
								>
									<avatar
										:image="
											getDynamicAssets(
												employee.cover ? employee.cover.image : '',
											)
										"
									/>
									<v-row justify="space-around" align="center">
										<v-btn
											color="white"
											icon
											width="15vw"
											height="15vw"
											@click="() => switchSlide(false)"
										>
											<v-icon size="20vw">mdi-chevron-left</v-icon>
										</v-btn>
										<avatar-info
											:employee="employee"
											:sliderInfo="sliderInfo"
											:isXsOnly="isXsOnly"
											:isMdAndUp="isMdAndUp"
										/>
										<v-btn
											color="white"
											icon
											width="15vw"
											height="15vw"
											@click="() => switchSlide(true)"
										>
											<v-icon size="20vw">mdi-chevron-right</v-icon>
										</v-btn>
									</v-row>
								</v-card>
							</v-window-item>
						</v-window>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<product-footer class="max-width" />
	</v-container>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator';
	import { Action, Getter, Mutation } from 'vuex-class';
	import posed from 'vue-pose';

	import Avatar from '@/components/employee/avatar';
	import EmployeeInfo from '@/components/employee/employee-info';
	import ScrollBar from '@/components/scroll-bar.vue';
	import PreviewPage from '@/components/preview-page.vue';
	import PruductFooter from '@/components/product-footer.vue';

	@Component({
		layout: 'immediate',
		transition: 'page',
		head: {
			title: 'Our staff',
		},
		components: {
			avatar: Avatar,
			'avatar-info': EmployeeInfo,
			ScrollBar,
			PreviewPage,
			'product-footer': PruductFooter,
			Staff: posed.div({
				visible: {
					opacity: 1,
					y: 0,
				},
				hidden: {
					opacity: 0,
					y: 40,
				},
			}),
		},
		asyncData({ store, route }) {
			/**
			 * Set cover to get load video
			 * before the fetching data
			 */
			store.commit('PageModule/setPageCover', {
				lang: store.$i18n.locale,
				link: route.path,
			});
		},
	})
	export default class OurStaffPage extends Vue {
		@Action('PageModule/selectPage') selectPage;
		@Action('ContentModule/selectClientContent') selectClientContent;
		@Getter('PageModule/getPage') page;
		@Getter('ContentModule/getContents') pageContent;
		@Getter('getIsHideAnimationContent') getIsHideAnimationContent;
		@Mutation('ContentModule/setContents') setContents;

		curStaff: number = 0;
		observers: IntersectionObserver[] = [];
		staffToAnimate: number[] = [];
		// needs for getting refs after we fetch data and render staff
		isRenderContent: boolean = false;

		get getPageContent() {
			if (Boolean(this.pageContent)) {
				this.isRenderContent = true;
			}
			return this.pageContent;
		}

		switchSlide(nextSlide) {
			const { curStaff, pageContent } = this;
			const totalStaff = this.getPageContent.length;
			let newIndex;
			if (nextSlide) {
				newIndex = curStaff + 1 < totalStaff ? curStaff + 1 : 0;
			} else {
				newIndex = curStaff - 1 < 0 ? totalStaff - 1 : curStaff - 1;
			}
			this.curStaff = newIndex;
		}

		get sliderInfo() {
			return `${this.curStaff + 1} / ${
				this.getPageContent.length ? this.getPageContent.length : 0
			}`;
		}

		setAnimation(entry, representationIndex, observer) {
			if (
				entry.intersectionRatio > 0 &&
				!this.staffToAnimate.includes(representationIndex)
			) {
				this.staffToAnimate.push(representationIndex);
				observer.disconnect();
			}
		}

		get isLgAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.lgAndUp : false;
		}
		get isMdAndUp() {
			return this.$breakpoint ? this.$breakpoint.is.mdAndUp : false;
		}
		get isXsOnly() {
			return this.$breakpoint ? this.$breakpoint.is.xsOnly : false;
		}

		// On change page content add observers to each rendered section
		@Watch('isRenderContent')
		onChangePageContent() {
			const staff: any = this.$refs.staff;

			this.observers = staff.map((currStaff, index) => {
				const options = { threshold: 0.7 };
				const observer = new IntersectionObserver(
					([entry], observer) => this.setAnimation(entry, index, observer),
					options,
				);
				observer.observe(currStaff);
				return observer;
			});
		}

		async created() {
			const lang = this.$i18n.locale;
			const link = this.$route.path.replace(`/${lang}`, '').replace('/', '');

			await this.selectPage({ link, lang });
			await this.selectClientContent({
				page: this.page.page_id,
				lang,
			});
		}
		beforeDestroy() {
			this.observers.forEach(observer => {
				observer.disconnect();
			});

			this.setContents([]);
		}
	}
</script>

<style lang="sass">
	.card-addition
		display: flex
		flex-direction: column
		color: #FFFFFF
		position: relative
		justify-content: center

	.card-img-hover
		border-radius: 50px !important
		filter: brightness(35%)
		transition: 1s

	.card-img-hover:hover
		z-index: 10
		transform: scale(1.15)
		filter: brightness(100%)
		border-radius: 0 !important
		transition: 1s

		~ .card-addition

			.employee-name
				opacity: 0
				transition: 0.5s
				display: none

			.employee-position-full
				opacity: 1

			.employee-position-short
				opacity: 0

	.staff-slider
		height: 70vh

	.staff-slide
		height: 65vh

	.max-width
		max-width: 100vw

	.v-card:not(.v-sheet--tile)
		border-radius: 0
</style>
