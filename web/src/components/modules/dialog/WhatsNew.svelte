<script lang="ts">
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import Dialog from '#components/ui/dialog/Dialog.svelte';

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

<Dialog {open}>
	<div class="mb-5 w-full">
		<h1 class="text-2xl font-medium tracking-tight text-white">
			What's new? <span class="text-sm text-neutral-400">{version}</span>
		</h1>
		<p class="text-sm text-neutral-400">See what's new, fixes, and improvements!</p>
	</div>

	<div class="flex flex-col gap-4">
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
			}}>Got it!</ButtonComponent
		>
	</div>
</Dialog>
