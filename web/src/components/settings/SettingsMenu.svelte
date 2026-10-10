<script lang="ts">
	import { page } from '$app/state';
	import { FileAudioIcon, VideoIcon } from 'phosphor-svelte';
	import SettingsMenuButton from './SettingsMenuButton.svelte';
	import SettingsMenuIcon from './SettingsMenuIcon.svelte';

	let openedGroup = $derived(
		page.url.pathname.includes('/settings') ? page.url.pathname.split('/').pop() : ''
	);
</script>

<div class="flex w-full flex-col gap-4 text-white">
	<div class="text-lg font-medium text-white">Settings</div>

	<div class="flex w-full flex-col text-sm font-medium">
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
	</div>
</div>
