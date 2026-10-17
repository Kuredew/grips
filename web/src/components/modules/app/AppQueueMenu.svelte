<script>
	import { queueManager } from '#lib/queue.svelte.ts';
	import { Menubar } from 'bits-ui';
	import { ArrowDownIcon, QueueIcon } from 'phosphor-svelte';
	import AppQueueItem from './AppQueueItem.svelte';

	let queueItems = $derived(queueManager.queueItems);
</script>

<Menubar.Menu value="app-queue">
	<Menubar.Trigger
		class="data-highlighted:bg-muted group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-white text-sm font-medium text-black  transition-transform hover:bg-neutral-300 focus-visible:outline-none data-[state=open]:cursor-default data-[state=open]:bg-neutral-800 data-[state=open]:text-white"
	>
		<ArrowDownIcon size="15px" />
		{#if queueItems.length > 0}
			<div class="absolute top-0 right-0 p-1">{queueItems.length}</div>
		{/if}
	</Menubar.Trigger>
	<Menubar.Portal>
		<Menubar.Content
			class="focus-override bg-background shadow-popover z-50 flex w-100 max-w-dvw animate-scale-out flex-col gap-2 px-4 font-[DM_Sans_Variable] text-sm text-white transition-all focus-visible:outline-hidden data-[state=open]:animate-scale-in md:px-0"
			align="end"
			sideOffset={3}
		>
			<div class="flex flex-col gap-2 rounded-3xl border-2 border-neutral-800 bg-black p-4">
				<div class="text-lg font-medium">Queue</div>
				{#if queueItems.length > 0}
					{#each queueItems as queueItem (queueItem.id)}
						<AppQueueItem {queueItem} />
					{/each}
					<div class="text-center text-pretty text-neutral-400">
						The queue list here will disappear after the page is reloaded.
					</div>
				{:else}
					<div class="flex h-80 flex-col items-center justify-center gap-2">
						<QueueIcon size="50px" />
						<p class="max-w-[90%] text-center text-balance text-neutral-400">
							There is no queue task here, try downloading something
						</p>
					</div>
				{/if}
			</div>
		</Menubar.Content>
	</Menubar.Portal>
</Menubar.Menu>
