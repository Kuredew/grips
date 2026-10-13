<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let { data } = $props();

	onMount(() => {
		goto('/changelogs/' + data.latestVersion);
	});
</script>
