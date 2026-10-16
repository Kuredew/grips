<script lang="ts">
	import ContainerContent from '#components/ui/container/ContainerContent.svelte';
	import ContainerRoot from '#components/ui/container/ContainerRoot.svelte';
	import ChangelogItem from '#components/modules/changelog/ChangelogItem.svelte';
	import Footer from '#components/modules/footer/Footer.svelte';
	import BackLink from '#components/modules/navigation/BackLink.svelte';
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

{#if data.currentChangelog !== null}
	<ContainerRoot>
		<ContainerContent>
			<main class="flex justify-center gap-10">
				<div
					class="sticky top-0 hidden h-[calc(100dvh-64px)] flex-1 items-center justify-center md:flex"
				>
					{#if data.nextChangelogVersion}
						<a href={`/changelogs/${data.nextChangelogVersion}`}>
							<div>
								<p class="text-sm">Next</p>
								<p class="text-white">
									{data.nextChangelogVersion}
								</p>
							</div>
						</a>
					{/if}
				</div>
				<div class="max-w-200">
					<div class="h-4"></div>
					<BackLink href={resolve('/(home)')} />
					<div class="h-6"></div>

					<ChangelogItem
						version={data.currentChangelog.version}
						changelog={data.currentChangelog}
					/>
					<div class="mt-10 flex w-full justify-between md:hidden">
						{#if data.nextChangelogVersion}
							<a class="justify-self-start" href={`/changelogs/${data.nextChangelogVersion}`}
								><ButtonComponent>
									<div>
										<p class="text-xs text-neutral-400">Next</p>
										<p class="">
											{data.nextChangelogVersion}
										</p>
									</div>
								</ButtonComponent></a
							>
						{:else}
							<div></div>
						{/if}
						{#if data.prevChangelogVersion}
							<a class="justify-self-end" href={`/changelogs/${data.prevChangelogVersion}`}
								><ButtonComponent>
									<div>
										<p class="text-xs text-neutral-400">Previous</p>
										<p class="">
											{data.prevChangelogVersion}
										</p>
									</div>
								</ButtonComponent></a
							>
						{:else}
							<div></div>
						{/if}
					</div>
					<Footer />
				</div>
				<div
					class="sticky top-0 hidden h-[calc(100dvh-64px)] flex-1 items-center justify-center md:flex"
				>
					{#if data.prevChangelogVersion}
						<a href={`/changelogs/${data.prevChangelogVersion}`}>
							<div>
								<p class="text-sm">Previous</p>
								<p class="text-white">
									{data.prevChangelogVersion}
								</p>
							</div>
						</a>
					{/if}
				</div>
			</main>
		</ContainerContent>
	</ContainerRoot>
{/if}
