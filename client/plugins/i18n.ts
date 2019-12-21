export default ({ app }) => {
	app.store.commit('setLocale', app.i18n.locale);

	app.i18n.beforeLanguageSwitch = (oldLocale: string, newLocale: string) => {
		app.store.commit('setLocale', newLocale);
	};
};
