<script lang="ts">
	import { getVideoInfo } from '$lib/api/getVideoInfo';
	import { downloadMedia } from '$lib/core/downloadMedia';
	import type { VideoInfo } from '$lib/types/types';
	import Button from '../components/button/Button.svelte';
	import Container from '../components/container/Container.svelte';
	import { onMount } from 'svelte';

	let inputFocus = $state(false);
	let mediaType: 'video' | 'audio' = $state('video');
	let url = $state('');
	let running = $state(false);
	let done = $state(false);

	let error = $state(false);
	let input: null | HTMLInputElement = $state(null);
	let logDiv: null | HTMLDivElement = $state(null);
	let logs = $state('');
	let file_url = $state('');

	let videoInfo: null | VideoInfo = $state(null);

	async function startJob() {
		try {
			if (input) {
				input.value = '';
			}

			// Prepare
			running = true;
			error = false;

			addLog('info', 'Job started.');

			addLog('info', 'Getting video info from url: ' + url);
			videoInfo = await getVideoInfo(url);
			addLog('info', 'Success, downloading media...');

			file_url = await downloadMedia(url, mediaType, (msg) => {
				addLog('info', msg);
			});

			addLog('info', 'Success! Please click the download button above to download the media.');
		} catch (e) {
			addLog('error', 'job: ' + e);
			addLog(
				'error',
				'An error occurred, please make sure the URL is correct and please try again or wait a while if the failure continues to occur.'
			);
			error = true;
		} finally {
			running = false;
			done = true;
		}
	}

	$effect(() => {
		if (logs) {
			if (logDiv) {
				console.log('ScrolledDown');
				logDiv.scrollTop = logDiv.scrollHeight;
			}
		}
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
	};

	onMount(() => {
		if (!input) return;
		input.addEventListener('keypress', (event) => {
			if (event.key == 'Enter') {
				event.preventDefault();
				startJob();
			}
		});
	});

	// const avalaibleQuality = ['best', 'worst', '1080p', '720p', '480p', '360p'];
	// let quality = $state('best');
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
					{#if running || done}
						<div class="flex h-[40dvh] flex-col gap-2">
							{#if videoInfo}
								<div class="flex w-full gap-2">
									<div class="h-30 w-30 shrink-0 overflow-hidden rounded-xl bg-neutral-500">
										<img src={videoInfo.thumbnail} alt="" class="h-full w-full object-cover" />
									</div>
									<div class="flex h-full w-full flex-col justify-between gap-2 overflow-hidden">
										<!-- title -->
										<div class="flex w-full flex-col gap-2">
											<p class="overflow-hidden text-nowrap">
												{videoInfo.title || ''}
											</p>

											<!-- uploader -->
											{#if videoInfo}
												<p class="text-sm text-neutral-400">
													{videoInfo.uploader} | {videoInfo.view_count} views
												</p>
											{/if}
										</div>

										<!-- eslint-disable-next-line -->
										<a class="w-fit" href={file_url}
											><Button variant="primary" disabled={file_url == ''}>download</Button></a
										>
									</div>
								</div>
							{/if}

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
						class={`flex w-full items-center justify-center gap-2 rounded-xl border-2 p-4 transition-all outline-none ${error ? 'border-red-900' : 'border-neutral-800 '} ${inputFocus ? 'border-neutral-400!' : ''}`}
					>
						<p>></p>
						<input
							bind:value={url}
							bind:this={input}
							type="text"
							class="flex-1 outline-none"
							placeholder="paste your media url here and press Enter."
							onfocusin={() => (inputFocus = true)}
							onfocusout={() => (inputFocus = false)}
							disabled={running}
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

						<Button onclick={startJob} class="justify-end" disabled={running} variant="primary"
							>[enter]</Button
						>
					</div>

					<!-- {#if mediaType == 'disable'}
						<div class="flex w-full gap-2">
							{#each avalaibleQuality as qlty (qlty)}
								<Button
									onclick={() => (quality = qlty)}
									variant={qlty == quality ? 'primary' : 'secondary'}>{qlty}</Button
								>
							{/each}
						</div>
					{/if} -->
				</div>
			</div>
		</div>
	</Container>
</div>
