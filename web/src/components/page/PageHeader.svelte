<script lang="ts">
	let { title }: { title: string } = $props();
</script>

<div id="page-header">
	<p>grips-v2.0.0</p>
	<h1 id="page-title">{title}</h1>
</div>

<style>
	#page-header {
		cursor: default;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#page-title {
		font-size: 18px;
		font-weight: 600;
	}
</style>
