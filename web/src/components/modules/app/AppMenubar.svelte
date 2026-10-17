<script lang="ts">
	import { Menubar, Separator } from 'bits-ui';
	import { AsteriskIcon } from 'phosphor-svelte';
	import { type MenuTab } from '#lib/types.ts';
	import ContainerContent from '#components/ui/container/ContainerContent.svelte';
	import AppQueueMenu from './AppQueueMenu.svelte';
	import { inputManager } from '#lib/input.svelte.ts';

	let value = $state('');

	$effect(() => {
		if (inputManager.queueListOpened) {
			value = 'app-queue';
		}
	});
	let { menuTabs }: { menuTabs: MenuTab[] } = $props();
</script>

<div class="fixed flex w-full justify-center py-4">
	<ContainerContent>
		<Menubar.Root
			bind:value
			class="flex h-12 w-full items-center rounded-xl border-2 border-neutral-800 px-0.75 text-white"
		>
			<div class="px-2.5">
				<AsteriskIcon class="text-white" size="30px" />
			</div>
			{#each menuTabs as menuTab (menuTab.name)}
				<Menubar.Menu>
					<Menubar.Trigger
						class="data-highlighted:bg-muted inline-flex h-10 cursor-default items-center justify-center rounded-lg px-4 text-sm font-medium transition-all focus-visible:outline-none data-[state=open]:bg-neutral-800"
					>
						{menuTab.name}
					</Menubar.Trigger>
					<Menubar.Portal>
						<Menubar.Content
							class="focus-override bg-background shadow-popover z-50 w-50 rounded-xl border-2 border-neutral-800 bg-black px-1 py-1.5 font-[DM_Sans_Variable] text-sm text-white focus-visible:outline-hidden"
							align="start"
							sideOffset={3}
						>
							{#each menuTab.menuList as menu (menu.name)}
								{#if menu.type == 'callback'}
									<Menubar.Item
										class="cursor-default rounded-lg px-3 py-2 font-medium transition-all hover:bg-neutral-800 active:scale-95"
										onSelect={() => {
											menu.callback();
										}}>{menu.name}</Menubar.Item
									>
								{:else if menu.type == 'link'}
									<a href={menu.href}>
										<Menubar.Item
											class="cursor-default rounded-lg px-3 py-2 font-medium transition-all hover:bg-neutral-800 active:scale-95"
											>{menu.name}</Menubar.Item
										>
									</a>
								{/if}
							{/each}
						</Menubar.Content>
					</Menubar.Portal>
				</Menubar.Menu>
			{/each}
			<Separator.Root class="flex-1" />
			<AppQueueMenu />
		</Menubar.Root>
	</ContainerContent>
</div>
