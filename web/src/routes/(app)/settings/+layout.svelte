<script>
	import PageSidebar from '#components/ui/page/PageSidebar.svelte';
	import PageWithSidebar from '#components/ui/page/PageWithSidebar.svelte';
	import SettingsMenu from '#components/modules/settings/SettingsMenu.svelte';
	import { pageTitle } from '#lib/pageTitle.ts';

	let title = pageTitle('settings');
	let { children } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<PageWithSidebar path="settings">
	<PageSidebar backButtonHref="/start" title="Settings">
		<SettingsMenu />
	</PageSidebar>

	{@render children()}
</PageWithSidebar>
