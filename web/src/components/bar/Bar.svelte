<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Button from '../button/Button.svelte';
	import HomeIcon from '../logo/HomeIcon.svelte';
	import SettingIcon from '../logo/SettingIcon.svelte';

	let activePage = $derived(page.url.pathname);
</script>

<div class="bar">
	<a href={resolve('/')}>
		<Button id="button-bar" variant={activePage == '/' ? 'primary' : 'secondary'}>
			<HomeIcon />
		</Button>
	</a>
	<a href={resolve('/settings')}>
		<Button id="button-bar" variant={activePage.includes('/settings') ? 'primary' : 'secondary'}>
			<SettingIcon />
		</Button>
	</a>
</div>

<style>
	.bar {
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: center;
		gap: 14px;
		width: 100dvw;
		height: fit;
		padding-block: 14px;
	}

	:global(#button-bar) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 4px;
		padding-block: 14px;
	}
</style>
