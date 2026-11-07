<script lang="ts">
	import { WarningCircleIcon } from 'phosphor-svelte';
	import Dialog from './Dialog.svelte';
	import { Dialog as DialogBitsUI } from 'bits-ui';
	import ButtonComponent from '../button/ButtonComponent.svelte';
	import { copyToClipboard } from '#lib/util/copyToClipboard.ts';

	interface Props extends DialogBitsUI.RootProps {
		description: string;
		log?: string | null;
	}

	let copiedHint = $state(false);

	$effect(() => {
		if (!copiedHint) return;

		setTimeout(() => {
			copiedHint = false;
		}, 1000);
	});

	let { open = $bindable(false), description, log }: Props = $props();
</script>

<Dialog bind:open>
	<div class="flex max-w-full flex-col items-center justify-center gap-4">
		<div class="flex max-w-full flex-col items-center justify-center gap-2">
			<WarningCircleIcon size="50px" class="text-white" />
			<p class="text-xl font-medium text-white">Oops!</p>
			<p class="text-center text-pretty">
				{description}
			</p>
			{#if log}
				<div
					class="mt-4 max-w-full scrollbar-none overflow-auto rounded-xl bg-neutral-800 p-4 font-mono text-sm"
				>
					<pre>{log}</pre>
				</div>
			{/if}
		</div>
		<div class="flex w-full flex-1 {log ? 'justify-between' : 'justify-center'}">
			{#if log}
				<ButtonComponent
					onclick={() => {
						copyToClipboard(log);
						copiedHint = true;
					}}
					variant="secondary">{copiedHint ? 'Copied' : 'Copy Error'}</ButtonComponent
				>
			{/if}
			<ButtonComponent variant="primary" class={log ? '' : 'w-full'} onclick={() => (open = false)}
				>Okay</ButtonComponent
			>
		</div>
	</div>
</Dialog>
