<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	let { children, title }: { children: Snippet; title: string } = $props();
</script>

<div class="flex w-full flex-col gap-8 p-2 py-4 md:max-w-xl">
	<div class="flex w-full items-center gap-4 text-white md:hidden">
		<a href={resolve('/(app)/settings')}>←</a>
		<div class="text-center font-medium">{title}</div>
	</div>
	<div class="flex w-full flex-col gap-8">
		{@render children()}
	</div>
</div>
