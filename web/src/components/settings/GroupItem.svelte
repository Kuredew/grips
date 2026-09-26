<script lang="ts">
	import type { Component } from 'svelte';

	let { icon, key }: { icon: Component; key: string } = $props();

	let Icon = $derived(icon);
</script>

<!-- eslint-disable-next-line -->
<a href="/settings/{key}" id="group-item">
	<div id="icon-wrapper">
		<Icon />
	</div>
	<p>{key}</p>
</a>

<style>
	#icon-wrapper {
		padding: 4px;
	}

	#group-item {
		width: 100%;
		display: flex;
		gap: 16px;
		align-items: center;
		padding-left: 14px;
		padding-top: 8px;
		padding-bottom: 8px;
		transition: 0.1s all;
	}

	#group-item:hover {
		background-color: var(--color-neutral-800);
		cursor: pointer;
	}
</style>
