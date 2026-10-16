<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import Spinner from '#components/ui/icon/Spinner.svelte';
	import { settingsManager } from '#lib/settings.svelte.ts';
	import { browser } from '$app/env';
	import Seo from '#components/ui/seo/Seo.svelte';
	import { page } from '$app/state';
	let loading = $state(false);
	let dimmed = $state(false);

	let timeout: NodeJS.Timeout | null = null;

	beforeNavigate(() => {
		loading = true;
	});

	afterNavigate(() => {
		loading = false;
	});

	$effect(() => {
		if (loading) {
			timeout = setTimeout(() => {
				dimmed = true;
			}, 300);
		} else {
			dimmed = false;

			if (!timeout) return;
			clearTimeout(timeout);
		}
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
	<link rel="icon" href="/img/grips/favicon-48.png" type="image/png" sizes="48x48" />
	<link rel="icon" href="/img/grips/favicon.png" type="image/png" sizes="512x512" />
</svelte:head>

<Seo
	type={page.data.type || 'website'}
	siteName="grips"
	title={page.data.title}
	canonicalUrl={page.data.canonicalUrl}
	imageUrl="/img/grips/banner.png"
	description={page.data.description}
/>

{#if dimmed}
	<div transition:fade class="pointer-events-none fixed z-100 h-dvh w-dvw bg-black/50"></div>
{/if}

{#if loading}
	<div transition:fade class="fixed bottom-0 left-0 z-200 p-4">
		<Spinner />
	</div>
{/if}

<div class="fixed top-0 left-0 -z-10 h-dvh w-dvw bg-linear-to-b from-black to-neutral-800"></div>

{@render children()}
