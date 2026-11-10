<script lang="ts">
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import Dialog from '#components/ui/dialog/Dialog.svelte';
	import DialogHeader from '#components/ui/dialog/DialogHeader.svelte';
	import type { MediaInfo } from '#lib/types/api.ts';

	let activeIndexList: number[] = $state([]);

	let {
		open = $bindable(true),
		callback,
		mediaList
	}: {
		open: boolean;
		callback: (selectedIndexList: number[]) => void;
		mediaList: MediaInfo[];
	} = $props();
</script>

<Dialog {open}>
	<DialogHeader title="Select Media" description="Select the media you want to download" />

	<div class="flex flex-col gap-1">
		{#each mediaList as mediaInfo, index (mediaInfo.id)}
			<button
				class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 transition-all hover:bg-neutral-800 active:bg-neutral-700 {activeIndexList.includes(
					index
				)
					? 'bg-neutral-800'
					: ''}"
				onclick={() => {
					if (activeIndexList.includes(index))
						activeIndexList = activeIndexList.filter((m) => m !== index);
					else activeIndexList.push(index);
				}}
			>
				<p class="text-sm">{mediaInfo.title}</p>
				<div
					class="flex h-4 w-4 items-center justify-center overflow-hidden rounded-full border-2 border-neutral-700 {activeIndexList.includes(
						index
					)
						? 'border-0! bg-white'
						: ''}"
				>
					{#if activeIndexList.includes(index)}
						<div class="h-2 w-2 rounded-full bg-black"></div>
					{/if}
				</div>
			</button>
		{/each}
	</div>

	<div class="mt-4 text-sm">{activeIndexList.length}/{mediaList.length} media selected</div>
	<ButtonComponent onclick={() => callback(activeIndexList)} class="mt-2">Continue</ButtonComponent>
</Dialog>
