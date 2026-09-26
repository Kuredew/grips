<script>
	let { children } = $props();
</script>

<div id="radio-wrapper" class="scrollbar-none">
	{@render children()}
</div>

<style>
	#radio-wrapper {
		display: flex;
		align-items: center;
		border-radius: 14px;
		background-color: var(--color-neutral-900);
		padding: 4px;
		overflow-x: auto;
	}
</style>
