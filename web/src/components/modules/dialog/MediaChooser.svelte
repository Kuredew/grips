<script lang="ts">
	import AlertDialogContent from '#components/ui/alertDialog/AlertDialogContent.svelte';
	import AlertDialogDescription from '#components/ui/alertDialog/AlertDialogDescription.svelte';
	import AlertDialogOverlay from '#components/ui/alertDialog/AlertDialogOverlay.svelte';
	import AlertDialogPortal from '#components/ui/alertDialog/AlertDialogPortal.svelte';
	import AlertDialogRoot from '#components/ui/alertDialog/AlertDialogRoot.svelte';
	import AlertDialogTitle from '#components/ui/alertDialog/AlertDialogTitle.svelte';
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import type { MediaInfo } from '#lib/types/api.ts';

	let activeIndexList: number[] = $state([]);

	let {
		callback,
		mediaList = $bindable(null)
	}: {
		callback: (selectedIndexList: number[]) => void;
		mediaList: MediaInfo[] | null;
	} = $props();
</script>

{#if mediaList !== null}
	<AlertDialogRoot
		bind:open={
			() => mediaList !== null,
			(isOpen) => {
				if (!isOpen) mediaList = null;
			}
		}
	>
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogContent>
				<AlertDialogTitle>Select Media</AlertDialogTitle>
				<AlertDialogDescription>Select the media you want to download</AlertDialogDescription>

				<div class="mt-4 flex max-h-100 scrollbar-track-transparent flex-col gap-1 overflow-y-auto">
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
							<p class="text-sm">{index + 1}. {mediaInfo.title}</p>
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
				<ButtonComponent
					disabled={activeIndexList.length == 0}
					onclick={() => callback(activeIndexList)}
					class="mt-2">Continue</ButtonComponent
				>
			</AlertDialogContent>
		</AlertDialogPortal>
	</AlertDialogRoot>
{/if}
