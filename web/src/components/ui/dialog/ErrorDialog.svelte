<script lang="ts">
	import AlertDialogContent from '#components/ui/alertDialog/AlertDialogContent.svelte';
	import AlertDialogDescription from '#components/ui/alertDialog/AlertDialogDescription.svelte';
	import AlertDialogOverlay from '#components/ui/alertDialog/AlertDialogOverlay.svelte';
	import AlertDialogPortal from '#components/ui/alertDialog/AlertDialogPortal.svelte';
	import AlertDialogRoot from '#components/ui/alertDialog/AlertDialogRoot.svelte';
	import AlertDialogTitle from '#components/ui/alertDialog/AlertDialogTitle.svelte';
	import { WarningCircleIcon } from 'phosphor-svelte';
	import ButtonComponent from '../button/ButtonComponent.svelte';
	import type { AlertDialog } from 'bits-ui';

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

	let { open = $bindable(false), title, message, onClose = () => null, ...rest }: Props = $props();

	$effect(() => {
		if (!open) {
			onClose();
		}
	});
</script>

<AlertDialogRoot bind:open {...rest}>
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogContent>
			<WarningCircleIcon size="50px" class="text-white" />

			<AlertDialogTitle>
				{title || 'Oops!'}
			</AlertDialogTitle>

			<AlertDialogDescription>
				{message}
			</AlertDialogDescription>

			<ButtonComponent variant="primary" class="mt-4 w-full" onclick={() => (open = false)}
				>Okay</ButtonComponent
			>
		</AlertDialogContent>
	</AlertDialogPortal>
</AlertDialogRoot>
