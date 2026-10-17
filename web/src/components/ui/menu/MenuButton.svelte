<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends HTMLAnchorAttributes {
		path: string;
		active: boolean;
		children: Snippet;
	}

	let { path, active, children, ...rest }: Props = $props();
</script>

<a href={path} {...rest} class="flex w-full">
	<button
		class="flex w-full cursor-pointer items-center gap-2 rounded-xl p-1.5 transition-all
    {active ? 'cursor-default! bg-white text-black' : 'hover:bg-neutral-800'}"
	>
		{@render children()}
	</button>
</a>
