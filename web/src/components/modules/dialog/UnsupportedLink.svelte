<script lang="ts">
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import TextLink from '#components/ui/text/TextLink.svelte';
	import { copyToClipboard } from '#lib/util/copyToClipboard.ts';
	import { AlertDialog } from 'bits-ui';
	import { WarningCircleIcon } from 'phosphor-svelte';

	let copied = $state(false);

	let {
		error = $bindable(null)
	}: {
		error: string | null;
	} = $props();
</script>

<AlertDialog.Root
	bind:open={
		() => error !== null,
		(isOpen) => {
			if (!isOpen) {
				error = null;
			}
		}
	}
>
	<AlertDialog.Portal>
		<AlertDialog.Overlay
			class="fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
		/>
		<AlertDialog.Content
			class="shadow-popover fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-2 rounded-2xl border-2 border-neutral-800 bg-neutral-900 p-7 outline-hidden data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in sm:max-w-lg md:w-full"
		>
			<WarningCircleIcon size="50px" class="text-white" />

			<AlertDialog.Title class="text-lg font-semibold tracking-tight">
				Unsupported Link
			</AlertDialog.Title>

			<AlertDialog.Description class="text-sm">
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
			</AlertDialog.Description>

			<ButtonComponent variant="primary" class="mt-4 w-full" onclick={() => (error = null)}
				>Okay</ButtonComponent
			>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
