<script lang="ts">
	import type { QueueItem } from '#lib/types/queue.ts';
	import { copyToClipboard } from '#lib/util/copyToClipboard.ts';
	import { downloadBlob } from '#lib/util/downloadBlob.ts';
	import { FileAudioIcon, SparkleIcon } from 'phosphor-svelte';
	let copiedHint = $state(false);

	$effect(() => {
		if (!copiedHint) return;

		setTimeout(() => {
			copiedHint = false;
		}, 1000);
	});

	let hover = $state(false);
	let { queueItem }: { queueItem: QueueItem } = $props();
</script>

<button
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
	onclick={() => {
		switch (queueItem.state) {
			case 'finished':
				downloadBlob(queueItem.blob, queueItem.title);
				break;
			case 'failed':
				copyToClipboard(queueItem.errorDetail);
				copiedHint = true;
				break;
		}
	}}
	class="flex cursor-pointer gap-2 rounded-lg bg-neutral-900 px-3 py-2 {queueItem.state !==
		'finished' && queueItem.state !== 'failed'
		? 'pointer-events-none'
		: ''} {queueItem.state == 'failed' ? 'bg-red-950' : ''}"
>
	<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black">
		{#if queueItem.mediaType == 'auto'}
			<SparkleIcon size="20px" />
		{:else if queueItem.mediaType == 'audio'}
			<FileAudioIcon size="20px" />
		{/if}
	</div>

	<div class="flex min-w-0 flex-1 flex-col gap-2">
		<p class="truncate text-left">{queueItem.title}</p>
		{#if queueItem.state == 'downloading'}
			<div class="relative flex h-1 max-h-1 min-h-1 flex-1 rounded-full bg-neutral-800">
				<div
					class="progress absolute top-0 left-0 h-1 rounded-full bg-white"
					style="--progress: {queueItem.progress}%"
				></div>
			</div>
		{/if}
		<div class="flex justify-between">
			{#if queueItem.state == 'extracting'}
				<p class="truncate text-neutral-400">{queueItem.log[queueItem.log.length - 1]}</p>
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
				{#if hover}
					{#if copiedHint}
						<p class="text-neutral-400">Copied</p>
					{:else}
						<p class="text-neutral-400">Click to copy</p>
					{/if}
				{:else}
					<p class="text-neutral-400">{queueItem.errorDetail}</p>
				{/if}
			{/if}
		</div>
	</div>
</button>

<style>
	.progress {
		width: var(--progress);
	}
</style>
