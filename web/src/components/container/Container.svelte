<script lang="ts">
	let { children } = $props();
</script>

<div class="flex h-full w-full items-center justify-center px-5">
	<div class="container w-full">
		{@render children()}
	</div>
</div>
