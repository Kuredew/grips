<script lang="ts">
	import { getVideoInfo } from '$lib/api/getVideoInfo';
	import { downloadMedia } from '$lib/core/downloadMedia';
	import type { VideoInfo } from '$lib/types/types';
	import Button from '../components/button/Button.svelte';
	import Container from '../components/container/Container.svelte';

	let inputFocus = $state(false);
	let mediaType = $state('video');
	let url = $state('');
	let disabled = $state(false);
	let input: null | HTMLInputElement = $state(null);
	let logDiv: null | HTMLDivElement = $state(null);
	let logs = $state('');
	let file_url = $state('');

	let videoInfo: null | VideoInfo = $state(null);
	let isGettingVideoInfo = $state(false);

	function downloadFromUrl(fileUrl: string, fileName?: string) {
		const link = document.createElement('a');

		link.href = fileUrl;
		link.download = fileName || 'download';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	$effect(() => {
		if (url == '' || isGettingVideoInfo) return;
		disabled = true;

		const getInfo = async () => {
			try {
				addLog('info', 'Getting video info from url: ' + url);
				isGettingVideoInfo = true;

				videoInfo = await getVideoInfo(url);

				addLog('info', 'Success, downloading media...');

				file_url = await downloadMedia(url, (msg) => {
					addLog('info', msg);
				});

				addLog('info', 'Success!');
			} catch (e) {
				addLog('error', 'getInfo: ' + e);

				disabled = false;
				return null;
			}
		};
		getInfo();
	});

	const addLog = (level: 'info' | 'error' | 'debug', msg: string) => {
		switch (level) {
			case 'info':
				logs += `[ INFO ] ${msg}\n`;
				break;
			case 'error':
				logs += `[ ERRO ] ${msg}\n`;
				break;
			case 'debug':
				logs += `[ DEBG ] ${msg}\n`;
				break;
		}

		if (logDiv) {
			logDiv.scrollTop = logDiv.scrollHeight;
		}
	};

	const avalaibleQuality = ['best', 'worst', '1080p', '720p', '480p', '360p'];
	let quality = $state('best');
</script>

<div class="h-dvh w-full">
	<Container>
		<div class="flex w-full flex-col items-center justify-center">
			<div class="flex w-200 max-w-full flex-col items-center justify-center gap-10">
				<div class="flex w-full flex-col items-center justify-center">
					<h1 class="text-3xl">GRIPS/v2</h1>
					<h2 class="text-neutral-400">grip, save, and own your media.</h2>
				</div>

				<div class="flex w-full flex-col gap-2">
					<!-- log -->
					{#if url !== ''}
						<div class="flex h-[40dvh] flex-col gap-2">
							<div class="flex w-full gap-2">
								<div class="h-30 w-30 shrink-0 overflow-hidden rounded-xl bg-neutral-500">
									{#if videoInfo}
										<img src={videoInfo?.thumbnail} alt="" class="h-full w-full object-cover" />
									{/if}
								</div>
								<div class="flex h-full w-full flex-col justify-between gap-2 overflow-hidden">
									<!-- title -->
									<div class="flex w-full flex-col gap-2">
										<p class="overflow-hidden text-nowrap">
											{videoInfo?.title || ''}
										</p>

										<!-- uploader -->
										{#if videoInfo}
											<p class="text-sm text-neutral-400">
												{videoInfo?.uploader} | {videoInfo?.view_count} views
											</p>
										{/if}
									</div>

									<a class="w-fit" href={file_url}
										><Button variant="primary" disabled={file_url == ''}>download</Button></a
									>
								</div>
							</div>

							<!-- log -->
							<div class="flex min-h-0 flex-1 rounded-xl bg-neutral-900 px-6 py-4">
								<div
									bind:this={logDiv}
									class="h-full flex-1 scrollbar-none overflow-y-auto whitespace-pre-line text-neutral-400"
								>
									<p>{logs}</p>
								</div>
							</div>
						</div>
					{/if}

					<div
						class={`flex w-full items-center justify-center gap-2 rounded-xl border-2 border-neutral-800 p-4 transition-all outline-none ${inputFocus ? '!border-neutral-400' : ''}`}
					>
						<p>></p>
						<input
							bind:this={input}
							type="text"
							class="flex-1 outline-none"
							placeholder="paste your media url here and press Enter."
							onfocusin={() => (inputFocus = true)}
							onfocusout={() => (inputFocus = false)}
							{disabled}
						/>
					</div>

					<!-- type and quality selection -->
					<div class="flex w-full justify-between gap-4">
						<div class="flex items-center rounded-lg bg-white/10 px-1 py-1">
							<Button
								onclick={() => (mediaType = 'video')}
								variant={mediaType == 'video' ? 'primary' : 'secondary'}>video</Button
							>
							<Button
								onclick={() => (mediaType = 'audio')}
								variant={mediaType == 'audio' ? 'primary' : 'secondary'}>audio</Button
							>
						</div>

						<Button
							onclick={() => {
								if (input) {
									url = input.value;
									addLog('info', 'Job started');
									input.value = '';
								}
							}}
							class="justify-end"
							{disabled}
							variant="primary">[enter]</Button
						>
					</div>

					{#if mediaType == 'disable'}
						<div class="flex w-full gap-2">
							{#each avalaibleQuality as qlty}
								<Button
									onclick={() => (quality = qlty)}
									variant={qlty == quality ? 'primary' : 'secondary'}>{qlty}</Button
								>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</Container>
</div>
