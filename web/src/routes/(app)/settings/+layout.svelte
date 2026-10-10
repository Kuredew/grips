<script>
	import PageSidebar from '#components/layouts/page/PageSidebar.svelte';
	import PageWithSidebar from '#components/ui/page/PageWithSidebar.svelte';
	import SettingsMenu from '#components/modules/settings/SettingsMenu.svelte';

	let { children } = $props();
</script>

<PageWithSidebar path="settings">
	<PageSidebar title="Settings">
		<SettingsMenu />
	</PageSidebar>

	{@render children()}
</PageWithSidebar>
