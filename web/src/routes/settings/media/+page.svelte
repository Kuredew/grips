<script>
	import { settings } from '$lib/settings.svelte';
	import Container from '../../../components/container/Container.svelte';
	import PageComponent from '../../../components/page/PageComponent.svelte';
	import SettingItem from '../../../components/settings/SettingItem.svelte';

	const groupSettings = settings.schema.filter((m) => m.group == 'media');
</script>

<Container>
	<PageComponent title="settings/media">
		{#each groupSettings as setting (setting.key)}
			<SettingItem {setting} />
		{/each}
	</PageComponent>
</Container>
