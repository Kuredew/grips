<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import NavigationBar from '#components/bar/NavigationBar.svelte';
	import Spinner from '#components/spinner/Spinner.svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';
	let loading = $state(false);

	beforeNavigate(() => {
		loading = true;
	});

	afterNavigate(() => {
		loading = false;
	});
	$effect(() => {
		console.log(loading);
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

<NavigationBar />

{#if loading}
	<div transition:fade class="fixed bottom-0 left-0 p-4">
		<Spinner />
	</div>
{/if}

{@render children()}

<!-- <p class="fixed bottom-0 w-dvw max-w-dvw py-8 text-center text-sm opacity-50">
	this tool and their functionality is not vibe coded.
</p> -->
