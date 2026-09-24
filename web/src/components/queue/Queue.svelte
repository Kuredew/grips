<script lang="ts">
	import { queueManager } from '$lib/queue.svelte';
	import Button from '../button/Button.svelte';

	let clicked = $state(true);
</script>

<div class="fixed top-0 right-0 flex h-80 w-130 flex-col items-end gap-2 p-2">
	<Button onclick={() => (clicked = !clicked)} variant="secondary" class="relative px-4! py-4!">
		{#if queueManager.items.length > 0}
			<div
				class="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 text-sm font-medium text-black"
			>
				{queueManager.items.length}
			</div>
		{/if}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-arrow-down-to-line preview-icon"
			><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg
		>
	</Button>

	<div
		class="flex min-h-0 w-full flex-1 flex-col gap-2 rounded-3xl border-2 border-neutral-800 bg-neutral-900 px-6 py-4 transition-all {!clicked
			? 'scale-0 opacity-0'
			: 'scale-100 opacity-100'}"
	>
		<p class="font-medium">download queue</p>
		<div class="flex max-h-full flex-1 flex-col gap-1 overflow-y-auto"></div>
	</div>
</div>
