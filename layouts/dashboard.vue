<template>
	<v-app>
		<v-app-bar
			app
			dark
			prominent
			color="primary"
			shrink-on-scroll
			elevate-on-scroll
			fade-img-on-scroll
			class="header-height"
		>
			<template v-slot:img>
				<v-img
					:src="
						selectedPage.cover
							? getDynamicAssets(selectedPage.cover.image)
							: appBackground
					"
					:gradient="getGradient()"
				/>
			</template>

			<v-app-bar-nav-icon to="/dashboard" v-show="!dashboardPage">
				<v-icon>mdi-arrow-left</v-icon>
			</v-app-bar-nav-icon>

			<v-row align="center" justify="start" class="ml-3">
				<v-col md="2" sm="4" cols="6" class="py-1 mr-2">
					<div
						class="back-link"
						@click="$router.push(localePath({ name: 'index' }))"
					>
						StudCIT
					</div>
				</v-col>

				<v-col md="2" cols="1" class="my-n1 py-1">
					<v-speed-dial
						v-model="changeLocale"
						direction="right"
						transition="slide-x-reverse-transition"
					>
						<template v-slot:activator color="red">
							<v-btn icon v-model="changeLocale">
								<v-icon v-if="changeLocale">mdi-close</v-icon>
								<span v-else>{{ $i18n.locale }}</span>
							</v-btn>
						</template>
						<v-btn
							icon
							v-for="(locale, i) in availableLocales()"
							v-text="locale.code"
							:key="i"
							:to="switchLocalePath(locale.code)"
						/>
					</v-speed-dial>
				</v-col>
			</v-row>

			<v-spacer />

			<PageLink icon v-for="(page, i) in pages" :key="i" :page="page" />
		</v-app-bar>

		<v-container class="fill-height">
			<v-content>
				<nuxt />
			</v-content>
		</v-container>
		<v-fab-transition v-if="getIsShowAddEntity">
			<v-btn fixed right dark bottom fab color="primary" @click="createSmth()">
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-fab-transition>
		<v-dialog v-model="loading">
			<v-row justify="center" align="center">
				<v-progress-circular
					indeterminate
					size="200"
					width="8"
					color="light-blue"
				>
					<v-avatar width="192px" height="192px">
						<img src="/logo-admin.jpg" />
					</v-avatar>
				</v-progress-circular>
			</v-row>
		</v-dialog>
	</v-app>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Action } from 'vuex-class';
	interface PagesAttr {
		to?: string;
		exact?: boolean;
		href?: string;
		target?: string;
	}
	export interface Pages {
		icon: string;
		title?: string;
		attr?: PagesAttr;
		click?: () => void;
	}
	@Component({
		middleware: ['auth'],
		components: {
			PageLink: () => import('~/components/PageLink'),
		},
	})
	export default class DashboardLayout extends Vue {
		@Getter('ContentModule/getContent') private readonly content;
		@Getter('PageModule/getPage') private readonly selectedPage;
		@Action('ContentModule/createContent') private readonly createContent;
		@Action('ContentModule/selectAdminContent')
		private readonly selectAdminContent;
		private drawer: boolean = false;
		private changeLocale: boolean = false;
		private appBackground: string = '';
		private dashboardPage: boolean = false;

		private loading: boolean = false;

		private pages: Pages[] = [
			{
				icon: 'mdi-github-circle',
				attr: { href: '//github.com/StudCIT/About', target: '_blank' },
			},
			// {
			// 	icon: 'mdi-account-group-outline',
			// 	attr: { to: '/dashboard/accounts', exact: true },
			// },
			// {
			// 	icon: 'mdi-format-paint',
			// 	attr: { to: '/dashboard/setting', exact: true },
			// },
			{
				icon: 'mdi-logout',
				attr: {},
				click: this.logout,
			},
		];
		private async createSmth() {
			this.loading = true;
			if (!this.$route.params.id) return;
			const data = { id: this.selectedPage.page_id, lang: this.$i18n.locale };
			await this.createContent(data);
			await this.selectAdminContent({ page: data.id, lang: this.$i18n.locale });
			setTimeout(() => (this.loading = false), 500);
		}
		private availableLocales() {
			return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
		}
		private getGradient() {
			return `to top right, rgba(81, 176, 255, .7), rgba(63, 81, 181, .7)`;
		}
		get getIsShowAddEntity() {
			return this.$route.params.id;
		}
		private logout() {
			return this.$auth.logout();
		}
		private onCheckCurrentPage() {
			if (
				(this.$i18n.locale !== 'en' ? '/' + this.$i18n.locale : '') +
					'/dashboard' ===
				this.$route.path
			) {
				this.dashboardPage = true;
			} else {
				this.dashboardPage = false;
			}
		}
		mounted() {
			this.onCheckCurrentPage();
		}
		updated() {
			this.onCheckCurrentPage();
		}
	}
</script>
<style lang="sass">
	.header-height
		height: 56px !important

		.v-toolbar__content
			height: 56px !important

	.back-link
		text-decoration: none
		color: #FFF!important
		background: none!important
		display: flex
		cursor: pointer

	.v-dialog
		box-shadow: none !important
</style>
