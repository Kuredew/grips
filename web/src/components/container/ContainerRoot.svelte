<script lang="ts">
	let { children } = $props();
</script>

<div class="flex items-center justify-center">
	{@render children()}
</div>
