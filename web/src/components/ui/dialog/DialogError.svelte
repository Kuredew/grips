<script lang="ts">
	import { WarningCircleIcon } from 'phosphor-svelte';
	import Dialog from './Dialog.svelte';
	import { Dialog as DialogBitsUI } from 'bits-ui';
	import ButtonComponent from '../button/ButtonComponent.svelte';
	import { copyToClipboard } from '#lib/util/copyToClipboard.ts';

	interface Props extends DialogBitsUI.RootProps {
		description: string;
		errorDetail?: string | null;
	}

	let copiedHint = $state(false);

	$effect(() => {
		if (!copiedHint) return;

		setTimeout(() => {
			copiedHint = false;
		}, 1000);
	});

	let { open = $bindable(false), description, errorDetail }: Props = $props();
</script>

<Dialog bind:open>
	<div class="flex flex-col items-center justify-center gap-4">
		<div class="flex flex-col items-center justify-center gap-2">
			<WarningCircleIcon size="50px" class="text-white" />
			<p class="text-xl font-medium text-white">Oops!</p>
			<p class="text-center text-pretty">
				{description}
			</p>
			{#if errorDetail}
				<div class="mt-4 w-full rounded-xl bg-neutral-950 p-4 font-mono">
					<p>{errorDetail}</p>
				</div>
			{/if}
		</div>
		<div class="flex w-full flex-1 {errorDetail ? 'justify-between' : 'justify-center'}">
			{#if errorDetail}
				<ButtonComponent
					onclick={() => {
						copyToClipboard(errorDetail);
						copiedHint = true;
					}}
					variant="secondary">{copiedHint ? 'Copied' : 'Copy Error'}</ButtonComponent
				>
			{/if}
			<ButtonComponent
				variant="primary"
				class={errorDetail ? '' : 'w-full'}
				onclick={() => (open = false)}>Okay</ButtonComponent
			>
		</div>
	</div>
</Dialog>
