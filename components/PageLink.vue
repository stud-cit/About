<template>
	<v-btn
		v-bind="{ ...$attrs, ...page.attr }"
		@click="page.click ? page.click() : null"
		v-on="$listeners"
		class="mx-3"
	>
		<v-icon v-html="page.icon" />
	</v-btn>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from 'vue-property-decorator';

	@Component
	export default class PageLink extends Vue {
		@Prop({ type: Object, required: true }) page: object;
	}
</script>
