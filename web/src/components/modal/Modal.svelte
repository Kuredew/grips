<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';

	interface ModalProps {
		children: Snippet;
		show?: boolean;
		onclose: () => void;
	}
	let { children, show = true, onclose }: ModalProps = $props();
</script>

{#if show}
	<button aria-label="close-modal" id="modal-background" class="backdrop-blur-sm" onclick={onclose}>
	</button>

	<div transition:scale={{ duration: 200 }} id="modal-content">
		{@render children()}
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

	#modal-content {
		width: 100dvw;
		max-width: 25rem;
		background-color: var(--color-neutral-900);
		padding: 18px;
		border: solid 2px;
		border-color: var(--color-neutral-800);
		border-radius: 18px;
		position: fixed;
		z-index: 20;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
	}
</style>
