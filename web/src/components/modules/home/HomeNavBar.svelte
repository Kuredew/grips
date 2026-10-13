<script lang="ts">
	import ContainerContent from '#components/ui/container/ContainerContent.svelte';
	import ContainerRoot from '#components/ui/container/ContainerRoot.svelte';
	import { resolve } from '$app/paths';
	import { DropdownMenu } from 'bits-ui';
	import { CaretDownIcon, CodeIcon, DevToLogoIcon } from 'phosphor-svelte';
	import GripsLogo from '../logo/GripsLogo.svelte';
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
</script>

<div class="sticky top-0 z-10 max-w-dvw border-b-2 border-neutral-800 bg-black font-[General_Sans]">
	<ContainerRoot>
		<ContainerContent>
			<div class="flex flex-1 justify-between py-4">
				<GripsLogo />
				<div class="hidden gap-8 text-xs md:flex md:text-base">
					<a
						href={resolve('/(home)/changelogs')}
						class="flex items-center gap-2 tracking-tighter hover:text-white"
						><DevToLogoIcon /> changelog</a
					>
					<a
						href="https://github.com/Kuredew/grips"
						class="flex items-center gap-2 tracking-tighter hover:text-white"
						><CodeIcon /> source code</a
					>
					<a
						href={resolve('/(app)/start')}
						class="flex items-center tracking-tighter text-white underline hover:text-white"
						>start downloading</a
					>
				</div>
				<div class="block md:hidden">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class="group">
							<ButtonComponent class="h-fit max-w-fit px-2! py-2">
								<div class=" group-data-[state=open]:rotate-180">
									<CaretDownIcon />
								</div>
							</ButtonComponent>
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content
								align="end"
								class="right-0 z-100 w-[55dvw] rounded-xl border-2 border-neutral-800 bg-neutral-900 p-1 font-semibold tracking-tighter data-[state=closed]:animate-scale-out  data-[state=open]:animate-scale-in md:w-70"
							>
								<DropdownMenu.Item class="rounded-lg hover:bg-neutral-800">
									<a href={resolve('/(home)/changelogs')} class="flex items-center gap-2 px-4 py-2"
										><DevToLogoIcon /> changelog</a
									>
								</DropdownMenu.Item>
								<DropdownMenu.Item class="rounded-lg hover:bg-neutral-800">
									<a
										href="https://github.com/Kuredew/grips"
										class="flex items-center gap-2 px-4 py-2"><CodeIcon /> source code</a
									>
								</DropdownMenu.Item>
								<DropdownMenu.Item class="rounded-lg hover:bg-neutral-800">
									<a
										href="/start"
										class="flex items-center px-4 py-2 text-white underline hover:text-white"
										>start downloading</a
									>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
				</div>
			</div>
		</ContainerContent>
	</ContainerRoot>
</div>
