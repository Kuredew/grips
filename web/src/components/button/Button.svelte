<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonVariant = 'primary' | 'secondary';

	interface Props extends HTMLButtonAttributes {
		children: Snippet;
		variant: ButtonVariant;
	}

	let { children, class: klass, variant, ...rest }: Props = $props();
</script>

<button
	class={`text h-fit w-fit cursor-pointer rounded-xl px-4 py-2 font-medium text-black  ${klass} ${variant == 'primary' ? 'bg-white hover:bg-white/80 disabled:bg-neutral-400!' : 'bg-transparent text-white hover:bg-neutral-800'}`}
	{...rest}
>
	{@render children()}
</button>
