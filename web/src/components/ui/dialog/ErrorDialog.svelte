<script lang="ts">
	import { WarningCircleIcon } from 'phosphor-svelte';
	import ButtonComponent from '../button/ButtonComponent.svelte';
	import { AlertDialog } from 'bits-ui';

	interface Props extends AlertDialog.RootProps {
		title?: string;
		message: string;
		onClose?: () => void;
	}

	let copiedHint = $state(false);

	$effect(() => {
		if (!copiedHint) return;

		setTimeout(() => {
			copiedHint = false;
		}, 1000);
	});

	let { open = $bindable(false), title, message, onClose = () => null }: Props = $props();

	$effect(() => {
		if (!open) {
			onClose();
		}
	});
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Portal>
		<AlertDialog.Overlay
			class="fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
		/>
		<AlertDialog.Content
			class="shadow-popover fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-2 rounded-2xl border-2 border-neutral-800 bg-neutral-900 p-7 outline-hidden data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in sm:max-w-lg md:w-full"
		>
			<WarningCircleIcon size="50px" class="text-white" />

			<AlertDialog.Title class="text-lg font-semibold tracking-tight">
				{title || 'Oops!'}
			</AlertDialog.Title>

			<AlertDialog.Description class="text-sm">
				{message}
			</AlertDialog.Description>

			<ButtonComponent variant="primary" class="mt-4 w-full" onclick={() => (open = false)}
				>Okay</ButtonComponent
			>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
