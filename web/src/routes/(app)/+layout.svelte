<script lang="ts">
	import Menubar from '#components/bar/Menubar.svelte';
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

<Menubar {menus} />

<div class="h-20 w-full"></div>

{@render children()}
