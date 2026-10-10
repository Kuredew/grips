<script lang="ts">
	import AppMenubar from '#components/modules/app/AppMenubar.svelte';
	import type { Menu, Menus } from '#lib/types.ts';
	import { goto } from '$app/navigation';

	let fileMenu: Menu = {
		name: 'File',
		field: [
			{
				name: 'New',
				value: 'new',
				callback: () => goto('/start')
			},
			{
				name: 'Quit',
				value: 'quit',
				callback: () => goto('/')
			}
		]
	};

	let editMenu: Menu = {
		name: 'Edit',
		field: [
			{
				name: 'Settings',
				value: 'open_settings',
				callback: () => goto('/settings')
			}
		]
	};

	let viewMenu: Menu = {
		name: 'View',
		field: [
			{
				name: 'Reload',
				value: 'reload',
				callback: () => location.reload()
			}
		]
	};

	let menus: Menus = [fileMenu, editMenu, viewMenu];

	let { children } = $props();
</script>

<svelte:head>
	<title>Start | GRIPS</title>
</svelte:head>

<AppMenubar {menus} />

<!-- <div class="h-20 w-full"></div> -->

<div class="h-[calc(100vh-80px)] w-full pt-20 font-[DM_Sans_Variable]">
	{@render children()}
</div>
