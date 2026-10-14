<script lang="ts">
	import AppMenubar from '#components/modules/app/AppMenubar.svelte';
	import type { MenuTab } from '#lib/types.ts';

	let fileMenu: MenuTab = {
		name: 'File',
		menuList: [
			{
				name: 'Start',
				value: 'start',
				type: 'link',
				href: '/start'
			},
			{
				name: 'Quit',
				value: 'quit',
				type: 'link',
				href: '/'
			}
		]
	};

	let editMenu: MenuTab = {
		name: 'Edit',
		menuList: [
			{
				name: 'Settings',
				value: 'open_settings',
				type: 'link',
				href: '/settings'
			}
		]
	};

	let viewMenu: MenuTab = {
		name: 'View',
		menuList: [
			{
				name: 'Reload',
				value: 'reload',
				type: 'callback',
				callback: () => location.reload()
			}
		]
	};

	let menuTabs: MenuTab[] = [fileMenu, editMenu, viewMenu];

	let { children } = $props();
</script>

<AppMenubar {menuTabs} />

<!-- <div class="h-20 w-full"></div> -->

<div class="h-[calc(100vh-80px)] w-full pt-20 font-[DM_Sans_Variable]">
	{@render children()}
</div>
