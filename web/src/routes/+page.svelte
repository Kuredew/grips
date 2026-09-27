<script lang="ts">
	import type { MediaType } from '$lib/types/types';
	import Button from '../components/button/Button.svelte';
	import Container from '../components/container/Container.svelte';
	import { onMount } from 'svelte';
	import { queueManager } from '$lib/queue.svelte';
	import AudioIcon from '../components/logo/AudioIcon.svelte';
	import QueueIcon from '../components/logo/QueueIcon.svelte';
	import PageComponent from '../components/page/PageComponent.svelte';
	import SparkleIcon from '../components/logo/SparkleIcon.svelte';
	import RadioWrapper from '../components/radio/RadioWrapper.svelte';
	import RadioButton from '../components/radio/RadioButton.svelte';
	import Loading from '../components/loader/Loading.svelte';
	import { getVideoInfo } from '$lib/api/getVideoInfo';
	import Modal from '../components/modal/Modal.svelte';
	import CopyIcon from '../components/logo/CopyIcon.svelte';
	import CircleAlert from '../components/logo/CircleAlert.svelte';
	import LinkIcon from '../components/logo/LinkIcon.svelte';

	let inputFocus = $state(false);
	let mediaType: MediaType = $state('auto');
	let url = $state('');
	let loading = $state(false);
	let error = $state('');

	let input: null | HTMLInputElement = $state(null);

	const sendToQueue = async () => {
		if (!input) return;
		loading = true;

		try {
			const videoInfo = await getVideoInfo(input.value);
			queueManager.startQueue(videoInfo.title, input.value, mediaType);
		} catch (e) {
			console.error(e);
			error = String(e);
		} finally {
			input.value = '';
			loading = false;
		}
	};

	const copyError = () => {
		navigator.clipboard.writeText(error);
	};

	const clearError = () => {
		error = '';
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

<Modal show={error !== ''} onclose={clearError}>
	<div class="modal-content">
		<CircleAlert />
		<p class="text-modal">
			is the link correct? we encountered an error when trying to open it. please try again.
		</p>
		<div class="button-wrapper-modal">
			<Button class="button-modal" onclick={copyError} variant="secondary"
				><CopyIcon /> copy full error</Button
			>
			<Button class="button-modal" onclick={clearError} variant="primary">okay</Button>
		</div>
	</div>
</Modal>

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
					<LinkIcon />
					<input
						bind:value={url}
						bind:this={input}
						type="text"
						id="input"
						placeholder="paste your media url here and press enter."
						onfocusin={() => (inputFocus = true)}
						onfocusout={() => (inputFocus = false)}
						disabled={loading}
					/>
				</div>
				<!-- type and quality selection -->
				<div id="button-wrapper">
					<RadioWrapper>
						<RadioButton
							onclick={() => (mediaType = 'auto')}
							active={mediaType == 'auto'}
							class="button-home"
						>
							<SparkleIcon />
							auto
						</RadioButton>
						<RadioButton
							onclick={() => (mediaType = 'audio')}
							active={mediaType == 'audio'}
							class="button-home"
						>
							<AudioIcon />
							audio only
						</RadioButton>
					</RadioWrapper>
					<Button onclick={sendToQueue} class="button-home" disabled={loading} variant="primary">
						{#if loading}
							<Loading color="#000" />
							loading...
						{:else}
							<QueueIcon />
							add queue
						{/if}
					</Button>
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
	.modal-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
	}

	.text-modal {
		color: var(--color-neutral-500);
		font-size: 16px;
		font-weight: 500;
		text-align: center;
	}

	.button-wrapper-modal {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 8px;
	}

	:global(.button-modal) {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 14px;
	}

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
