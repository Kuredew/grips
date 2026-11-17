<script lang="ts">
	import AlertDialogContent from '#components/ui/alertDialog/AlertDialogContent.svelte';
	import AlertDialogDescription from '#components/ui/alertDialog/AlertDialogDescription.svelte';
	import AlertDialogOverlay from '#components/ui/alertDialog/AlertDialogOverlay.svelte';
	import AlertDialogPortal from '#components/ui/alertDialog/AlertDialogPortal.svelte';
	import AlertDialogRoot from '#components/ui/alertDialog/AlertDialogRoot.svelte';
	import AlertDialogTitle from '#components/ui/alertDialog/AlertDialogTitle.svelte';
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';

	let {
		open = $bindable(false),
		version,
		changelogHtml,
		callback
	}: {
		open: boolean;
		version: string;
		changelogHtml: string;
		callback: () => void;
	} = $props();
</script>

<AlertDialogRoot bind:open>
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogContent>
			<AlertDialogTitle>
				What's new? <span class="text-sm text-neutral-400">{version}</span>
			</AlertDialogTitle>
			<AlertDialogDescription>See what's new, fixes, and improvements!</AlertDialogDescription>

			<div class="mt-4 flex flex-col gap-4">
				<div
					class="prose max-h-100 scrollbar-thumb-neutral-800 scrollbar-track-transparent overflow-x-auto prose-invert"
				>
					{@html changelogHtml}
				</div>
				<ButtonComponent
					variant="secondary"
					onclick={() => {
						callback();
						open = false;
					}}>Don't show me again</ButtonComponent
				>
			</div>
		</AlertDialogContent>
	</AlertDialogPortal>
</AlertDialogRoot>
