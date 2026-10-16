<script lang="ts">
	import type { ChangelogItem } from '#lib/changelog.ts';
	import { resolve } from '$app/paths';
	let hover = $state(false);

	let {
		latest = false,
		compact = false,
		version,
		changelog
	}: { latest?: boolean; compact?: boolean; version: string; changelog: ChangelogItem } = $props();
</script>

{#snippet title()}
	{#if !compact}
		<h1 class="text-4xl font-medium! tracking-tight text-balance text-white">
			{changelog.changelog.metadata.title}
		</h1>
	{:else}
		<h3 class="text-xl font-medium! tracking-tight text-balance text-white">
			{changelog.changelog.metadata.title}
		</h3>
	{/if}
{/snippet}

{#snippet versionSnippet()}
	<p class="text-lg">v{changelog.version} {latest ? '(latest)' : ''}</p>
{/snippet}

{#snippet date()}
	<p class="text-sm">{changelog.changelog.metadata.date}</p>
{/snippet}

{#snippet main()}
	<div class="flex min-w-full flex-col gap-4">
		{#if !compact}
			<div class="flex flex-col gap-1">
				{@render versionSnippet()}
				{@render title()}
				{@render date()}
			</div>
		{/if}
		<div class="flex flex-col gap-2">
			<div class="aspect-video overflow-hidden rounded-3xl">
				<img
					class="h-full w-full object-cover transition-transform {hover ? 'scale-105' : ''}"
					src={'/img/' + changelog.changelog.metadata.image}
					alt={changelog.changelog.metadata.image_desc}
				/>
			</div>
			{#if !compact}
				<p>"{changelog.changelog.metadata.image_desc}"</p>
			{/if}
		</div>
		{#if !compact}
			<div
				class="content prose min-w-full font-normal! text-pretty prose-invert prose-headings:font-medium"
			>
				{@html changelog.changelog.content}
			</div>
		{:else}
			<div class="flex flex-col gap-1">
				{@render date()}
				{@render title()}
			</div>
		{/if}
	</div>
{/snippet}

{#if compact}
	<a
		onmouseenter={() => (hover = true)}
		onmouseleave={() => (hover = false)}
		href={resolve('/(home)/changelogs/[version_id]', { version_id: version })}
	>
		{@render main()}
	</a>
{:else}
	{@render main()}
{/if}
