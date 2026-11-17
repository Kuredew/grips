<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		children
	}: {
		href: string;
		children: Snippet;
	} = $props();
</script>

<a {href} class="text-white underline">{@render children()}</a>
