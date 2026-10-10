<script lang="ts">
	let { children } = $props();
</script>

<div class="flex h-full w-full items-center justify-center">
	{@render children()}
</div>
