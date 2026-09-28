<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	interface ModalProps {
		children: Snippet;
		show?: boolean;
		onclose: () => void;
	}
	let { children, show = true, onclose }: ModalProps = $props();
</script>

{#if show}
	<button
		transition:fade={{ duration: 200 }}
		aria-label="close-modal"
		id="modal-background"
		class="backdrop-blur-sm"
		onclick={onclose}
	>
	</button>

	<div id="modal-wrapper">
		<div transition:scale={{ duration: 200 }} id="modal-content">
			{@render children()}
		</div>
	</div>
{/if}

<style>
	#modal-background {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		width: 100dvw;
		height: 100dvh;
		z-index: 10;
	}

	#modal-wrapper {
		padding-inline: 18px;
		width: 100dvw;
		max-width: 30rem;
		display: flex;
		position: fixed;
		z-index: 20;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
	}

	#modal-content {
		flex: 1;
		background-color: var(--color-neutral-900);
		padding: 18px;
		border: solid 2px;
		border-color: var(--color-neutral-800);
		border-radius: 18px;
	}
</style>
