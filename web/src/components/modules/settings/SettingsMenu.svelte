<script lang="ts">
	import { page } from '$app/state';
	import { FileAudioIcon, SunIcon, VideoIcon } from 'phosphor-svelte';
	import SettingsMenuButton from '#components/modules/settings/SettingsMenuButton.svelte';
	import SettingsMenuIcon from '#components/modules/settings/SettingsMenuIcon.svelte';
	import SettingsMenuGroup from './SettingsMenuGroup.svelte';

	let openedGroup = $derived(
		page.url.pathname.includes('/settings') ? page.url.pathname.split('/').pop() : ''
	);
</script>

<SettingsMenuGroup>
	<SettingsMenuButton path="/settings/appearance" active={openedGroup == 'appearance'}>
		<SettingsMenuIcon>
			<SunIcon size="20px" />
		</SettingsMenuIcon>
		<p>Appearance</p>
	</SettingsMenuButton>
</SettingsMenuGroup>

<SettingsMenuGroup>
	<SettingsMenuButton path="/settings/video" active={openedGroup == 'video'}>
		<SettingsMenuIcon>
			<VideoIcon size="20px" />
		</SettingsMenuIcon>
		<p>Video</p>
	</SettingsMenuButton>
	<SettingsMenuButton path="/settings/audio" active={openedGroup == 'audio'}>
		<SettingsMenuIcon>
			<FileAudioIcon size="20px" />
		</SettingsMenuIcon>
		<p>Audio</p>
	</SettingsMenuButton>
</SettingsMenuGroup>
