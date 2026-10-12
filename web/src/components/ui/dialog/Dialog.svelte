<script lang="ts">
	import { Dialog } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props extends Dialog.RootProps {
		triggerComponent?: Snippet;
		children: Snippet;
	}

	let { open = $bindable(false), children, triggerComponent }: Props = $props();
</script>

<Dialog.Root bind:open>
	{#if triggerComponent}
		<Dialog.Trigger>
			{@render triggerComponent()}
		</Dialog.Trigger>
	{/if}
	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 bg-black/80 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
		/>
		<Dialog.Content
			class="fixed top-[50%] left-[50%] w-120 max-w-dvw translate-[-50%] px-4 data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in"
		>
			<div class="flex w-full rounded-3xl border-2 border-neutral-800 bg-neutral-900 p-5">
				{@render children()}
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
