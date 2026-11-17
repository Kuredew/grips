<script lang="ts">
	import AlertDialogContent from '#components/ui/alertDialog/AlertDialogContent.svelte';
	import AlertDialogDescription from '#components/ui/alertDialog/AlertDialogDescription.svelte';
	import AlertDialogOverlay from '#components/ui/alertDialog/AlertDialogOverlay.svelte';
	import AlertDialogPortal from '#components/ui/alertDialog/AlertDialogPortal.svelte';
	import AlertDialogRoot from '#components/ui/alertDialog/AlertDialogRoot.svelte';
	import AlertDialogTitle from '#components/ui/alertDialog/AlertDialogTitle.svelte';
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import TextLink from '#components/ui/text/TextLink.svelte';
	import { copyToClipboard } from '#lib/util/copyToClipboard.ts';
	import { WarningCircleIcon } from 'phosphor-svelte';

	let copied = $state(false);

	let {
		error = $bindable(null)
	}: {
		error: string | null;
	} = $props();
</script>

<AlertDialogRoot
	bind:open={
		() => error !== null,
		(isOpen) => {
			if (!isOpen) {
				error = null;
			}
		}
	}
>
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogContent>
			<WarningCircleIcon size="50px" class="text-white" />
			<AlertDialogTitle>Unsupported Link</AlertDialogTitle>

			<AlertDialogDescription>
				Make sure the link you enter is <TextLink
					href="https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md"
					>supported by yt-dlp</TextLink
				>, <TextLink href="https://github.com/Kuredew/grips/issues/new">open an issue</TextLink> if you
				feel this is a mistake (don't forget to include
				<button
					class={copied ? '' : 'cursor-pointer text-white underline'}
					onclick={() => {
						if (error) {
							copied = true;
							copyToClipboard(error);

							setTimeout(() => {
								copied = false;
							}, 2000);
						}
					}}>{copied ? 'copied' : 'this log'}</button
				>).
			</AlertDialogDescription>

			<ButtonComponent variant="primary" class="mt-4 w-full" onclick={() => (error = null)}
				>Okay</ButtonComponent
			>
		</AlertDialogContent>
	</AlertDialogPortal>
</AlertDialogRoot>
