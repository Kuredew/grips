<script lang="ts">
	import { Menubar } from 'bits-ui';
	import { AsteriskIcon } from 'phosphor-svelte';
	import { type Menus } from '#lib/types.ts';

	let { menus }: { menus: Menus } = $props();
</script>

<div class="fixed flex w-full p-4">
	<Menubar.Root
		class="flex h-12 w-full items-center rounded-xl border-2 border-neutral-800 px-0.75 text-white"
	>
		<div class="px-2.5">
			<AsteriskIcon class="text-white" size="30px" />
		</div>
		{#each menus as menu (menu.name)}
			<Menubar.Menu>
				<Menubar.Trigger
					class="data-highlighted:bg-muted inline-flex h-10 cursor-default items-center justify-center rounded-lg px-4 text-sm font-medium focus-visible:outline-none data-[state=open]:bg-neutral-800"
				>
					{menu.name}
				</Menubar.Trigger>
				<Menubar.Portal>
					<Menubar.Content
						class="focus-override bg-background shadow-popover z-50 w-50 rounded-xl border-2 border-neutral-800 bg-black px-1 py-1.5 text-sm text-white focus-visible:outline-hidden"
						align="start"
						sideOffset={3}
					>
						{#each menu.field as field (field.value)}
							<Menubar.Item
								class="cursor-default rounded-lg px-3 py-2 font-medium hover:bg-neutral-800"
								onSelect={() => {
									if (field.callback) {
										field.callback();
									}
								}}>{field.name}</Menubar.Item
							>
						{/each}
					</Menubar.Content>
				</Menubar.Portal>
			</Menubar.Menu>
		{/each}
	</Menubar.Root>
</div>
