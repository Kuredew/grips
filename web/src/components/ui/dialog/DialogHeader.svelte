<script lang="ts">
	let {
		title,
		description
	}: {
		title: string;
		description: string;
	} = $props();
</script>

<div class="mb-5 w-full">
	<h1 class="text-2xl font-medium tracking-tight text-white">{title}</h1>
	<p class="text-sm text-neutral-400">{description}</p>
</div>
