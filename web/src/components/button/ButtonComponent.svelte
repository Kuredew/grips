<script lang="ts">
	import { Button } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface ButtonProps extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'link';
		children: Snippet;
	}

	let { children, variant = 'primary', class: klass, ...rest }: ButtonProps = $props();
</script>

{#snippet button(variantClass: string = '')}
	<Button.Root
		class="rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 inline-flex
        h-12 cursor-pointer items-center justify-center
        rounded-lg px-5.25 text-[15px] font-medium active:scale-[0.98] active:transition-all {klass} {variantClass}"
		{...rest}
	>
		{@render children()}
	</Button.Root>
{/snippet}

{#if variant == 'primary'}
	{@render button('bg-white hover:bg-neutral-200 text-black')}
{:else if variant == 'secondary'}
	{@render button('bg-neutral-900 border-2 border-neutral-800 hover:bg-neutral-800 text-white')}
{:else if variant == 'link'}
	{@render button('underline text-white font-medium')}
{/if}

<!-- <Button.Root -->
<!-- 	class="rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 inline-flex -->
<!-- 	h-12 cursor-pointer items-center justify-center -->
<!-- 	rounded-lg bg-white px-5.25 text-[15px] font-medium text-black hover:bg-neutral-200 active:scale-[0.98] active:transition-all {klass} {variant == -->
<!-- 	'secondary' -->
<!-- 		? 'border-2 border-neutral-800! bg-neutral-900! text-white! hover:bg-neutral-800!' -->
<!-- 		: ''}" -->
<!-- 	{...rest} -->
<!-- > -->
<!-- 	{@render children()} -->
<!-- </Button.Root> -->
