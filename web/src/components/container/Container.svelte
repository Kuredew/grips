<script lang="ts">
	let { children } = $props();
</script>

<div id="container-wrapper">
	<div id="container" class="container">
		{@render children()}
	</div>
</div>

<style>
	#container-wrapper {
		display: flex;
		width: 100%;
		height: 100dvh;
		align-items: center;
		justify-content: center;
		padding-inline: 20px;
	}

	#container {
		height: 100%;
		padding-block: 18px;
		max-width: 800px;
	}
</style>
