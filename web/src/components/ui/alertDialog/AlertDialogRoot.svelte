<script lang="ts">
	import { AlertDialog } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props extends AlertDialog.RootProps {
		children: Snippet;
	}

	let { open = $bindable(false), children, ...rest }: Props = $props();
</script>

<AlertDialog.Root bind:open {...rest}>{@render children()}</AlertDialog.Root>
