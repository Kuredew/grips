<script lang="ts">
	import { settings } from '$lib/settings.svelte';
	import type { AppSetting } from '$lib/types/types';
	import RadioButton from '../radio/RadioButton.svelte';
	import RadioWrapper from '../radio/RadioWrapper.svelte';

	let { setting }: { setting: AppSetting } = $props();

	let value = $derived(settings.data[setting.key]);
</script>

<div id="setting-item">
	<p class="setting-label">{setting.label}</p>
	{#if setting.type == 'checkbox'}
		<div class="setting-toggle"></div>
	{:else if setting.type == 'select'}
		<RadioWrapper>
			{#each setting.options as option (option.value)}
				<RadioButton
					onclick={() => (settings.data[setting.key] = option.value)}
					active={value == option.value}>{option.label}</RadioButton
				>
			{/each}
		</RadioWrapper>
	{/if}
	<div class="setting-description">{setting.description}</div>
</div>

<style>
	#setting-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.setting-label {
		font-size: 18px;
		font-weight: 500;
	}

	.setting-description {
		color: var(--color-neutral-400);
	}

	.setting-toggle {
		padding-inline: 18px;
		padding-block: 14px;
	}
</style>
