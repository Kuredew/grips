<script>
	import Container from '../../../components/container/Container.svelte';
	import PageComponent from '../../../components/page/PageComponent.svelte';
	import SettingContainer from '../../../components/settings/SettingContainer.svelte';
	import SettingItem from '../../../components/settings/SettingItem.svelte';

	let { data } = $props();
</script>

<Container>
	<PageComponent title="settings/{data.group}">
		<SettingContainer>
			{#each data.groupSettings as setting (setting.key)}
				<SettingItem {setting} />
			{/each}
		</SettingContainer>
	</PageComponent>
</Container>
