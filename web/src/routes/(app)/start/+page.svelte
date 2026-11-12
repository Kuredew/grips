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
	import type { InfoResult, MediaInfo } from '#lib/types/api.ts';
	import { isValidUrl } from '#lib/util/url.ts';
	import DialogError from '#components/ui/dialog/DialogError.svelte';
	import { checkHealth } from '#lib/api/checkHealth.ts';
	import { isVideo } from '#lib/util/mediaInfo.ts';
	import MediaChooser from '#components/modules/dialog/MediaChooser.svelte';
	import WhatsNew from '#components/modules/dialog/WhatsNew.svelte';

	let focus = $state(false);
	let mediaType = $derived(inputManager.mediaType.current);
	let isLoading = $derived(inputManager.loading);

	let isInvalid = $state(false);
	let log = $state<string | null>(null);
	let openErrorDialog = $state(false);

	let isDown = $derived(inputManager.isDown);
	let openDownErrorDialog = $state(false);
	let isDownDialogOpened = $derived(inputManager.isDownDialogOpened);

	let mediaChooser = $state<{
		openDialog: boolean;
		mediaList: MediaInfo[];
	}>({
		openDialog: false,
		mediaList: []
	});

	let openWhatsNewDialog = $state(false);

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

		let info: InfoResult;

		try {
			info = await getMediaInfo(inputValue);
		} catch (e) {
			console.error(`failed to get media information: ${e}`);
			log = String(e);
			openErrorDialog = true;
			return;
		} finally {
			inputManager.loading = false;
		}

		if (!info.is_playlist) {
			const mediaInfo = info.video_info;
			const isVideoMedia = isVideo(mediaInfo);

			const job = queueManager.createQueueJob(
				mediaInfo,
				inputValue,
				[],
				isVideoMedia && mediaType == 'auto' ? 'video' : 'audio'
			);
			job.start();

			inputManager.queueListOpened = true;
			inputManager.inputValue.current = '';
		} else if (info.is_playlist) {
			mediaChooser = {
				openDialog: true,
				mediaList: info.playlist_info.entries
			};
		}

		inputManager.loading = false;
	}

	async function startDownloadPlaylist(selectedMediaIndex: number[]) {
		const inputValue = inputManager.inputValue.current;

		for (const index of selectedMediaIndex) {
			const mediaInfo = mediaChooser.mediaList[index];
			const isVideoMedia = isVideo(mediaInfo);

			const job = queueManager.createQueueJob(
				mediaInfo,
				inputValue,
				[index + 1],
				isVideoMedia && mediaType == 'auto' ? 'video' : 'audio'
			);
			job.start();
		}

		inputManager.queueListOpened = true;
		inputManager.inputValue.current = '';
		mediaChooser = {
			openDialog: false,
			mediaList: []
		};
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

	$effect(() => {
		const isShowed = localStorage.getItem(version);
		if (!isShowed) openWhatsNewDialog = true;
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

	let { data } = $props();
	let version = $derived(`v${data.latestChangelog.version}-${data.latestCommitHash}`);
</script>

<DialogError
	bind:open={openErrorDialog}
	title="Check your link"
	description="Make sure the link you enter is supported by yt-dlp, open an issue if you feel this is a mistake."
	{log}
/>

<DialogError
	bind:open={openDownErrorDialog}
	title="Server offline"
	description="There was a problem connecting to the server, please wait a moment and then reload this page."
/>

<WhatsNew
	bind:open={openWhatsNewDialog}
	{version}
	changelogHtml={data.latestChangelog.changelog.whats_new}
	callback={() => {
		localStorage.setItem(version, 'true');
	}}
/>

<MediaChooser
	bind:open={mediaChooser.openDialog}
	mediaList={mediaChooser.mediaList}
	callback={(mediaList) => startDownloadPlaylist(mediaList)}
/>

<ContainerRoot>
	<ContainerContent>
		<div class="flex h-full flex-col items-center justify-center gap-20">
			<div class="flex flex-col gap-4">
				<div class="text-lg leading-0 font-medium text-white">{version}</div>
				<button onclick={() => (openWhatsNewDialog = true)}
					><p class="cursor-pointer text-sm hover:text-white hover:underline">
						What's new?
					</p></button
				>
			</div>

			<div class="flex w-full max-w-150 flex-col items-center gap-4">
				<div
					class="flex h-fit w-full max-w-full flex-col gap-4 rounded-3xl border-2 border-neutral-800 bg-neutral-900 px-6 pt-6 pb-4 transition-all {isInvalid
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
						placeholder="Paste the link here"
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
					<p class="cursor-default text-center text-sm text-balance">Service is offline</p>
				{:else if isInvalid}
					<p class="cursor-default text-center text-sm text-balance">Invalid link!</p>
				{:else}
					<p class="cursor-default text-sm">Paste the link and start download!</p>
				{/if}
			</div>
		</div>
	</ContainerContent>
</ContainerRoot>
