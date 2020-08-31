import { Configuration } from '@nuxt/types';
import TerserPlugin from 'terser-webpack-plugin';
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';

import sass from 'sass';

import { ConfigService } from './utils/config/config.service';
const configService = new ConfigService();

const config: Configuration = {
	/*
	 ** Server options
	 */
	server: {
		port: configService.get('APP_PORT'),
		timing: configService.get('APP_TIMG'),
	},
	/*
	 ** Headers of the page
	 */
	head: {
		titleTemplate: `%s`,
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content:
					'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
			},
			{
				hid: 'description',
				name: 'description',
				content: configService.get('APP_DESC'),
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	css: ['~/assets/style/app.sass'],
	/*
	 ** Customize the progress bar color
	 */
	loading: 'components/loading.vue',
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'~/mixins',
		'~/plugins/directives',
		'~/plugins/vuetify',
		'~/plugins/vee-validate',
		'~/plugins/axios',
		{ src: '~/plugins/responsive-video-bg', ssr: false },
		{ src: '~/plugins/swiper', ssr: false },
		{ src: '~/plugins/vuetify-breakpoints', ssr: false },
	],
	/*
	 ** Axios module options
	 */
	axios: {
		baseURL: `${configService.get('BASE_URL')}/`,
	},
	/*
	 ** Authentication module options
	 */
	auth: {
		strategies: {
			local: {
				endpoints: {
					login: {
						url: `${configService.get('BASE_URL')}/auth/login`,
						method: 'post',
						propertyName: 'access_token',
					},
					user: {
						url: `${configService.get('BASE_URL')}/admin/user`,
						method: 'get',
						propertyName: '',
					},
					logout: false,
				},
				tokenRequired: true,
				tokenType: 'Bearer',
			},
		},
		redirect: {
			login: '/dashboard/auth',
			logout: '/',
			home: '/dashboard',
		},
	},

	i18n: {
		lazy: true,
		parsePages: true,
		langDir: 'lang/',
		defaultLocale: 'en',
		locales: [
			{
				code: 'en',
				file: 'en-US.js',
				name: 'English',
			},
			{
				code: 'ru',
				file: 'ru-RU.js',
				name: 'Russian',
			},
			{
				code: 'ua',
				file: 'ua-UA.js',
				name: 'Ukrainian',
			},
		],
	},
	/*
	 ** Optimization plugin bu terser
	 */
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	/*
	 ** Modules to load before mounting the App
	 */
	buildModules: [
		'@nuxt/typescript-build',
		'nuxt-i18n',
		'@nuxtjs/auth',
		'@nuxtjs/axios',
		'@nuxtjs/proxy',
	],
	build: {
		extend(config: any) {
			config.plugins.push(
				new StyleLintPlugin({
					files: '**/*.vue',
					configFile: './stylelint.config.js',
					syntax: 'sass',
				}),
			);
		},
		terser: {
			terserOptions: {
				compress: {
					drop_console: configService.get('NODE_ENV') === 'production',
				},
			},
		},
		analyze: true,
		transpile: ['vuetify/lib'],
		plugins: [new VuetifyLoaderPlugin()],
		loaders: {
			sass: {
				implementation: sass,
				indentedSyntax: true,
			},
		},
	},
	typescript: {
		typeCheck: false,
		ignoreNotFoundWarnings: true,
	},
	env: {
		baseUrl: configService.get('BASE_URL'),
	},
};

export default config;
