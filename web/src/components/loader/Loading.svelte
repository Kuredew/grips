<script lang="ts">
	let { size = '0.25px' }: { size?: string } = $props();
</script>

<span class="loader" style="--size: {size}"></span>

<style>
	.loader {
		--color-1: #fff;
		width: calc(48 * var(--size));
		height: calc(48 * var(--size));
		border: calc(5 * var(--size)) solid var(--color-1);
		border-bottom-color: transparent;
		border-radius: 50%;
		display: inline-block;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
