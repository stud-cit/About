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
			extension-height="60"
		>
			<template v-slot:img>
				<v-img
					:src="
						page && page.cover
							? getDynamicAssets(page.cover.image)
							: appBackground
					"
					:gradient="getGradient()"
				/>
			</template>

			<v-app-bar-nav-icon @click="logout">
				<v-icon>mdi-logout</v-icon>
			</v-app-bar-nav-icon>

			<v-app-bar-nav-icon v-if="page" @click="logout">
				<v-icon>mdi-logout</v-icon>
			</v-app-bar-nav-icon>

			<v-app-bar-nav-icon v-if="page" @click="logout">
				<v-icon>mdi-logout</v-icon>
			</v-app-bar-nav-icon>

			<template v-slot:extension>
				<v-speed-dial
					v-model="changeLocale"
					direction="right"
					transition="slide-x-reverse-transition"
					class="d-flex mx-12"
				>
					<template v-slot:activator color="red">
						StudCIT

						<v-divider class="mx-4" vertical></v-divider>
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
			</template>

			<v-spacer />

			<PageLink icon v-for="(page, i) in pages" :key="i" :page="page" />
		</v-app-bar>

		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col xs="12" sm="10" md="10" lg="8" xl="6">
						<nuxt />
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter } from 'vuex-class';

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
		@Getter('PageModule/getPage') page;

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

		mounted() {
			const { innerWidth } = window;
			this.appBackground = `//picsum.photos/${innerWidth}/?random`;
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
