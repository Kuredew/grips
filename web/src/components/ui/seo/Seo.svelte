<script lang="ts">
	import { page } from '$app/state';

	interface Props {
		type?: string;
		siteName?: string;
		title?: string;
		description?: string;
		canonicalUrl?: string;
		imageUrl?: string;
	}
	let { type, siteName, title, description, imageUrl, canonicalUrl }: Props = $props();

	let origin = $derived(page.url.origin);
	let canonicalAbsoluteUrl = $derived.by(() => {
		if (canonicalUrl) return origin + canonicalUrl;
		return null;
	});
	let imageAbsoluteUrl = $derived.by(() => {
		if (imageUrl) return origin + imageUrl;
		return null;
	});
</script>

{#snippet titleComponent(content: string)}
	<title>{content}</title>
	<meta property="twitter:title" {content} />
	<meta property="og:title" {content} />
{/snippet}

{#snippet siteNameComponent(content: string)}
	<meta property="og:site_name" {content} />
{/snippet}

{#snippet descriptionComponent(content: string)}
	<meta property="twitter:description" {content} />
	<meta name="description" {content} />
	<meta property="og:description" {content} />
{/snippet}

{#snippet imageComponent(content: string)}
	<meta property="twitter:image" {content} />
	<meta property="og:image" {content} />
{/snippet}

{#snippet canonicalUrlComponent(content: string)}
	<link rel="canonical" href={content} />
	<meta property="og:url" {content} />
{/snippet}

{#snippet typeComponent(content: string)}
	<meta property="og:type" {content} />
{/snippet}

<svelte:head>
	{#if title}
		{@render titleComponent(title)}
	{/if}

	{#if siteName}
		{@render siteNameComponent(siteName)}
	{/if}

	{#if description}
		{@render descriptionComponent(description)}
	{/if}

	{#if canonicalAbsoluteUrl}
		{@render canonicalUrlComponent(canonicalAbsoluteUrl)}
	{/if}

	{#if imageAbsoluteUrl}
		{@render imageComponent(imageAbsoluteUrl)}
	{/if}

	{#if type}
		{@render typeComponent(type)}
	{/if}

	<meta property="twitter:card" content="summary_large_image" />
</svelte:head>
