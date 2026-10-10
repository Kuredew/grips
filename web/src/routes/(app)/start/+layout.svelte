<script lang="ts">
	import { pageTitle } from '#lib/pageTitle.ts';

	let { children } = $props();

	let title = pageTitle('start');
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{@render children()}
