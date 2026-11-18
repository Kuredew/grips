<script lang="ts">
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import type { QueueItem } from '#lib/types/queue.ts';
	import {
		ArrowCounterClockwiseIcon,
		FileAudioIcon,
		SparkleIcon,
		VideoIcon
	} from 'phosphor-svelte';
	import QueueDetail from '../dialog/QueueDetail.svelte';
	let copiedHint = $state(false);

	let open = $state(false);

	$effect(() => {
		if (!copiedHint) return;

		setTimeout(() => {
			copiedHint = false;
		}, 1000);
	});

	let { queueItem }: { queueItem: QueueItem } = $props();

	function retryQueue() {
		if (!(queueItem.state == 'failed')) return;

		if (queueItem.retry) {
			queueItem.retry();
		}
	}

	let hover = $state(false);
</script>

<div class="relative flex">
	<button
		onclick={() => {
			open = true;
		}}
		class="flex w-full max-w-full cursor-pointer gap-2 rounded-lg bg-neutral-900 px-3 py-2 {queueItem.state ==
		'failed'
			? 'bg-red-950'
			: ''}"
	>
		<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black">
			{#if queueItem.mediaType == 'auto'}
				<SparkleIcon size="20px" />
			{:else if queueItem.mediaType == 'video'}
				<VideoIcon size="20px" />
			{:else if queueItem.mediaType == 'audio'}
				<FileAudioIcon size="20px" />
			{/if}
		</div>

		<div
			class="flex min-w-0 flex-1 flex-col {queueItem.state == 'downloading' ? 'gap-2' : 'gap-1'}"
		>
			<p class="truncate text-left">{queueItem.title}</p>
			{#if queueItem.state == 'downloading'}
				<div class="relative flex h-1 max-h-1 min-h-1 flex-1 rounded-full bg-neutral-800">
					<div
						class="progress absolute top-0 left-0 h-1 rounded-full bg-white"
						style="--progress: {queueItem.progress}%"
					></div>
				</div>
			{/if}
			<div class="flex justify-between text-left">
				{#if queueItem.state == 'extracting'}
					<p class="truncate text-neutral-400">
						{queueItem.log[queueItem.log.length - 1] || 'Preparing...'}
					</p>
				{:else if queueItem.state == 'downloading'}
					<p class="text-neutral-400">Downloading media...</p>
					<p>{queueItem.progress}%</p>
				{:else if queueItem.state == 'finished'}
					{#if hover}
						<p class="text-neutral-400">✓ Click to download</p>
					{:else}
						<p class="text-neutral-400">✓ Download finished</p>
					{/if}
				{:else if queueItem.state == 'failed'}
					{#if copiedHint}
						<p class="text-neutral-400">Copied</p>
					{:else}
						<p class="overflow-hidden text-nowrap text-ellipsis text-neutral-400">
							{queueItem.errorDetail}
						</p>
					{/if}
				{/if}
			</div>
		</div>
	</button>

	{#if queueItem.state == 'failed'}
		<div class="absolute top-[50%] right-0 translate-y-[-50%] p-2">
			<ButtonComponent onclick={retryQueue} variant="secondary" class="h-fit! w-fit! p-2!"
				><ArrowCounterClockwiseIcon /></ButtonComponent
			>
		</div>
	{/if}
</div>

<QueueDetail bind:open queue={queueItem} />

<style>
	.progress {
		width: var(--progress);
	}
</style>
