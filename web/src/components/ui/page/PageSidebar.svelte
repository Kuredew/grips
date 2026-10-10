<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, title }: { children: Snippet; title: string } = $props();
</script>

<div
	class="flex h-full w-full flex-col gap-4 text-white group-data-[mobile=false]:w-70! group-[[data-home='false'][data-mobile='true']]:hidden"
>
	<div class="text-lg font-medium text-white">{title}</div>
	<div class="flex w-full flex-col">
		{@render children()}
	</div>
</div>
