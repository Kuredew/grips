<script>
	import ContainerContent from '#components/ui/container/ContainerContent.svelte';
	import ContainerRoot from '#components/ui/container/ContainerRoot.svelte';
	import Footer from '#components/modules/footer/Footer.svelte';
	import ChangelogItem from '#components/modules/changelog/ChangelogItem.svelte';
	import ButtonComponent from '#components/ui/button/ButtonComponent.svelte';
	import { resolve } from '$app/paths';
	import { GithubLogoIcon } from 'phosphor-svelte';
	import { fade } from 'svelte/transition';

	let scrollY = $state(0);
	let scrollDownActive = $derived(scrollY <= 0);
	let { data } = $props();
</script>

<svelte:window bind:scrollY />

<ContainerRoot>
	<ContainerContent>
		<main id="main-content">
			<!-- frame_1 -->
			<section class="flex h-[calc(100vh-64px)] flex-col items-center justify-center gap-20">
				<!-- <div class="text-8xl font-medium text-white">*</div> -->
				<div class="-mt-16 flex w-full max-w-220 flex-col gap-8">
					<h1
						class="flex h-20 items-center justify-between text-3xl font-medium! tracking-tight text-white md:h-30 md:text-6xl"
					>
						own <span class="flex h-full items-end">your</span> favorite
						<span class="flex h-full items-end">media.</span>
					</h1>
					<p class="text-center text-balance">
						Download media, remux, and recode for you. It runs entirely in the browser and is ad-
						and tracker-free.
					</p>
				</div>
				<div class="flex gap-2">
					<a href={resolve('/(app)/start')}><ButtonComponent>Get started</ButtonComponent></a>
					<a href="https://github.com/kuredew/grips"
						><ButtonComponent variant="secondary" class="flex gap-2"
							><GithubLogoIcon /> Github</ButtonComponent
						></a
					>
				</div>
				{#if scrollDownActive}
					<div
						class="fixed bottom-0 flex h-30 w-dvw flex-col items-center justify-center tracking-tighter text-white"
						transition:fade
					>
						<div>^</div>
						<p>scroll down</p>
					</div>
				{/if}
			</section>

			<div class="flex flex-col gap-30 md:gap-60">
				<!-- frame_2 -->
				<section class="min-h-vh mt-10 flex flex-col gap-12">
					<div class="flex flex-col lg:max-w-3xl">
						<p>Tool Advantages</p>
						<h2 class="text-4xl font-medium tracking-tight text-balance text-white md:text-5xl">
							no need to pay for a simple tool
						</h2>
					</div>
					<div class="flex flex-col gap-4">
						<div class="flex gap-4">
							<div class="flex flex-1 flex-col gap-4 rounded-3xl bg-neutral-900 p-8">
								<h3 class="text-xl font-medium text-white">Uses Opensource Tool</h3>
								<p class="text-balance">
									This tool uses <span class="font-medium text-white">yt-dlp</span> in its backend,
									<span class="font-medium text-white">a free, open-source</span> tool that you can
									download from <span class="font-medium text-white">github</span>. But since it
									seems like many editors aren't familiar with the cli, grips is here to help. grips
									actually
									<span class="font-medium text-white">calls commands</span> using yt-dlp and then
									sends the
									<span class="font-medium text-white">results</span> to you, which is really convenient.
								</p>
							</div>
							<div class="min-w-[20dvw] rounded-3xl bg-neutral-900"></div>
						</div>
						<div class="flex gap-4">
							<div class="min-w-[20dvw] rounded-3xl bg-neutral-900"></div>
							<div class="flex flex-col gap-4 rounded-3xl bg-neutral-900 p-8">
								<h3 class="text-xl font-medium text-white">No Download</h3>
								<p class="text-balance">
									Grips runs entirely in the <span class="font-medium text-white">browser</span>,
									there is
									<span class="font-medium text-white">no software</span> that you have to download
									and install on your computer, but it means I have to maintain the
									<span class="font-medium text-white">server</span> so that it continues to run and work.
									:3
								</p>
							</div>
						</div>
					</div>
				</section>

				<!-- frame_3 -->
				<!-- Since using API just to display the online status seems a bit excessive, I intentionally hard-coded this part. -->
				<!-- You can go to the uptime page I’ve provided below if you want to check the server status in real time. -->
				<section class="flex flex-col gap-12">
					<div class="flex flex-col gap-2 lg:max-w-3xl">
						<h2 class="text-4xl font-medium tracking-tight text-balance text-white md:text-5xl">
							Server operations can be monitored from here
						</h2>
						<p class="text-balance">
							Not sure whether the tool is working or not now? You can check the status here to see.
						</p>
					</div>
					<div class="flex cursor-default flex-col gap-4 md:flex-row">
						<div
							class="flex flex-1 items-center justify-between rounded-3xl border-2 border-neutral-800 bg-neutral-900 p-6"
						>
							<div>
								<h3 class="text-xl font-medium text-white">Public Website</h3>
								<p>No active incidents</p>
							</div>
							<p>Online</p>
						</div>
						<div
							class="flex flex-1 items-center justify-between rounded-3xl border-2 border-neutral-800 bg-neutral-900 p-6"
						>
							<div>
								<h3 class="text-xl font-medium text-white">Extractor Service</h3>
								<p>
									{data.extractorOnline
										? 'No active incidents'
										: 'Unable to connect to the server at this time'}
								</p>
							</div>
							<p>{data.extractorOnline ? 'Online' : 'Offline'}</p>
						</div>
					</div>
					<p class="text-center">
						<a class="text-white underline" href="https://stats.uptimerobot.com/icou3jzi5c"
							>Click here</a
						> to view the status in real time.
					</p>
				</section>

				<!-- frame_4 -->
				<section class="flex flex-col items-center gap-12">
					<div class="flex flex-col items-center gap-2 text-balance lg:max-w-3xl">
						<h2 class="text-center text-4xl font-medium tracking-tight text-white md:text-5xl">
							Keep the tool working
						</h2>
						<p class="text-center">Keep following workaround fixes from yt-dlp if any.</p>
					</div>

					<div class="grid max-w-full min-w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
						{#each data.changelogs as changelog (changelog.version)}
							<div class="flex w-200 max-w-full shrink-0 flex-col items-center gap-10">
								<ChangelogItem version={changelog.version} compact={true} {changelog} />
							</div>
						{/each}
					</div>
					<a href="/changelogs"
						><ButtonComponent variant="link">See all changelog →</ButtonComponent></a
					>
				</section>
			</div>

			<Footer />
		</main>
	</ContainerContent>
</ContainerRoot>
