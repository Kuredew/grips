<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ArrowLeftIcon } from 'phosphor-svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface BackLinkProps extends HTMLAnchorAttributes {
		children?: Snippet;
	}

	let { ...rest }: BackLinkProps = $props();
</script>

<a href={rest.href} {...rest} class="flex w-fit items-center justify-center gap-2 hover:text-white"
	><ArrowLeftIcon /> Back</a
>
