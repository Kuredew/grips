<script>
	import SettingsMenu from '#components/settings/SettingsMenu.svelte';

	let { children } = $props();
</script>

<div class="h-screen w-full">
	<div class="h-full max-w-70 px-4">
		<SettingsMenu />
	</div>
	{@render children()}
</div>
