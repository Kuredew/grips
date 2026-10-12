<script lang="ts">
	import BackLink from '#components/modules/navigation/BackLink.svelte';
	import type { Snippet } from 'svelte';

	let {
		children,
		title,
		backButtonHref
	}: { children: Snippet; title: string; backButtonHref: string } = $props();
</script>

<div
	class="flex h-full w-full flex-col gap-4 text-white group-data-[mobile=false]:w-70! group-[[data-home='false'][data-mobile='true']]:hidden"
>
	<BackLink href={backButtonHref} />
	<div class="text-lg font-medium text-white">{title}</div>
	<div class="flex w-full flex-col">
		{@render children()}
	</div>
</div>
