<script lang="ts">
	import type { MediaType } from '$lib/types/types';
	import Button from '../components/button/Button.svelte';
	import Container from '../components/container/Container.svelte';
	import { onMount } from 'svelte';
	import Queue from '../components/queue/Queue.svelte';
	import { queueManager } from '$lib/queue.svelte';

	let inputFocus = $state(false);
	let mediaType: MediaType = $state('video');
	let url = $state('');
	let running = $state(false);

	let error = $state(false);
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

<Queue />

<div class="h-dvh w-full">
	<Container>
		<div class="flex w-full flex-col items-center justify-center">
			<div class="flex w-200 max-w-full flex-col items-center justify-center gap-10">
				<div class="flex w-full flex-col items-center justify-center">
					<h1 class="text-4xl font-medium">Own your favorite media without worry.</h1>
				</div>

				<div class="flex w-full flex-col gap-2">
					<div
						class={`flex w-full items-center justify-center gap-2 rounded-3xl border-2 p-4 transition-all outline-none ${error ? 'border-red-900' : 'border-neutral-800 '} ${inputFocus ? 'border-neutral-400!' : ''}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-sparkles preview-icon"
							><path
								d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
							/><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></svg
						>
						<input
							bind:value={url}
							bind:this={input}
							type="text"
							class="flex-1 outline-none"
							placeholder="Paste your media url here and press Enter."
							onfocusin={() => (inputFocus = true)}
							onfocusout={() => (inputFocus = false)}
							disabled={running}
						/>
					</div>
					<!-- type and quality selection -->
					<div class="flex w-full justify-between gap-4">
						<div class="flex items-center rounded-full bg-white/10 px-1 py-1">
							<Button
								onclick={() => (mediaType = 'video')}
								variant={mediaType == 'video' ? 'primary' : 'secondary'}>Video</Button
							>
							<Button
								onclick={() => (mediaType = 'audio')}
								variant={mediaType == 'audio' ? 'primary' : 'secondary'}>Audio</Button
							>
						</div>
						<Button onclick={sendToQueue} class="justify-end" disabled={running} variant="primary"
							>Download</Button
						>
					</div>
				</div>
			</div>
		</div>
	</Container>
</div>
