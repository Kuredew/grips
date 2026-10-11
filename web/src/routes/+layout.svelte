<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Spinner from '#components/ui/icon/Spinner.svelte';
	import { settingsManager } from '#lib/settings.svelte.ts';
	import { browser } from '$app/env';
	let loading = $state(false);

	beforeNavigate(() => {
		loading = true;
	});

	afterNavigate(() => {
		loading = false;
	});

	$effect(() => {
		if (browser) {
			const value = settingsManager.settingsValue.current['border_radius'];
			let style = '';
			switch (value) {
				case 'blocky':
					style = '0';
					break;
				case 'rounded':
					style = '1';
					break;
			}

			const root = document.documentElement;
			root.style.setProperty('--radius-scale', style);
			root.dataset.borderRadius = value as string;
		}
	});
	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if loading}
	<div transition:fade class="fixed bottom-0 left-0 p-4">
		<Spinner />
	</div>
{/if}

<div class="fixed top-0 left-0 -z-10 h-dvh w-dvw bg-linear-to-b from-black to-neutral-800"></div>

{@render children()}
