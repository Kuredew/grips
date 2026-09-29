<script>
	let { children } = $props();
</script>

<div class="setting-container">
	{@render children()}
</div>

<style>
	.setting-container {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
</style>
