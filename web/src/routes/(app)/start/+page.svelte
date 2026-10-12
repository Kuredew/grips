<script lang="ts">
	import ContainerContent from '#components/ui/container/ContainerContent.svelte';
	import ContainerRoot from '#components/ui/container/ContainerRoot.svelte';
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import { inputManager } from '#lib/input.svelte.ts';
	import type { MediaType } from '#lib/types.ts';
	import { ArrowUpIcon, MusicNoteIcon, SparkleIcon } from 'phosphor-svelte';
	import { onMount } from 'svelte';
	import Spinner from '#components/ui/icon/Spinner.svelte';
	import { queueManager } from '#lib/queue.svelte.ts';
	import { getMediaInfo } from '#lib/api/getMediaInfo.ts';
	import type { MediaInfo } from '#lib/types/api.ts';
	import { isValidUrl } from '#lib/util/url.ts';
	import DialogError from '#components/ui/dialog/DialogError.svelte';
	import { checkHealth } from '#lib/api/checkHealth.ts';

	let focus = $state(false);
	let mediaType = $derived(inputManager.mediaType.current);
	let isLoading = $derived(inputManager.loading);

	let isInvalid = $state(false);
	let errorDetail = $state<string | null>(null);
	let openErrorDialog = $state(false);

	let isDown = $derived(inputManager.isDown);
	let openDownErrorDialog = $state(false);
	let isDownDialogOpened = $derived(inputManager.isDownDialogOpened);

	let textareaElement: HTMLTextAreaElement | null = $state(null);

	let changeMediaType = (value: MediaType) => {
		inputManager.mediaType.current = value;
	};

	async function submit() {
		isInvalid = false;

		const inputValue = inputManager.inputValue.current;
		if (!isValidUrl(inputValue)) {
			isInvalid = true;
			return;
		}
		inputManager.loading = true;

		let mediaInfo: MediaInfo;

		try {
			mediaInfo = await getMediaInfo(inputValue);
		} catch (e) {
			console.error(`failed to get media information: ${e}`);
			errorDetail = String(e);
			openErrorDialog = true;
			return;
		} finally {
			inputManager.loading = false;
		}

		const job = queueManager.createQueueJob(mediaInfo, inputValue, mediaType);
		job.start();

		inputManager.inputValue.current = '';
		inputManager.loading = false;
		if (!inputManager.queueListOpened) {
			inputManager.queueListOpened = true;
		}
	}

	$effect(() => {
		if (inputManager.inputValue.current != null) isInvalid = false;
	});

	$effect(() => {
		if (isDown && !isDownDialogOpened) {
			openDownErrorDialog = true;
			inputManager.isDownDialogOpened = true;
		}
	});

	$effect(() => {
		if (isDown || inputManager.isServerChecked) return;
		inputManager.loading = true;

		(async () => {
			inputManager.isDown = !(await checkHealth());
			inputManager.isServerChecked = true;
			inputManager.loading = false;
		})();
	});

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

<DialogError
	bind:open={openErrorDialog}
	description="An error occurred, the server could not get information from the link you provided, the link may not be supported by yt-dlp."
	{errorDetail}
/>

<DialogError
	bind:open={openDownErrorDialog}
	description="We are currently unable to connect to the server, it is most likely down, please wait a moment or monitor the status from the home page."
/>

<ContainerRoot>
	<ContainerContent>
		<div class="flex h-full flex-col items-center justify-center gap-20">
			<div class="py-8 text-[200px] leading-0 font-medium text-white">{isInvalid ? '?' : '*'}</div>

			<div class="flex w-full max-w-150 flex-col items-center gap-4">
				<div
					class="flex h-fit w-full max-w-full flex-col gap-4 rounded-3xl border-2 border-neutral-800 bg-neutral-900 px-6 pt-6 pb-4 {isInvalid
						? 'border-red-900'
						: ''} {isLoading || isDown ? 'pointer-events-none opacity-50' : ''} {focus
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
								class="flex h-10! items-center gap-2 px-4! font-normal {mediaType == 'auto'
									? 'cursor-default!'
									: ''}"><SparkleIcon /> Auto</ButtonComponent
							>
							<ButtonComponent
								onclick={() => changeMediaType('audio')}
								variant={mediaType == 'audio' ? 'primary' : 'secondary'}
								class="flex h-10! items-center gap-2 px-4! font-normal {mediaType == 'audio'
									? 'cursor-default!'
									: ''}"><MusicNoteIcon /> Audio Only</ButtonComponent
							>
						</div>
						<div>
							<ButtonComponent
								onclick={submit}
								variant={isLoading ? 'secondary' : 'primary'}
								class="h-10! w-10! p-0!"
							>
								{#if isLoading}
									<Spinner />
								{:else}
									<ArrowUpIcon />
								{/if}
							</ButtonComponent>
						</div>
					</div>
				</div>
				{#if isDown}
					<p class="cursor-default text-center text-sm text-balance">
						We are currently unable to connect to the server, it is most likely down, please wait a
						moment or monitor the status from the home page.
					</p>
				{:else if isInvalid}
					<p class="cursor-default text-center text-sm text-balance">
						What you entered is not even a valid link!
					</p>
				{:else}
					<p class="cursor-default text-sm">At first glance, this looks like an AI chatbot heh?</p>
				{/if}
			</div>
		</div>
	</ContainerContent>
</ContainerRoot>
