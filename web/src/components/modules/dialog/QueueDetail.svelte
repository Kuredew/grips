<script lang="ts">
	import AlertDialogContent from '#components/ui/alertDialog/AlertDialogContent.svelte';
	import AlertDialogDescription from '#components/ui/alertDialog/AlertDialogDescription.svelte';
	import AlertDialogOverlay from '#components/ui/alertDialog/AlertDialogOverlay.svelte';
	import AlertDialogPortal from '#components/ui/alertDialog/AlertDialogPortal.svelte';
	import AlertDialogRoot from '#components/ui/alertDialog/AlertDialogRoot.svelte';
	import AlertDialogTitle from '#components/ui/alertDialog/AlertDialogTitle.svelte';
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import Spinner from '#components/ui/icon/Spinner.svelte';
	import type { QueueItem } from '#lib/types/queue.ts';
	import { copyToClipboard } from '#lib/util/copyToClipboard.ts';
	import { downloadBlob } from '#lib/util/downloadBlob.ts';
	import type { AlertDialog } from 'bits-ui';
	import { CheckIcon, CopyIcon, DownloadIcon } from 'phosphor-svelte';

	interface Props extends AlertDialog.RootProps {
		queue: QueueItem;
	}

	let { open = $bindable(false), queue, ...rest }: Props = $props();

	let logWrapperDiv: HTMLDivElement | null = $state(null);

	let savedLogs: string[] = $state([]);
	$effect(() => {
		if (queue.state == 'extracting') {
			savedLogs = queue.log;

			logWrapperDiv?.scrollTo({
				top: logWrapperDiv.scrollHeight,
				behavior: 'smooth'
			});
		}
	});

	let savedLogsString: string = $derived.by(() => {
		let logsString = '';
		savedLogs.forEach((logString) => {
			if (logString) logsString += logString + '\n';
		});
		return logsString;
	});

	let copied = $state(false);
</script>

<AlertDialogRoot bind:open {...rest}>
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogContent>
			<AlertDialogTitle>{queue.title}</AlertDialogTitle>
			{#if queue.state == 'finished'}
				<AlertDialogDescription>Done!</AlertDialogDescription>
			{:else if queue.state == 'failed'}
				<AlertDialogDescription>Failed!</AlertDialogDescription>
			{:else}
				<AlertDialogDescription
					><div class="flex items-center gap-1">
						<Spinner />
						{queue.state}...
					</div></AlertDialogDescription
				>
			{/if}

			{#if queue.state == 'downloading'}
				<div class="relative flex h-1 max-h-1 min-h-1 flex-1 rounded-full bg-neutral-800">
					<div
						class="progress absolute top-0 left-0 h-1 rounded-full bg-white"
						style="--progress: {queue.progress}%"
					></div>
				</div>
			{/if}

			{#if savedLogs.length > 0}
				<div
					class="relative mt-4 w-full max-w-full overflow-hidden rounded-xl bg-black p-4 text-sm"
				>
					<div class="absolute top-0 right-0 p-2">
						<ButtonComponent
							variant="secondary"
							onclick={() => {
								copyToClipboard(savedLogsString);
								copied = true;

								setTimeout(() => {
									copied = false;
								}, 2000);
							}}
							class="h-fit! w-fit! p-2!"
						>
							{#if copied}
								<CheckIcon />
							{:else}
								<CopyIcon />
							{/if}
						</ButtonComponent>
					</div>
					<div
						bind:this={logWrapperDiv}
						class="max-h-50 scrollbar-track-transparent overflow-y-auto"
					>
						<pre>{savedLogsString}</pre>
					</div>
				</div>
			{/if}

			{#if queue.state == 'finished'}
				<ButtonComponent
					variant="secondary"
					onclick={() => {
						downloadBlob(queue.blob, queue.title);
					}}
					class="flex gap-2">Save <DownloadIcon /></ButtonComponent
				>
			{/if}

			<ButtonComponent onclick={() => (open = false)}>Close</ButtonComponent>
		</AlertDialogContent>
	</AlertDialogPortal>
</AlertDialogRoot>

<style>
	.progress {
		width: var(--progress);
	}
</style>
