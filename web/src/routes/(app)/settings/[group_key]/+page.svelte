<script>
	import SettingsItemRoot from '#components/modules/settings/SettingsItemRoot.svelte';
	import SettingsItems from '#components/modules/settings/SettingsItems.svelte';

	let { data } = $props();
</script>

<SettingsItemRoot title="settings/{data.group_key}">
	<SettingsItems settings={data.settings} />
</SettingsItemRoot>
