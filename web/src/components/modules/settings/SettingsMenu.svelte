<script lang="ts">
	import MenuButton from '#components/ui/menu/MenuButton.svelte';
	import MenuGroup from '#components/ui/menu/MenuGroup.svelte';
	import MenuIcon from '#components/ui/menu/MenuIcon.svelte';
	import MenuRoot from '#components/ui/menu/MenuRoot.svelte';
	import { page } from '$app/state';
	import { CpuIcon, FileAudioIcon, SunIcon, VideoIcon } from 'phosphor-svelte';

	let openedGroup = $derived(
		page.url.pathname.includes('/settings') ? page.url.pathname.split('/').pop() : ''
	);
</script>

<MenuRoot>
	<MenuGroup>
		<MenuButton path="/settings/appearance" active={openedGroup == 'appearance'}>
			<MenuIcon>
				<SunIcon size="20px" />
			</MenuIcon>
			<p>Appearance</p>
		</MenuButton>
	</MenuGroup>

	<MenuGroup>
		<MenuButton path="/settings/video" active={openedGroup == 'video'}>
			<MenuIcon>
				<VideoIcon size="20px" />
			</MenuIcon>
			<p>Video</p>
		</MenuButton>

		<MenuButton path="/settings/audio" active={openedGroup == 'audio'}>
			<MenuIcon>
				<FileAudioIcon size="20px" />
			</MenuIcon>
			<p>Audio</p>
		</MenuButton>
	</MenuGroup>

	<MenuGroup>
		<MenuButton path="/settings/preprocessing" active={openedGroup == 'preprocessing'}>
			<MenuIcon>
				<CpuIcon size="20px" />
			</MenuIcon>
			<p>Preprocessing</p>
		</MenuButton>
	</MenuGroup>
</MenuRoot>
