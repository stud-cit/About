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
		>
			<template v-slot:img>
				<v-img
					:src="
						selectedPage.cover
							? getStaticAssetUrl(selectedPage.cover.image)
							: appBackground
					"
					:gradient="getGradient()"
				/>
			</template>

			<v-app-bar-nav-icon @click="logout">
				<v-icon>mdi-logout</v-icon>
			</v-app-bar-nav-icon>

			<v-row align="end" justify="start" class="fill-height">
				<v-col md="2" cols="6">
					StudCIT
				</v-col>

				<v-col md="2" cols="1" class="my-n1">
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
		<v-fab-transition>
			<v-btn fixed right dark bottom fab color="primary" @click="createSmth()">
				<v-icon>mdi-plus</v-icon>
			</v-btn>
		</v-fab-transition>
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
		@Action('ContentModule/selectContent') private readonly selectContent;

		private drawer: boolean = false;
		private changeLocale: boolean = false;
		private appBackground: string = '';
		private pages: Pages[] = [
			{
				icon: 'mdi-view-dashboard-outline',
				attr: { to: '/dashboard', exact: true },
			},
			{
				icon: 'mdi-account-group-outline',
				attr: { to: '/dashboard/accounts', exact: true },
			},
			{
				icon: 'mdi-format-paint',
				attr: { to: '/dashboard/setting', exact: true },
			},
			{
				icon: 'mdi-github-circle',
				attr: { href: '//github.com/StudCIT/About', target: '_blank' },
			},
		];

		private async createSmth() {
			if (!this.$route.params.id) return;
			const data = { id: this.selectedPage.page_id, lang: this.$i18n.locale };

			await this.createContent(data);
			await this.selectContent({ page: data.id, lang: this.$i18n.locale });
		}

		private availableLocales() {
			return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
		}

		private getGradient() {
			return `to top right, rgba(81, 176, 255, .7), rgba(63, 81, 181, .7)`;
		}

		private logout() {
			return this.$auth.logout();
		}
	}
</script>
