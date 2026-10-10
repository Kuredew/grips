<script lang="ts">
	import ButtonComponent from '#components/button/ButtonComponent.svelte';
	import ContainerContent from '#components/container/ContainerContent.svelte';
	import ContainerRoot from '#components/container/ContainerRoot.svelte';
	import { inputManager } from '#lib/input.svelte.ts';
	import type { MediaType } from '#lib/types.ts';
	import { ArrowUpIcon, MusicNoteIcon, SparkleIcon } from 'phosphor-svelte';
	import { onMount } from 'svelte';

	let focus = $state(false);
	let mediaType = $derived(inputManager.mediaType.current);

	let textareaElement: HTMLTextAreaElement | null = $state(null);

	let changeMediaType = (value: MediaType) => {
		inputManager.mediaType.current = value;
	};

	onMount(() => {
		if (!textareaElement) {
			return;
		}

		textareaElement.addEventListener('input', () => {
			if (!textareaElement) return;

			textareaElement.style.height = 'auto';
			textareaElement.style.height = textareaElement.scrollHeight + 'px';
		});
	});
</script>

<ContainerRoot>
	<ContainerContent>
		<div class="flex h-screen flex-col items-center justify-center gap-20">
			<div class="text-[200px] leading-0 font-medium text-white">*</div>
			<!-- <AsteriskIcon size="100px" class="text-white" /> -->
			<div class="flex w-full flex-col items-center gap-4">
				<div
					class="flex h-fit w-full max-w-150 flex-col gap-4 rounded-3xl border-2 border-neutral-800 bg-neutral-900 px-6 pt-6 pb-4 {focus
						? 'border-neutral-500!'
						: ''}"
				>
					<textarea
						bind:this={textareaElement}
						onfocusin={() => (focus = true)}
						onfocusout={() => (focus = false)}
						class="resize-none overflow-hidden text-white"
						autocomplete="off"
						rows="3"
						placeholder="Paste your media link"
						bind:value={inputManager.inputValue.current}></textarea>
					<div class="flex justify-between">
						<div class="flex gap-1.5">
							<ButtonComponent
								onclick={() => changeMediaType('auto')}
								variant={mediaType == 'auto' ? 'primary' : 'secondary'}
								class="flex h-10! items-center gap-2 px-4! font-normal"
								><SparkleIcon /> Auto</ButtonComponent
							>
							<ButtonComponent
								onclick={() => changeMediaType('audio')}
								variant={mediaType == 'audio' ? 'primary' : 'secondary'}
								class="flex h-10! items-center gap-2 px-4! font-normal"
								><MusicNoteIcon /> Audio Only</ButtonComponent
							>
						</div>
						<div>
							<ButtonComponent class="h-10! w-10! p-0!"><ArrowUpIcon /></ButtonComponent>
						</div>
					</div>
				</div>
				<p class="cursor-default text-sm">
					At first glance, this display looks like AI chat, right?
				</p>
			</div>
		</div>
	</ContainerContent>
</ContainerRoot>
