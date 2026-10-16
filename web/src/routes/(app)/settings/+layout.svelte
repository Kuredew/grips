<script>
	import PageSidebar from '#components/ui/page/PageSidebar.svelte';
	import PageWithSidebar from '#components/ui/page/PageWithSidebar.svelte';
	import SettingsMenu from '#components/modules/settings/SettingsMenu.svelte';
	import PageMainContent from '#components/ui/page/PageMainContent.svelte';

	let { children } = $props();
</script>

<PageWithSidebar path="settings">
	<PageSidebar backButtonHref="/start" title="Settings">
		<SettingsMenu />
	</PageSidebar>

	<PageMainContent>
		{@render children()}
	</PageMainContent>
</PageWithSidebar>
