<script lang="ts">
	import type { MediaType } from '$lib/types/types';
	import Button from '../components/button/Button.svelte';
	import Container from '../components/container/Container.svelte';
	import { onMount } from 'svelte';
	import { queueManager } from '$lib/queue.svelte';
	import VideoIcon from '../components/logo/VideoIcon.svelte';
	import AudioIcon from '../components/logo/AudioIcon.svelte';
	import QueueIcon from '../components/logo/QueueIcon.svelte';
	import PageComponent from '../components/page/PageComponent.svelte';
	import SparkleIcon from '../components/logo/SparkleIcon.svelte';
	import RadioWrapper from '../components/radio/RadioWrapper.svelte';
	import RadioButton from '../components/radio/RadioButton.svelte';

	let inputFocus = $state(false);
	let mediaType: MediaType = $state('video');
	let url = $state('');
	let running = $state(false);

	let input: null | HTMLInputElement = $state(null);

	const sendToQueue = () => {
		if (!input) return;
		queueManager.startQueue(input.value, mediaType);
		input.value = '';
	};

	onMount(() => {
		if (!input) return;
		input.addEventListener('keypress', (event) => {
			if (event.key == 'Enter') {
				event.preventDefault();
				sendToQueue();
			}
		});
	});
</script>

<Container>
	<PageComponent title="home">
		<div id="home-wrapper">
			<div id="home-title">
				<h1 id="home-title-content">own your favorite media.</h1>
			</div>

			<div id="form-wrapper" class="flex w-full flex-col gap-2">
				<div
					id="input-wrapper"
					style="--border-color: {inputFocus
						? 'var(--color-neutral-400)'
						: 'var(--color-neutral-800)'}"
				>
					<SparkleIcon />
					<input
						bind:value={url}
						bind:this={input}
						type="text"
						id="input"
						placeholder="paste your media url here and press enter."
						onfocusin={() => (inputFocus = true)}
						onfocusout={() => (inputFocus = false)}
						disabled={running}
					/>
				</div>
				<!-- type and quality selection -->
				<div id="button-wrapper">
					<RadioWrapper>
						<RadioButton
							onclick={() => (mediaType = 'video')}
							active={mediaType == 'video'}
							class="button-home"
						>
							<VideoIcon />
							video
						</RadioButton>
						<RadioButton
							onclick={() => (mediaType = 'audio')}
							active={mediaType == 'audio'}
							class="button-home"
						>
							<AudioIcon />
							audio
						</RadioButton>
					</RadioWrapper>
					<Button onclick={sendToQueue} class="button-home" disabled={running} variant="primary">
						<QueueIcon />
						add queue</Button
					>
				</div>
			</div>
			<div id="note-wrapper">
				<p id="note-content">
					inspired by <a href="https://cobalt.tools"><span id="note-link">cobalt.tools</span></a>,
					but this one uses the yt-dlp tool
				</p>
			</div>
		</div>
	</PageComponent>
</Container>

<style>
	#home-wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100%;
		align-items: center;
		justify-content: center;
		gap: 40px;
	}

	#home-title {
		display: flex;
		width: 100%;
		justify-content: center;
	}

	#home-title-content {
		font-weight: 500;
		cursor: default;
	}

	#input-wrapper {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		gap: 14px;
		border-radius: 20px;
		border: solid 2px;
		border-color: var(--border-color);
		padding: 20px;
		outline: none;
	}

	#input {
		flex: 1;
		font-size: 16px;
		outline: none;
	}

	#button-wrapper {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: space-between;
		gap: 4px;
	}

	:global(.button-home) {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	#note-wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
	}

	#note-content {
		cursor: default;
		font-size: 14px;
		color: var(--color-neutral-400);
	}

	#note-link {
		font-weight: 500;
		text-decoration: underline;
	}
</style>
