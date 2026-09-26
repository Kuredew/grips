<script lang="ts">
	import type { Snippet } from 'svelte';
	import PageHeader from './PageHeader.svelte';

	let { children, title }: { children: Snippet; title: string } = $props();
</script>

<div id="page">
	<PageHeader {title} />
	<div id="page-content-wrapper" class="scrollbar-none">
		{@render children()}
	</div>
</div>

<style>
	#page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	#page-content-wrapper {
		height: 100%;
		overflow-y: auto;
		flex: 1;
		width: 100%;
	}
</style>
