<script lang="ts">
	import { queueManager } from '$lib/queue.svelte';
	import { downloadBlob } from '$lib/util/downloadBlob';
	import { toast } from '@zerodevx/svelte-toast';
	import Loading from '../loader/Loading.svelte';
	import AudioIcon from '../logo/AudioIcon.svelte';
	import SparkleIcon from '../logo/SparkleIcon.svelte';
	import VideoIcon from '../logo/VideoIcon.svelte';
	let hovered = $state(false);

	let { id }: { id: string } = $props();

	const item = $derived(queueManager.getItem(id));

	const onclick = () => {
		if (!item) return;

		if (item.status == 'failed' && item.error) {
			navigator.clipboard.writeText(item.error);

			toast.push('error copied!');
			return;
		}

		console.log('Triggering download');
		if (item.mediaBlob !== null && item.fileName != null) {
			console.log('Download triggered.');
			downloadBlob(item.mediaBlob, item.fileName);
		}
	};
</script>

{#if item}
	<button
		class="flex w-full cursor-pointer flex-col gap-2 overflow-hidden"
		onmouseenter={() => (hovered = true)}
		onmouseleave={() => (hovered = false)}
		{onclick}
	>
		<div class="flex gap-2">
			<div class="shrink-0">
				{#if item.mediaType == 'auto'}
					<SparkleIcon />
				{:else if item.mediaType == 'video'}
					<VideoIcon />
				{:else if item.mediaType == 'audio'}
					<AudioIcon />
				{/if}
			</div>
			<p class="text-sm font-medium text-nowrap">
				{item.fileName || item.title}
			</p>
		</div>
		<div class="h-1 w-full overflow-hidden rounded-full bg-neutral-700">
			<div
				class="h-full w-(--percent) transition-all {item.status == 'completed'
					? 'bg-blue-400'
					: 'bg-white'}"
				style="--percent: {item.percent}%"
			></div>
		</div>
		<div class="flex items-center gap-2">
			{#if hovered && item.status == 'completed'}
				<p class="text-sm text-neutral-400">click to download.</p>
			{:else if item.status == 'completed'}
				<p class="text-sm text-neutral-400">✓ done.</p>
			{:else if item.status == 'failed'}
				{#if !hovered}
					<p class="text-sm text-neutral-400">failed.</p>
				{:else}
					<p class="text-sm text-neutral-400">click to copy error detail.</p>
				{/if}
			{:else if item.status == 'downloading'}
				<div class="flex w-full justify-between">
					<div class="flex items-center gap-2">
						<Loading size="0.25px" />
						<p class="text-sm text-neutral-400">downloading...</p>
					</div>
					<p class="text-sm text-neutral-400">{item.percent}%</p>
				</div>
			{:else}
				<Loading size="0.25px" />
				<p class="text-sm text-nowrap text-neutral-400">
					{item.log[item.log.length - 1] || item.status}... ({item.log.length} logs)
				</p>
			{/if}
		</div>
	</button>
{/if}
