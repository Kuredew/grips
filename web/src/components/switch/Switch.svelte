<script lang="ts">
	let { active }: { active: boolean } = $props();
</script>

<div class="switch-container">
	<div style="--translate-x: {active ? '20px' : '0px'}" class="switch-circle"></div>
</div>

<style>
	.switch-container {
		width: 50px;
		height: 25px;
		background-color: var(--color-neutral-700);
		padding-inline: 5px;
		border-radius: 100px;
		display: flex;
		align-items: center;
	}

	.switch-circle {
		height: 20px;
		width: 20px;
		background-color: white;
		border-radius: 100px;
		transform: translateX(var(--translate-x));
		transition: 0.1s all ease;
	}
</style>
