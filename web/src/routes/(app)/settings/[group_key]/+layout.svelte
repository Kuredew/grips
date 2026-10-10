<script lang="ts">
	import { pageTitle } from '#lib/pageTitle.ts';

	let { data, children } = $props();

	let title = $derived(pageTitle('settings/' + data.group_key));
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{@render children()}
