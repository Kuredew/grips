<script lang="ts">
	let { children } = $props();
</script>

<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-500/40">
	{@render children()}
</div>
