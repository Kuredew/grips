<script lang="ts">
	import { version } from '$lib/version';

	let { title }: { title: string } = $props();

	let versionText = $derived.by(() => {
		if (!$version) return null;

		return `${$version.version}-${$version.commit}`;
	});
</script>

<div id="page-header">
	<a href="https://github.com/kuredew/grips"
		><p class="text-sm text-neutral-400">{versionText}</p></a
	>
	<h1 id="page-title">{title}</h1>
</div>

<style>
	#page-header {
		cursor: default;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#page-title {
		font-size: 18px;
		font-weight: 600;
	}
</style>
