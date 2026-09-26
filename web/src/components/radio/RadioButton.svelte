<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Button from '../button/Button.svelte';
	import type { Snippet } from 'svelte';

	interface RadioButtonProps extends HTMLButtonAttributes {
		active: boolean;
		children: Snippet;
	}

	let { children, active, ...restProps }: RadioButtonProps = $props();
</script>

<Button class="radio-button" variant={active ? 'primary' : 'secondary'} {...restProps}>
	{@render children()}
</Button>

<style>
	:global(.radio-button) {
		width: 100%;
	}
</style>
