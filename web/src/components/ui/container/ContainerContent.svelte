<script lang="ts">
	let { children } = $props();
</script>

<div class="container flex h-full w-full flex-col px-4 md:max-w-7xl">
	{@render children()}
</div>
