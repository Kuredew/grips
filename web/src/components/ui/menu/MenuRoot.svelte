<script lang="ts">
	let { children } = $props();
</script>

<div class="flex w-full flex-col gap-4 text-sm font-medium">
	{@render children()}
</div>
