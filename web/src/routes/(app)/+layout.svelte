<script lang="ts">
	import AppBar from '#components/bar/AppBar.svelte';

    let { children } = $props()
</script>

<svelte:head>
    <title>App | GRIPS</title>
</svelte:head>

<AppBar />

{@render children()}
