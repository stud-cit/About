<template>
	<v-app>
		<v-app-bar
			app
			dark
			prominent
			shrink-on-scroll
			elevate-on-scroll
			fade-img-on-scroll
			color="primary"
		>
			<template v-slot:img>
				<v-img :src="appBackground" :gradient="getGradient()" />
			</template>

			<v-app-bar-nav-icon @click="logout">
				<v-icon>mdi-logout</v-icon>
			</v-app-bar-nav-icon>

			<v-toolbar-title class="font-weight-bold">StudCIT</v-toolbar-title>

			<v-spacer />

			<PageLink v-for="(page, i) in pages" :key="i" :page="page" icon />
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
		private drawer: boolean = false;
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
				attr: { href: 'https://github.com/StudCIT/About', target: '_blank' },
			},
		];

		mounted() {
			const { innerWidth, innerHeight } = window;
			this.appBackground = `https://picsum.photos/${innerWidth}/128/?random`;
		}

		private getGradient() {
			return `to top right, rgba(81, 176, 255, .7), rgba(63, 81, 181, .7)`;
		}

		private logout() {
			return this.$auth.logout();
		}
	}
</script>
